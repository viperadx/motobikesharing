<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-if="user && userDetails.idDriver" link to="/home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/searchforaride">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Search for a ride</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/account">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-show="user && userDetails.idDriver" link to="/earnings">
          <v-list-item-action>
            <v-icon>mdi-cash</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Earnings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/rides">
          <v-list-item-action>
            <v-icon>mdi-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Curse</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/help">
          <v-list-item-action>
            <v-icon>mdi-help-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user && userDetails.admin" link to="/admin">
          <v-list-item-action>
            <v-icon>mdi-head-minus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user" link to="/chat">
          <v-list-item-action>
            <v-icon>mdi-comment-processing</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Support</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onSignOut" v-if="user">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>MotoBike Sharing</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 RADU ALEXANDRU - CONSTANTIN</span>
    </v-footer>
  </v-app>
</template>

<script>
// import router from "@/router";
export default {
  props: {
    source: String,
  },
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user ? this.$store.getters.user : "";
    },
    userDetails() {
      return this.$store.getters.loggedInUserData
        ? this.$store.getters.loggedInUserData
        : "";
    },
  },
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
      window.location.reload();
      // router.push("/");
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch("readAllTexts");
    this.$store.dispatch("AuthChange");
    this.$store.dispatch("readUserDataByUserID", this.user);
  },
  mounted() {
    this.$store.dispatch("readUserDataByUserID", this.user);
    // router.push("/home");
  },
};
</script>

<style lang="scss">
@import "main.scss";
</style>
