<script>
import AutocompleteWithImg from "@/components/ui/autocomplete/AutocompleteWithImg.vue";
import {Coins, CoinsInPortfolios} from "@/services/database.js";
import {getCoinData} from "@/services/coin-gecko.js";

export default {
  name: "AddCoinsForm",
  emits: ["updatePortfolio"],
  components: {
    AutocompleteWithImg
  },
  data() {
    return {
      availableCoins: [],  // [{id:"", name:"", image:"",}, ...]
      form: {
        selectedCoin: "",
        coinsAmount: 0,
        money: 0
      },
      currentPrice: null,
      checkInputMoney: false,
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
    negativeNumbersBun(key) {
      this.form[key] = this.form[key] < 0 ? 0 : this.form[key];
    },
    calculationCoinsValue() {
      if ((!this.checkInputMoney || !this.form.money) && this.currentPrice) {

        this.checkInputMoney = false;

        const coinsAmount = this.form.coinsAmount;

        this.form.money = Number((coinsAmount * this.currentPrice).toFixed(5));
      }
    },
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
        const money = Number(this.form.money);

        this.isLoading = true;

        await coinsInPortfolios.addHistoryCoinInPortfolio(
            portfolioId,
            coinId,
            coinsAmount,
            money
        );

        this.isLoading = false;

        // Запрос на обновление портфеля на странице
        this.$emit("updatePortfolio");

        this.$refs.form.reset();
      }
    }
  },
  watch: {
    // Сохранение актуальной цены выбранной монеты
    async "form.selectedCoin"(newValue) {
      if (newValue) {
        this.currentPrice = null;

        const coinData = await getCoinData(newValue);

        if (!coinData) {
          return;
        }

        if (coinData.length === 0) {
          return;
        }

        this.currentPrice = coinData[0].current_price;
      }
    }
  },
  async mounted() {
    // Загрузка монет для выбора
    const coins = new Coins();

    const coinsData = await coins.getCoins();

    if (coinsData) {
      this.availableCoins = coinsData;
    }

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
        @input="negativeNumbersBun('coinsAmount'); calculationCoinsValue()"
    >
    </v-text-field>

    <!--Количество денег потраченных-->
    <v-text-field
        v-model="form.money"
        type="number"
        label="Investments, $"
        :rules="numberRules"
        variant="solo"
        class="add-coin-form-input-amount-money mb-2"
        @input="negativeNumbersBun('money'); checkInputMoney = true"
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