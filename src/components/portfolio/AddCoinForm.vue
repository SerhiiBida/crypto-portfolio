<script>
import AutocompleteWithImg from "@/components/ui/autocomplete/AutocompleteWithImg.vue";
import {Coins, CoinsInPortfolios} from "@/services/database.js";

export default {
  name: "AddCoinsForm",
  components: {
    AutocompleteWithImg
  },
  data() {
    return {
      availableCoins: [],  // [{id:"", name:"", image:"",}, ...]
      form: {
        selectedCoin: "",
        coinsAmount: 0,
        moneyAmount: 0
      },
      selectCoinRules: [
        v => !!v || "Be sure to select a coin"
      ],
      numberRules: [
        v => !!v || "Cannot be equal to 0",
        v => !isNaN(v) || "Must be a number",
        v => v > 0 || "Can't be negative",
      ],
      isLoading: false
    }
  },
  methods: {
    async validateForm() {
      const {valid} = await this.$refs.form.validate();

      return valid;
    },
    async addCoins() {
      const valid = await this.validateForm();

      if (valid) {
        const coinsInPortfolios = new CoinsInPortfolios();

        const portfolioId = this.$route.params.id;

        const coinId = this.form.selectedCoin;
        const coinsAmount = Number(this.form.coinsAmount);
        const moneyAmount = Number(this.form.moneyAmount);

        this.isLoading = true;

        await coinsInPortfolios.addCoinInPortfolio(
            portfolioId,
            coinId,
            coinsAmount,
            moneyAmount
        );

        this.isLoading = false;

        this.$refs.form.reset();
      }
    }
  },
  async mounted() {
    // Загрузка монет для выбора
    const coins = new Coins();

    this.availableCoins = await coins.getCoins();

    this.$refs.form.reset();
  }
}
</script>

<template>
  <v-form
      ref="form"
      action="#"
      method="post"
      class="add-coin-form"
      @submit.prevent="addCoins"
  >
    <p class="add-coin-form-title text-h5 text-center font-weight-medium text-blue-accent-3 mb-4">
      Add a coin
    </p>

    <!--Выбор монеты-->
    <AutocompleteWithImg
        v-model="form.selectedCoin"
        :items="availableCoins"
        item-title="name"
        item-value="id"
        :rules="selectCoinRules"
    />

    <!--Количество монет-->
    <v-text-field
        v-model="form.coinsAmount"
        type="number"
        label="Number of coins"
        :rules="numberRules"
        variant="solo"
        class="add-coin-form-input-amount-coins mb-2"
        @input="form.coinsAmount = form.coinsAmount < 0 ? 0 : form.coinsAmount"
    >
    </v-text-field>

    <!--Количество денег потраченных-->
    <v-text-field
        v-model="form.moneyAmount"
        type="number"
        label="Investments, $"
        :rules="numberRules"
        variant="solo"
        class="add-coin-form-input-amount-money mb-2"
        @input="form.moneyAmount = form.moneyAmount < 0 ? 0 : form.moneyAmount"
    >
    </v-text-field>

    <v-btn
        :loading="isLoading"
        :disabled="isLoading"
        type="submit"
        block
        color="blue-accent-3"
    >
      Add
    </v-btn>
  </v-form>
</template>