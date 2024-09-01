<script>
import {portfolioForm} from "@/mixins/form.js";
import DialogYesNo from "@/components/ui/DialogYesNo.vue";
import {Portfolios} from "@/servises/database.js";

export default {
  name: "PortfolioForm",
  mixins: [portfolioForm],
  components: {
    DialogYesNo
  },
  props: {
    portfolio: Object
  },
  data() {
    return {
      isDisabled: true,
    }
  },
  methods: {
    changeIsDisabled() {
      this.isDisabled = !this.isDisabled;
    },
    async changePortfolioName() {
      const valid = await this.validateForm();

      if (valid) {
        const dbPortfolio = new Portfolios();

        const portfolioId = this.portfolio.id;
        const name = this.form.name;

        await dbPortfolio.updatePortfolioName(portfolioId, name);

        this.changeIsDisabled();
      }
    },
    cancelChangePortfolioName() {
      this.form.name = this.portfolio.name

      this.changeIsDisabled();
    },
    async deletePortfolio(isActive) {
      // Закрываем модальное окно
      isActive.value = false

      const dbPortfolio = new Portfolios();

      await dbPortfolio.deletePortfolio(this.portfolio.id);
    }
  },
  mounted() {
    this.form.name = this.portfolio.name;
  }
}
</script>

<template>
  <v-form
      ref="form"
      action="#"
      method="post"
      class="portfolio-form d-flex justify-center align-start"
  >
    <v-text-field
        v-model="form.name"
        :rules="!isDisabled ? nameRules : undefined"
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
      <!--Изменить Имя-->
      <v-btn
          class="ml-2 mt-1"
          color="orange-darken-2"
          icon="mdi-wrench"
          @click="changeIsDisabled"
      ></v-btn>

      <!--Удалить портфель-->
      <DialogYesNo
          class-activator="ml-1 mt-1"
          color-activator="red"
          icon-activator="mdi-minus-circle"
          title-dialog="Delete"
          color-dialog="error"
      >
        <template #text>
          Are you sure you want to delete?
        </template>

        <template #yes-no-buttons="{isActive}">
          <v-btn
              text="Yes"
              @click="deletePortfolio(isActive)"
          ></v-btn>
          <v-btn
              text="No"
              @click="isActive.value = false"
          ></v-btn>
        </template>
      </DialogYesNo>
    </template>

    <!--Изменить название портфеля-->
    <template v-if="!isDisabled">
      <v-btn
          class="ml-2 mt-1"
          color="primary"
          icon="mdi-checkbox-marked-circle"
          @click="changePortfolioName"
      ></v-btn>

      <v-btn
          class="ml-1 mt-1"
          color="red"
          icon="mdi-cancel"
          @click="cancelChangePortfolioName"
      ></v-btn>
    </template>
  </v-form>
</template>