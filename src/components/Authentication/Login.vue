<template>
  <v-container>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="initial password"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn color="success" class="mr-4" @click="submit">Login</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      passwordMatch: () => "The password you entered doesn' t match"
    },
    computed: {},
    methods: { submit() {} },
    created: {},
    mounted: {}
  })
};
</script>