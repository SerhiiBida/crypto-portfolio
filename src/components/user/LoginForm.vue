<script>
import {authForm} from "@/mixins/form.js";

export default {
  name: "LoginForm",
  mixins: [authForm],
  methods: {}
}
</script>

<template>
  <section class="login-form-wrapper">
    <!--Заголовки-->
    <v-img
        class="mx-auto my-4"
        max-width="70"
        src="/src/assets/images/logo.png"
        alt="logo"
    ></v-img>
    <p class="text-h4 text-center font-weight-bold mb-2">
      Welcome back!
    </p>
    <p class="text-h6 font-weight-regular text-center mb-8">
      Log into your account
    </p>

    <!--Форма-->
    <form action="#" method="post" class="login-form">
      <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          variant="outlined"
      >
      </v-text-field>
      <v-text-field
          v-model="form.password"
          class="mb-2"
          label="Password"
          type="password"
          variant="outlined"
      >
      </v-text-field>
      <v-btn class="mb-3" block color="blue-accent-3">
        Log in
      </v-btn>

      <p class="text-center">
        Don't have an account?
        <RouterLink :to="{name: 'register'}">
          <a href="#">
            Sign up
          </a>
        </RouterLink>
      </p>
    </form>
  </section>
</template>