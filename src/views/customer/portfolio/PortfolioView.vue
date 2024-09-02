<script>
import PortfolioLineChart from "@/components/portfolio/PortfolioLineChart.vue";
import PortfolioCoins from "@/components/portfolio/PortfolioCoins.vue";
import AddCoinsForm from "@/components/portfolio/AddCoinsForm.vue";
import PortfolioPieChart from "@/components/portfolio/PortfolioPieChart.vue";

export default {
  name: "PortfolioView",
  components: {
    PortfolioPieChart,
    AddCoinsForm,
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
    <AddCoinsForm/>
  </section>
</template>