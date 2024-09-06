<script>
import ModalDeleteCoins from "@/components/portfolio/ModalDeleteCoins.vue";

export default {
  name: "PortfolioCoins",
  components: {ModalDeleteCoins},
  props: {
    readyData: Array
  },
  directives: {
    // Движение цены(визуально)
    priceMovement: {
      mounted(el, binding) {
        const value = binding.value.toString();
        const classList = el.classList;

        if (value.startsWith("-")) {
          classList.add("downward-price-movement");

        } else {
          classList.add("upward-price-movement");
        }
      },
      updated(el, binding) {
        const value = binding.value.toString();
        const classList = el.classList;

        // Обнуление
        classList.remove("upward-price-movement");
        classList.remove("downward-price-movement");

        if (value.startsWith("-")) {
          classList.add("downward-price-movement");

        } else {
          classList.add("upward-price-movement");
        }
      }
    }
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
      // Пагинация
      elementsOnPage: 5,
      currentPage: 1,
      // Модальное окно удаления
      isShowModalDeleteCoins: false,
      coinId: null,
      coinName: "..."
    }
  },
  computed: {
    // Пагинация
    amountElements() {
      return this.readyData.length;
    },
    elements() {
      return this.readyData;
    },
    getAmountPages() {
      if (this.amountElements === 0) {
        return 0;
      }

      return Math.ceil(this.amountElements / this.elementsOnPage);
    },
    getPaginationData() {
      const end = this.currentPage * this.elementsOnPage;

      const start = end - this.elementsOnPage;

      return this.elements.slice(start, end);
    },
    checkPrevPage() {
      return this.currentPage === 1;
    },
    checkNextPage() {
      return this.currentPage === this.getAmountPages;
    }
  },
  methods: {
    // Пагинация
    prevPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
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
            {{ item.name }}<br>
            {{ item.symbol }}
          </td>
          <td>
            {{ item.current_price }} $
          </td>
          <td v-price-movement="item.price_change_percentage_24h">
            {{ item.price_change_percentage_24h }} %
          </td>
          <td>
            ${{ item.realCostCoinInPortfolio }}<br>
            {{ item.coinsAmountInPortfolio }} {{ item.symbol }}
          </td>
          <td>
            {{ item.avgBuyPrice }} $
          </td>
          <td v-price-movement="item.profitOrLoss">
            {{ item.profitOrLoss }} $
          </td>
          <td>
            {{ item.invested }} $
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