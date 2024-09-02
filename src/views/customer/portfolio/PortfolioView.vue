<script>
import PortfolioLineChart from "@/components/portfolio/PortfolioLineChart.vue";
import PortfolioCoins from "@/components/portfolio/PortfolioCoins.vue";
import AddCoinForm from "@/components/portfolio/AddCoinForm.vue";
import PortfolioPieChart from "@/components/portfolio/PortfolioPieChart.vue";

export default {
  name: "PortfolioView",
  components: {
    PortfolioPieChart,
    AddCoinForm,
    PortfolioCoins,
    PortfolioLineChart
  },
  data() {
    return {}
  },
  async mounted() {
  }
}
</script>

<template>
  <section class="portfolio-view px-1 py-2">
    <PortfolioLineChart/>
    <PortfolioPieChart/>
    <PortfolioCoins/>
    <AddCoinForm/>
  </section>
</template>