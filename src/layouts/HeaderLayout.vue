<script>
import {mapStores} from "pinia";
import {useUserStore} from "@/stores/auth.js";

export default {
  name: "HeaderLayout",
  props: {
    isLoggedIn: Boolean,
    userEmail: String,
    userRole: String
  },
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
    },
    goToPortfolio() {
      this.$router.push({
        name: "portfolio"
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
    <v-list v-if="isLoggedIn">
      <v-list-item
          class="header-drawer-auth-info"
          prepend-avatar="/src/assets/images/user-default.png"
          :title="userEmail"
          :subtitle="userRole"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!--Меню навигации-->
    <v-list
        class="header-drawer-menu size"
        density="compact"
        nav
    >
      <v-list-item
          v-if="!isLoggedIn"
          prepend-icon="mdi-login"
          title="Login / Register"
          value="login"
          @click="goToLogin"
      >
      </v-list-item>

      <v-list-item
          v-if="isLoggedIn"
          prepend-icon="mdi-widgets"
          title="Portfolio"
          value="login"
          @click="goToPortfolio"
      >
      </v-list-item>
    </v-list>

    <!--Выход пользователя-->
    <template #append>
      <slot name="logout">
      </slot>
    </template>
  </v-navigation-drawer>
</template>