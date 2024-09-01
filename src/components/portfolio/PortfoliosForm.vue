<script>
import PortfolioForm from "@/components/portfolio/PortfolioForm.vue";

export default {
  name: "PortfoliosForm",
  components: {PortfolioForm},
  data() {
    return {
      portfolios: [
        {id: 1, name: "Portfolio 1"},
        {id: 2, name: "Portfolio 2"},
        {id: 3, name: "Portfolio 3"},
        // {id: 4, name: "Portfolio 4"},
        // {id: 5, name: "Portfolio 5"},
      ],
      form: {
        name: ""
      }

    }
  }
}
</script>

<template>
  <form
      action="#"
      method="post"
      class="portfolios-form"
  >
    <p class="portfolios-form-title text-h6 text-center font-weight-bold text-blue-accent-3 mb-4">
      Portfolios
    </p>

    <div class="portfolios-form-data d-flex flex-column align-center">
      <template v-if="portfolios.length > 0">
        <template v-for="portfolio in portfolios" :key="portfolio.id">
          <PortfolioForm :portfolio="portfolio"/>
        </template>
      </template>
    </div>

    <div v-if="portfolios.length < 5" class="portfolios-form-add">
      <v-divider v-if="portfolios.length > 0">
        Or
      </v-divider>

      <v-text-field
          label="Name"
          variant="outlined"
          class="mt-4"
      >
      </v-text-field>

      <v-btn
          v-model="form.name"
          type="submit"
          block
          color="blue-accent-3"
      >
        Add
      </v-btn>
    </div>
    <div v-else class="portfolios-form-add">
      <v-btn
          block
          color="blue-accent-3"
      >
        Maximum 5 portfolios
      </v-btn>
    </div>
  </form>
</template>