<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs12 align-center justify-space-between>
          <v-text-field
            label="Email"
            v-model="email"
            color="normal"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            v-model="password"
            min="8"
            color="normal"
            :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            :rules="[rules.required]"
            counter
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-btn to="/signupclient">New account for client</v-btn>
      <v-btn to="/signupdriver">New account for driver</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="normal" type="submit" @click="userRecover"
        >Forgot password?</v-btn
      >
      <v-btn type="submit" @click="userSignin">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
import router from "@/router";
import firebase from "@/firebase";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      rules: {
        required: value => !!value || "Required",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email.";
        }
      },
      e1: true,
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    if (this.user) {
      router.push("/home");
    }
  },
  methods: {
    userRecover() {
      const emailprompt = prompt(
        "Enter the email you wish to recover the password from",
        ""
      );
      firebase
        .auth()
        .sendPasswordResetEmail(emailprompt)
        .then(function() {
          window.alert(
            "An email to recover the password has been sent to: " + emailprompt
          );
        })
        .catch(function(error) {
          window.alert(error.message);
        });
    },
    userSignin() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password
      });
      this.signin = false;
      router.push("/home");
    }
  }
};
</script>
