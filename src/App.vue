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
    <HeaderLayout>
      <template #append>
        <div class="pa-2">
          <v-btn color="blue-accent-3" block>
            Logout
          </v-btn>
        </div>
      </template>
    </HeaderLayout>

    <v-main>
      <RouterView/>
    </v-main>

  </v-app>
</template>