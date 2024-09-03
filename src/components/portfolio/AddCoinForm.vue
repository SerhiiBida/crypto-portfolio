<script>
import AutocompleteWithImg from "@/components/ui/autocomplete/AutocompleteWithImg.vue";

export default {
  name: "AddCoinsForm",
  components: {AutocompleteWithImg},
  data() {
    return {
      availableCoins: [
        {
          id: "btc",
          name: "Bitcoin",
          image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
        },
        {
          id: "ethereum",
          name: "Ethereum",
          image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
        }
      ],
      form: {
        selectedCoin: "",
        coinsAmount: 0,
        moneyAmount: 0
      },
      selectCoinRules: [
        v => !!v || "Be sure to select a coin"
      ],
      coinsAmountRules: [
        v => !!v || "Cannot be equal to 0",
        v => v > 0 || "Can't be negative"
      ],
      moneyAmountRules: [
        v => !!v || "Cannot be equal to 0",
        v => v > 0 || "Can't be negative"
      ],
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

      }
    }
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
        :rules="coinsAmountRules"
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
        :rules="moneyAmountRules"
        variant="solo"
        class="add-coin-form-input-amount-money mb-2"
        @input="form.moneyAmount = form.moneyAmount < 0 ? 0 : form.moneyAmount"
    >
    </v-text-field>

    <v-btn
        type="submit"
        block
        color="blue-accent-3"
    >
      Add
    </v-btn>
  </v-form>
</template>