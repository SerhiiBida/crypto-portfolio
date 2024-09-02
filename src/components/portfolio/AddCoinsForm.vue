<script>
export default {
  name: "AddCoinsForm",
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
      ]
    }
  },
  methods: {
    addCoins() {

    }
  }
}
</script>

<template>
  <v-form
      ref="form"
      action="#"
      method="post"
      class="add-coins-form"
      @submit.prevent="addCoins"
  >
    <p class="add-coins-form-title text-h5 text-center font-weight-medium text-blue-accent-3 mb-4">
      Add a coin
    </p>
    <v-autocomplete
        v-if="availableCoins.length > 0"
        label="Coins"
        :items="availableCoins"
        item-title="name"
        item-value="id"
        variant="solo"
        class="add-coins-form-select-coin mb-2"
    >
      <!--Картинка на элементе-->
      <template v-slot:item="{ props, item }">
        <v-list-item
            v-bind="props"
            :prepend-avatar="item.raw.image"
            :title="item.raw.name"
        ></v-list-item>
      </template>

      <!-- Настройка отображения выбранного элемента -->
      <template v-slot:selection="{ item, index }">
        <v-list-item
            :title="item.raw.name"
        >
          <template #prepend>
            <img
                :src="item.raw.image"
                alt="coin"
                class="mr-1"
            />
          </template>
        </v-list-item>
      </template>
    </v-autocomplete>

    <!--Количество монет-->
    <v-text-field
        type="number"
        label="Number of coins"
        variant="solo"
        class="add-coins-form-input-amount-coins mb-2"
    >
    </v-text-field>

    <!--Количество денег потраченных-->
    <v-text-field
        type="number"
        label="Investments, $"
        variant="solo"
        class="add-coins-form-input-amount-money mb-2"
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