<script>
import ModalDeleteCoins from "@/components/portfolio/ModalDeleteCoins.vue";
import {pagination} from "@/mixins/pagination.js";
import {divideNumber, priceMovement} from "@/directives/directives.js";

export default {
  name: "PortfolioCoins",
  mixins: [pagination],
  emits: ["updatePortfolio"],
  components: {ModalDeleteCoins},
  props: {
    readyData: Array
  },
  directives: {
    // Движение цены(визуально)
    priceMovement,
    // Разделитель чисел
    divideNumber
  },
  data() {
    return {
      headers: [
        {
          key: "name",
          title: "Name",
          align: "start",
          sortable: false
        },
        {
          key: "price",
          title: "Price",
          sortable: false
        },
        {
          key: "24HChange",
          title: "24h%",
          sortable: false
        },
        {
          key: "holdings",
          title: "Holdings",
          sortable: false
        },
        {
          key: "avgBuy",
          title: "Avg. Buy Price",
          sortable: false
        },
        {
          key: "profitOrLoss",
          title: "Profit/Loss",
          sortable: false
        },
        {
          key: "invested",
          title: "Invested",
          sortable: false
        },
        {
          key: "actions",
          title: "Actions",
          sortable: false
        },
      ],
      // Модальное окно удаления
      isShowModalDeleteCoins: false,
      coinId: null,
      coinName: "..."
    }
  },
  computed: {
    // Для пагинации
    getData() {
      return this.readyData;
    }
  },
  methods: {
    // Модальное окно удаления
    showModalDeleteCoins(coinId, coinName) {
      this.isShowModalDeleteCoins = true;

      this.coinId = coinId;
      this.coinName = coinName;
    },
    resetCoinId() {
      this.coinId = null;
    },
    updatePortfolio() {
      this.$emit("updatePortfolio");
    }
  }
}
</script>

<template>
  <section class="portfolio-coins">
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <img
            src="@/assets/images/work.png"
            alt="logo"
            class="portfolio-coins-title-img"
        />
        Assets
      </v-card-title>
    </v-card>

    <v-divider></v-divider>

    <!--Таблица-->
    <v-data-table
        :headers="headers"
        :items="getPaginationData"
        :hide-default-footer="true"
        class="portfolio-coins-table"
    >
      <!--Строки-->
      <template #item="{ item }">
        <tr>
          <td>
            {{ item.name }}
            <br>
            {{ item.symbol }}
          </td>
          <td>
            <span v-divide-number>
              {{ item.current_price }}
            </span>
            $
          </td>
          <td v-price-movement="item.price_change_percentage_24h">
            <span v-divide-number>
              {{ item.price_change_percentage_24h }}
            </span>
            %
          </td>
          <td>
            $
            <span v-divide-number>
              {{ item.realCostCoinInPortfolio }}
            </span>
            <br>
            <span v-divide-number>
              {{ item.coinsAmountInPortfolio }}
            </span>
            {{ item.symbol }}
          </td>
          <td>
            <span v-divide-number>
              {{ item.avgBuyPrice }}
            </span>
            $
          </td>
          <td v-price-movement="item.profitOrLoss">
            <span v-divide-number>
              {{ item.profitOrLoss }}
            </span>
            $
          </td>
          <td>
            <span v-divide-number>
              {{ item.invested }}
            </span>
            $
          </td>
          <td>
            <v-btn
                color="error"
                @click="showModalDeleteCoins(item.id, item.name)"
            >
              Delete
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!--Модальное окно для удаления монет из портфеля-->
    <ModalDeleteCoins
        v-model="isShowModalDeleteCoins"
        :coin-id="coinId"
        :coin-name="coinName"
        @reset-coin-id="resetCoinId"
        @update-portfolio="updatePortfolio"
    />

    <!--Пагинация-->
    <div
        v-if="getAmountPages > 1"
        class="portfolio-coins-pagination"
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
  </section>
</template>