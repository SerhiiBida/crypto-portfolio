<script>
import PortfolioLineChart from "@/components/portfolio/PortfolioLineChart.vue";
import PortfolioCoins from "@/components/portfolio/PortfolioCoins.vue";
import AddCoinForm from "@/components/portfolio/AddCoinForm.vue";
import {CoinsInPortfolios} from "@/services/database.js";
import {getCoinsList} from "@/services/coin-gecko.js";

export default {
  name: "PortfolioView",
  components: {
    AddCoinForm,
    PortfolioCoins,
    PortfolioLineChart
  },
  data() {
    return {
      readyData: [],
      updateDataTimerId: null
    }
  },
  computed: {
    currentPortfolioId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getKeysObject(newObject) {
      return Object.keys(newObject).join(",");
    },
    roundingNumber(number, fractionDigits) {
      return Number((number).toFixed(fractionDigits));
    },
    calculateAvgBuyPrice(coinsAmount, money) {
      return Number((money / coinsAmount).toFixed(5));
    },
    calculateRealCostCoinInPortfolio(coinPrice, coinsAmount) {
      return Number((coinPrice * coinsAmount).toFixed(5));
    },
    calculateProfitOrLoss(coinPrice, coinsAmount, money) {
      const profitOrLoss = (coinPrice * coinsAmount) - money;

      return Number((profitOrLoss).toFixed(5));
    },
    getReadyData(realCoinsData, coinsWithPortfolio) {
      for (let i = 0; i < realCoinsData.length; i++) {
        const coinId = realCoinsData[i].id;
        const coinPrice = realCoinsData[i].current_price;

        const coinsAmount = coinsWithPortfolio[coinId].totalCoins;
        const money = coinsWithPortfolio[coinId].totalMoney;

        // New data
        realCoinsData[i].coinsAmountInPortfolio = this.roundingNumber(coinsAmount, 10);
        realCoinsData[i].invested = this.roundingNumber(money, 5);
        realCoinsData[i].avgBuyPrice = this.calculateAvgBuyPrice(coinsAmount, money);
        realCoinsData[i].realCostCoinInPortfolio = this.calculateRealCostCoinInPortfolio(coinPrice, coinsAmount);
        realCoinsData[i].profitOrLoss = this.calculateProfitOrLoss(coinPrice, coinsAmount, money);
      }

      return realCoinsData;
    },
    async loadingData() {
      const coinsInPortfolios = new CoinsInPortfolios();

      const portfolioId = this.currentPortfolioId;

      // Монеты в портфеле
      const coinsWithPortfolio = await coinsInPortfolios.getSumHistoryCoinsInPortfolio(portfolioId);

      if (!coinsWithPortfolio) {
        this.readyData = [];

        return;
      }

      // Список монет для поиска
      const coinsId = this.getKeysObject(coinsWithPortfolio);

      // Реальные данные монет
      const realCoinsData = await getCoinsList(coinsId);

      if (!realCoinsData) {
        return;
      }

      // Объединенные данные
      this.readyData = this.getReadyData(realCoinsData, coinsWithPortfolio);
    },
    async updatePortfolio() {
      // Отмена обновления
      clearInterval(this.updateDataTimerId);

      // Запуск обновления данных раз в 5 минут
      this.updateDataTimerId = setInterval(this.loadingData, 5 * 60000);

      await this.loadingData();
    }
  },
  watch: {
    // Смена портфеля на другой портфель
    async currentPortfolioId(newValue, oldValue) {
      await this.updatePortfolio();
    }
  },
  async mounted() {
    await this.updatePortfolio();
  },
  // При удалении компонента
  unmounted() {
    if (this.updateDataTimerId) {
      // Отмена обновления
      clearInterval(this.updateDataTimerId);
    }
  }
}
</script>

<template>
  <section class="portfolio-view px-1 py-2">
    <PortfolioLineChart :ready-data="readyData"/>
    <AddCoinForm @update-portfolio="updatePortfolio"/>
    <PortfolioCoins :ready-data="readyData" @update-portfolio="updatePortfolio"/>
  </section>
</template>