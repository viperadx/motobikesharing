<template>
  <v-container>
    <v-layout text-center wrap
      >Disclaimer: any changes on this page (either the email, the password or
      both), will require the old password!</v-layout
    >
    <v-switch
      v-model="readonly"
      inset
      :label="`Readonly: ${readonly.toString()}`"
    ></v-switch>
    <v-text-field
      label="Email"
      outlined
      :readonly="readonly"
      :value="userDetails.email"
      id="email"
    ></v-text-field>
    <v-text-field
      name="input-10-1"
      label="Old Password"
      color="normal"
      hint="At least 8 characters"
      min="8"
      :type="oldPasswordFieldType"
      v-model="oldPassword"
      append-icon="mdi-eye"
      @click:append="switchVisibilityOld"
      counter
      id="oldPassword"
    ></v-text-field>
    <v-text-field
      name="input-10-1"
      label="New Password"
      color="normal"
      hint="At least 8 characters"
      min="8"
      :type="passwordFieldType"
      v-model="password"
      append-icon="mdi-eye"
      @click:append="switchVisibility"
      counter
      id="password"
    ></v-text-field>
    <v-text-field
      name="input-10-1"
      label="Retype new password"
      hint="At least 8 characters"
      color="normal"
      min="8"
      :type="confirmPasswordFieldType"
      v-model="confirmPassword"
      append-icon="mdi-eye"
      @click:append="switchVisibilityConfirm"
      :rules="[comparePasswords]"
    ></v-text-field>

    <div v-if="readonly === false">
      <v-btn
        :loading="loading3"
        :disabled="loading3"
        color="blue-grey"
        class="ma-2 white--text"
        @click="
          loader = 'loading3';
          updateAuthenticationDetails();
        "
      >
        Save changes
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Authentication-details",
  data() {
    return {
      name: "",
      readonly: true,
      loader: null,
      oldPasswordFieldType: "password",
      passwordFieldType: "password",
      confirmPasswordFieldType: "password",
      oldPassword: null,
      password: null,
      confirmPassword: null,
      loading3: false,
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
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    userID() {
      return this.$store.getters.user ? this.$store.getters.user : "";
    },
    driverData() {
      return this.$store.getters.presentDriverDataGetter
        ? this.$store.getters.presentDriverDataGetter
        : "";
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 2000);

      this.loader = null;
      setTimeout(() => (this.readonly = true), 2010);
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
    switchVisibilityOld() {
      this.oldPasswordFieldType =
        this.oldPasswordFieldType === "password" ? "text" : "password";
    },
    updateAuthenticationDetails() {
      const payload = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        oldEmail: this.userDetails.email,
        oldPassword: document.getElementById("oldPassword").value,
        userID: this.userID,
      };
      this.$store.dispatch("updateAuthenticationDetails", payload);
    },
  },
  created() {
    this.$store.dispatch("readUserDataByUserID", this.userID);
    this.$store.dispatch("readDriverDetailsByUserID", this.userID);
  },
  mounted() {
    // eslint-disable-next-line no-console
  },
};
</script>
