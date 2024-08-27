<script>
export default {
  name: "HeaderLayout",
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<template>
  <!--Верхнее меню-->
  <v-app-bar
      color="cyan-accent-4"
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Crypto Portfolio</v-toolbar-title>
  </v-app-bar>

  <!--Боковая панель-->
  <v-navigation-drawer
      class="header"
      v-model="drawer"
      color="cyan-accent-1"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
    <v-list>
      <v-list-item
          class="header-user-info"
          prepend-avatar="/src/assets/images/user-default.png"
          title="...???..."
          subtitle="...???..."
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list class="size" density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Login" value="login"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="Register" value="register"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>