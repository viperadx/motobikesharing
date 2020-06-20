<template>
  <v-card>
    <v-card-title>Create new account - CLIENT</v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout wrap>
        <v-flex xs12 align-center justify-space-between>
          <v-text-field
            label="Email"
            v-model="email"
            color="normal"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label="Last Name"
            v-model="lastname"
            color="normal"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label="First Name"
            color="normal"
            v-model="firstname"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 align-center justify-space-between>
          <v-text-field
            label="Phone number"
            v-model="phone"
            color="normal"
            :type="'number'"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 align-center justify-space-between>
          <v-text-field
            label="Credit card"
            v-model="creditcard"
            color="normal"
            :type="'number'"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-autocomplete
            :items="locations"
            v-model="location"
            color="normal"
            label="Residency"
            autocomplete
            :rules="[rules.required]"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="bdaymenu"
            v-model="bdaymenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="bday"
                label="Birthday date"
                readonly
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="bday"
              no-title
              scrollable
              :max="getMaxDate"
              min="1940-01-01"
            >
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="bdaymenu = false"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.bdaymenu.save(bday)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs6>
          <v-select
            :items="genders"
            v-model="gender"
            color="normal"
            label="Gender"
            :rules="[rules.required]"
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            name="input-10-1"
            label="Password"
            color="normal"
            hint="At least 8 characters"
            min="8"
            :type="passwordFieldType"
            v-model="password"
            append-icon="mdi-eye"
            @click:append="switchVisibility"
            :rules="[rules.required]"
            counter
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            name="input-10-1"
            label="Confirm password"
            hint="At least 8 characters"
            color="normal"
            min="8"
            :type="confirmPasswordFieldType"
            v-model="confirmPassword"
            append-icon="mdi-eye"
            @click:append="switchVisibilityConfirm"
            :rules="[comparePasswords]"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <div>
        By registering, you agree to the
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <a
              target="_blank"
              href="https://motobikesharing.web.app/#/termsandconditions"
              @click.stop
              v-on="on"
            >
              Terms and conditions
            </a>
          </template>
          Opens in new window
        </v-tooltip>
      </div>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        :disabled="emptyFieldValidationRegister"
        @click="clientSignUp"
        >Register</v-btn
      >
      <!-- :disabled="loading" -->
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
import moment from "moment";
import LocalitatiRO from "../../assets/LocalitatiRO";
export default {
  name: "Sign-up-client",
  data() {
    return {
      checkbox: false,
      location: null,
      phone: null,
      creditcard: null,
      lastname: null,
      firstname: null,
      e1: true,
      password: "",
      bdaymenu: false,
      passwordFieldType: "password",
      confirmPasswordFieldType: "password",
      email: "",
      locations: [],
      confirmPassword: "",
      bday: null,
      modal: false,
      genders: ["Male", "Female", "Other", "Unspecified"],
      menu2: false,
      gender: null,
      alert: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email.";
        },
      },
    };
  },
  computed: {
    getMaxDate() {
      let day = new Date();
      let dayWrapper = moment(day).subtract(216, "months");
      let maxDate = dayWrapper.format("YYYY-MM-DD");
      return maxDate;
    },
    emptyFieldValidationRegister() {
      return !(
        this.firstname &&
        this.lastname &&
        this.email &&
        this.phone &&
        this.location &&
        this.bday &&
        this.gender &&
        this.creditcard &&
        this.confirmPassword &&
        this.password &&
        this.password == this.confirmPassword
      );
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    switchVisibilityConfirm() {
      this.confirmPasswordFieldType =
        this.confirmPasswordFieldType === "password" ? "text" : "password";
    },
    clientSignUp() {
      this.$store.dispatch("signUpClient", {
        email: this.email,
        password: this.password,
        lastname: this.lastname,
        firstname: this.firstname,
        location: this.location,
        bday: this.bday,
        phone: this.phone,
        creditcard: this.creditcard,
        gender: this.gender,
      });
      this.signup = false;
    },
  },
  watch: {
    bdaymenu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit("setError", null);
      }
    },
  },
  mounted() {
    this.locations = LocalitatiRO;
  },
};
</script>
