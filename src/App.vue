<script>
import HeaderLayout from "@/layouts/HeaderLayout.vue";

export default {
  name: "App",
  components: {HeaderLayout},
  data() {
    return {}
  }
}
</script>

<template>
  <v-app>
    <HeaderLayout/>

    <v-main>
      <RouterView/>
    </v-main>

  </v-app>
</template>