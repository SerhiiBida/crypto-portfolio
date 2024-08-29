<script>
import {authForm} from "@/mixins/form.js";

export default {
  name: "RegisterForm",
  mixins: [authForm],
  methods: {
    async registration() {
      const valid = await this.validateForm();

      if (valid) {
        console.log(valid);
      }
    }
  }
}
</script>

<template>
  <section class="register-form-wrapper">
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
      Create a new account
    </p>

    <!--Форма-->
    <v-form
        ref="form"
        action="#"
        method="post"
        class="register-form"
        @submit.prevent="registration"
    >
      <v-text-field
          v-model="form.email"
          class="mb-2"
          label="Email"
          type="email"
          :rules="emailRules"
          variant="outlined"
          required
      >
      </v-text-field>
      <v-text-field
          v-model="form.password"
          class="mb-2"
          label="Password"
          type="password"
          :rules="passwordRules"
          variant="outlined"
          required
      >
      </v-text-field>
      <v-btn
          class="mb-3"
          type="submit"
          block
          color="blue-accent-3"
      >
        Register
      </v-btn>

      <p class="text-center">
        Do you have an account?
        <RouterLink :to="{name: 'login'}">
          <a href="#">
            Sign in
          </a>
        </RouterLink>
      </p>
    </v-form>
  </section>
</template>