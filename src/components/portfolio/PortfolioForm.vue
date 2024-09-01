<script>
export default {
  name: "PortfolioForm",
  props: {
    portfolio: Object
  },
  data() {
    return {
      isReadonly: true
    }
  }
}
</script>

<template>
  <form
      action="#"
      method="post"
      class="portfolio-form"
  >
    <v-text-field
        v-model="portfolio.name"
        variant="solo"
        v-bind="{readonly: isReadonly}"
        class="portfolio-form-input"
    >
      <template #prepend>
        <img
            src="@/assets/images/work.png"
            alt="work"
            class="portfolio-form-prepend-img"
        />
      </template>
    </v-text-field>
  </form>
</template>