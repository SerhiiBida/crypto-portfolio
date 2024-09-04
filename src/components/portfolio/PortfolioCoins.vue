<script>
import {pagination} from "@/mixins/pagination.js";

export default {
  name: "PortfolioCoins",
  mixins: [pagination],
  data() {
    return {
      data: [
        {
          "id": "bitcoin",
          "symbol": "btc",
          "name": "Bitcoin",
          "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
          "current_price": 58525,
          "market_cap": 1156155162218,
          "market_cap_rank": 1,
          "fully_diluted_valuation": 1229414758247,
          "total_volume": 28569979559,
          "high_24h": 58752,
          "low_24h": 57258,
          "price_change_24h": 443.38,
          "price_change_percentage_24h": 0.76337,
          "market_cap_change_24h": 10622441038,
          "market_cap_change_percentage_24h": 0.92729,
          "circulating_supply": 19748631,
          "total_supply": 21000000,
          "max_supply": 21000000,
          "ath": 73738,
          "ath_change_percentage": -20.66823,
          "ath_date": "2024-03-14T07:10:36.635Z",
          "atl": 67.81,
          "atl_change_percentage": 86168.21474,
          "atl_date": "2013-07-06T00:00:00.000Z",
          "roi": null,
          "last_updated": "2024-09-02T17:55:15.990Z"
        },
        {
          "id": "ethereum",
          "symbol": "eth",
          "name": "Ethereum",
          "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
          "current_price": 2522.72,
          "market_cap": 303426186835,
          "market_cap_rank": 2,
          "fully_diluted_valuation": 303426186835,
          "total_volume": 13827031883,
          "high_24h": 2531.29,
          "low_24h": 2407.57,
          "price_change_24h": 52.48,
          "price_change_percentage_24h": 2.1244,
          "market_cap_change_24h": 6444837279,
          "market_cap_change_percentage_24h": 2.17012,
          "circulating_supply": 120308274.855462,
          "total_supply": 120308274.855462,
          "max_supply": null,
          "ath": 4878.26,
          "ath_change_percentage": -48.37011,
          "ath_date": "2021-11-10T14:24:19.604Z",
          "atl": 0.432979,
          "atl_change_percentage": 581600.58003,
          "atl_date": "2015-10-20T00:00:00.000Z",
          "roi": {
            "times": 56.63188011363603,
            "currency": "btc",
            "percentage": 5663.1880113636025
          },
          "last_updated": "2024-09-02T17:55:21.831Z"
        },
        {
          "id": "tether",
          "symbol": "usdt",
          "name": "Tether",
          "image": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
          "current_price": 1,
          "market_cap": 118311012023,
          "market_cap_rank": 3,
          "fully_diluted_valuation": 118311012023,
          "total_volume": 36502519228,
          "high_24h": 1.002,
          "low_24h": 0.995929,
          "price_change_24h": -0.000443406921494027,
          "price_change_percentage_24h": -0.04432,
          "market_cap_change_24h": 86573814,
          "market_cap_change_percentage_24h": 0.07323,
          "circulating_supply": 118229002316.472,
          "total_supply": 118229002316.472,
          "max_supply": null,
          "ath": 1.32,
          "ath_change_percentage": -24.3981,
          "ath_date": "2018-07-24T00:00:00.000Z",
          "atl": 0.572521,
          "atl_change_percentage": 74.7159,
          "atl_date": "2015-03-02T00:00:00.000Z",
          "roi": null,
          "last_updated": "2024-09-02T17:55:16.792Z"
        },
        {
          "id": "binancecoin",
          "symbol": "bnb",
          "name": "BNB",
          "image": "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
          "current_price": 522.64,
          "market_cap": 76268347301,
          "market_cap_rank": 4,
          "fully_diluted_valuation": 76268347301,
          "total_volume": 1019405558,
          "high_24h": 523.26,
          "low_24h": 502.22,
          "price_change_24h": 4.54,
          "price_change_percentage_24h": 0.87701,
          "market_cap_change_24h": 824155900,
          "market_cap_change_percentage_24h": 1.0924,
          "circulating_supply": 145887575.79,
          "total_supply": 145887575.79,
          "max_supply": 200000000,
          "ath": 717.48,
          "ath_change_percentage": -27.30483,
          "ath_date": "2024-06-06T14:10:59.816Z",
          "atl": 0.0398177,
          "atl_change_percentage": 1309794.72535,
          "atl_date": "2017-10-19T00:00:00.000Z",
          "roi": null,
          "last_updated": "2024-09-02T17:55:17.736Z"
        }
      ],
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
          key: "actions",
          title: "Actions",
          sortable: false
        },
      ],
    }
  },
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

    <div class="portfolio-coins-table-container">
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
              {{ item.price_change_percentage_24h }}
            </td>
            <td>
              Реал. Стоимость<br>
              Кол. монет
            </td>
            <td>
              Сред.ц.п.
            </td>
            <td>
              Профит/Потеря
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
    </div>

    <div class="portfolio-coins-pagination">
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
    </div>
  </section>
</template>