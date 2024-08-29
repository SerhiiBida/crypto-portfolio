<script>
export default {
  name: "HeaderLayout",
  data() {
    return {
      drawer: true
    }
  },
  methods: {
    goToHome() {
      this.$router.push({
        name: "home"
      });
    },
    goToLogin() {
      this.$router.push({
        name: "login"
      });
    }
  }
}
</script>

<template>
  <!--Верхнее меню-->
  <v-app-bar
      class="header-bar"
      color="blue-accent-3"
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="header-bar-title" @click="goToHome">
      Crypto Portfolio
    </v-toolbar-title>
  </v-app-bar>

  <!--Боковая панель-->
  <v-navigation-drawer
      class="header-drawer"
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
    <!--Информация пользователь-->
    <!--    <v-list>-->
    <!--      <v-list-item-->
    <!--          class="header-drawer-user-info"-->
    <!--          prepend-avatar="/src/assets/images/user-default.png"-->
    <!--          title="...???..."-->
    <!--          subtitle="...???..."-->
    <!--      ></v-list-item>-->
    <!--    </v-list>-->

    <v-divider></v-divider>

    <!--Меню навигации-->
    <v-list
        class="header-drawer-menu size"
        density="compact"
        nav
    >
      <v-list-item
          prepend-icon="mdi-login"
          title="Login / Register"
          value="login"
          @click="goToLogin"
      >
      </v-list-item>
    </v-list>

    <!--Выход пользователя-->
    <template #append>
      <slot name="append">
      </slot>
    </template>
  </v-navigation-drawer>
</template>