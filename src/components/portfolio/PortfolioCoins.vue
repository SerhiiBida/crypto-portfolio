<script>
export default {
  name: "PortfolioCoins",
  props: {
    readyData: Array
  },
  watch: {
    readyData(newValue) {
      console.log("Полученные данные:", newValue);
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
      elementsOnPage: 2,
      currentPage: 1
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
      return Math.ceil(this.amountElements / this.elementsOnPage);
    },
    getPaginationData() {
      const end = this.currentPage * this.getAmountPages;

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
          <td>
            {{ item.price_change_percentage_24h }} %
          </td>
          <td>
            ${{ item.realCostCoinInPortfolio }}<br>
            {{ item.coinsAmountInPortfolio }} {{ item.symbol }}
          </td>
          <td>
            {{ item.avgBuyPrice }} $
          </td>
          <td>
            {{ item.profitOrLoss }} $
          </td>
          <td>
            {{ item.invested }} $
          </td>
          <td>
            <v-btn
                color="error"
            >
              Delete
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>


    <div
        v-if="readyData.length > 0"
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