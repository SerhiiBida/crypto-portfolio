<script>
import {CoinsInPortfolios} from "@/services/database.js";

export default {
  name: "ModalDeleteCoins",
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
      data: []
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);

        this.$emit("resetCoinId");
      }
    }
  },
  methods: {
    async updateData() {
      const coinsInPortfolios = new CoinsInPortfolios();

      const portfolioId = this.$route.params.id;

      this.data = await coinsInPortfolios.getHistoryCoinInPortfolio(portfolioId, this.coinId);
    },
    deleteCoin(historyId) {

    },
    deleteAll() {


      this.showModal = false;
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
            :items="data"
            :hide-default-footer="true"
            class="portfolio-coins-table"
        >
          <!--Строки-->
          <template #item="{ item }">
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
                    @click="deleteCoin(item.id)"
                >
                  Delete
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <!--Кнопки-->
        <v-btn
            class="ms-auto"
            color="error"
            @click="deleteAll"
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