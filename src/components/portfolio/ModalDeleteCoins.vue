<script>
import {CoinsInPortfolios} from "@/services/database.js";
import {pagination} from "@/mixins/pagination.js";

export default {
  name: "ModalDeleteCoins",
  emits: ["update:modelValue", "resetCoinId", "updatePortfolio"],
  mixins: [pagination],
  props: {
    modelValue: Boolean,
    coinId: [String, null],
    coinName: String
  },
  data() {
    return {
      headers: [
        {
          key: "coinsAmount",
          title: "Coins Amount",
          sortable: false
        },
        {
          key: "money",
          title: "Money",
          sortable: false
        },
        {
          key: "date",
          title: "Date",
          sortable: false
        },
        {
          key: "actions",
          title: "Actions",
          sortable: false
        }
      ],
      data: [],
      coinsInPortfolios: new CoinsInPortfolios(),
      isDisabledDeleteAll: false,
      // Проверка, было ли удаление
      isDeleted: false
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);

        if (!value) {
          this.$emit("resetCoinId");
        }
      }
    },
    // Пагинация
    getData() {
      return this.data;
    }
  },
  methods: {
    async updateData() {
      const portfolioId = this.$route.params.id;

      const historyCoin = await this.coinsInPortfolios.getHistoryCoinInPortfolio(portfolioId, this.coinId);

      if (historyCoin) {
        this.data = historyCoin;
      }
    },
    async deleteHistoryCoin(event, historyId, index) {
      this.isDeleted = true;

      const targetElement = event.target;

      let button;

      // Находим кнопку для отключения
      if (targetElement.getAttribute("type") === "button") {
        button = targetElement;
      } else {
        // Поиск вверх
        button = targetElement.closest("[type='button']");
      }

      button.disabled = true;

      // Удаляем на сервере
      await this.coinsInPortfolios.deleteHistoryCoinInPortfolio(historyId);

      // Удаляем на клиенте
      this.data.splice(index, 1);
    },
    async deleteAllHistoryCoin() {
      this.isDeleted = true;
      this.isDisabledDeleteAll = true;

      const portfolioId = this.$route.params.id;

      // Удаление на клиенте
      this.data = []

      // Удаление на сервере
      await this.coinsInPortfolios.deleteAllHistoryCoinInPortfolio(portfolioId, this.coinId);

      this.isDisabledDeleteAll = false;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  watch: {
    async coinId(newValue) {
      if (newValue) {
        // Отображаем данные, если поступило значение
        await this.updateData();
      }
    },
    async showModal(newValue) {
      if (!newValue && this.isDeleted) {
        // Обновляем данные портфеля
        this.$emit("updatePortfolio");

        this.isDeleted = false;
      }
    }
  }
}
</script>

<template>
  <v-dialog
      v-model="showModal"
      width="auto"
      class="modal-delete-coins"
  >
    <v-card
        max-width="700"
        prepend-icon="mdi-update"
        :title="`Delete coin: ${coinName}`"
    >
      <v-card-text>
        <!--Таблица-->
        <v-data-table
            :headers="headers"
            :items="getPaginationData"
            :hide-default-footer="true"
            class="modal-delete-coins-table"
        >
          <!--Строки-->
          <template #item="{ item, index }">
            <tr>
              <td>
                {{ item.coinsAmount }}
              </td>
              <td>
                {{ item.money }} $
              </td>
              <td>
                {{ item.date }}
              </td>
              <td>
                <v-btn
                    color="error"
                    @click="deleteHistoryCoin($event, item.id, index)"
                >
                  Delete
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>

        <!--Пагинация-->
        <div
            v-if="getAmountPages > 1"
            class="modal-delete-coins-pagination"
        >
          <v-btn
              @click="prevPage"
              :disabled="checkPrevPage"
          >
            <
          </v-btn>
          <v-btn
              @click="nextPage"
              :disabled="checkNextPage"
          >
            >
          </v-btn>
          <p>
            {{ currentPage }} of {{ getAmountPages }} pages
          </p>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <!--Кнопки-->
        <v-btn
            v-if="data.length > 1"
            class="ms-auto"
            color="error"
            :disabled="isDisabledDeleteAll"
            @click="deleteAllHistoryCoin"
        >
          Delete All
        </v-btn>
        <v-btn
            class="ms-auto"
            @click="closeModal"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>