<script>
export default {
  name: "PortfolioForm",
  props: {
    portfolio: Object
  },
  data() {
    return {
      newName: this.portfolio.name,
      isDisabled: true,
    }
  },
  methods: {
    changeIsDisabled() {
      this.isDisabled = !this.isDisabled;
    },
    changePortfolioName() {
      // Code...
      this.changeIsDisabled();
    },
    cancelChangePortfolioName() {
      this.newName = this.portfolio.name

      this.changeIsDisabled();
    }
  }
}
</script>

<template>
  <form
      action="#"
      method="post"
      class="portfolio-form d-flex justify-center align-start"
  >
    <v-text-field
        v-model="newName"
        variant="solo"
        v-bind="{disabled: isDisabled}"
        class="portfolio-form-input"
        maxlenght="12"
    >
      <template #prepend>
        <img
            src="@/assets/images/work.png"
            alt="work"
            class="portfolio-form-prepend-img"
        />
      </template>
    </v-text-field>

    <!--Выбор действия-->
    <template v-if="isDisabled">
      <v-btn
          class="ml-2"
          color="orange-darken-2"
          icon="mdi-wrench"
          @click="changeIsDisabled"
      ></v-btn>

      <!--Подтверждение действия!!! Нужен компонент отдельный!!-->
      <v-btn
          class="ml-1"
          color="red"
          icon="mdi-minus-circle"
      ></v-btn>
    </template>

    <!--Изменить название портфеля-->
    <template v-if="!isDisabled">
      <v-btn
          class="ml-2"
          color="primary"
          icon="mdi-checkbox-marked-circle"
          @click="changePortfolioName"
      ></v-btn>

      <v-btn
          class="ml-1"
          color="red"
          icon="mdi-cancel"
          @click="cancelChangePortfolioName"
      ></v-btn>
    </template>
  </form>
</template>