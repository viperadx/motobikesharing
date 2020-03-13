<template>
  <v-card>
    <v-card-title
      style="background: linear-gradient(to right, #433d6b , #f86c5c);color: white;"
      >Crează cont nou</v-card-title
    >
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
        <v-flex xs12 align-center justify-space-between>
          <v-text-field
            label="Phone number"
            v-model="phone"
            color="normal"
            :type="'number'"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label="Nume"
            v-model="nume"
            color="normal"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label="Prenume"
            color="normal"
            v-model="prenume"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select
            :items="locations"
            v-model="localitate"
            color="normal"
            label="Localitate"
            autocomplete
          ></v-select>
        </v-flex>
        <!-- <v-flex xs6>
          <v-menu
            ref="datanamenu"
            :close-on-content-click="false"
            v-model="datanamenu"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <v-text-field
              v-slot:activator="{ on }"
              v-model="datana"
              label="Birthday date"
              color="normal"
              v-on="on"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker
              ref="picker"
              v-model="datana"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="$refs.datanamenu.save(datana)"
            ></v-date-picker>
          </v-menu>
        </v-flex>-->
        <v-flex xs6>
          <v-text-field
            name="input-10-1"
            label="Parolă"
            color="normal"
            hint="Minim 8 caractere"
            v-model="password"
            min="8"
            :append-icon-cb="() => (e1 = !e1)"
            :type="'password'"
            :rules="[rules.required]"
            counter
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            name="input-10-1"
            label="Confirmă parolă"
            hint="Minim 8 caractere"
            color="normal"
            v-model="confirmPassword"
            min="8"
            :type="'password'"
            :rules="[comparePasswords]"
          ></v-text-field>
        </v-flex>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
        >
          <template v-slot:label>
            <div>
              I agree to the
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <a
                    target="_blank"
                    href="http://localhost:8080/#/termsandconditions"
                    @click.stop
                    v-on="on"
                    >Terms and Conditions</a
                  >
                </template>
                Opens in new window
              </v-tooltip>
            </div>
          </template>
        </v-checkbox>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn style="color: #f86c5c;" type="submit" @click="userSignUp"
        >Înregistrare</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import LocalitatiRO from "../../assets/LocalitatiRO";

export default {
  name: "Sign-up",
  data: () => ({
    checkbox: false,
    localitate: null,
    phone: null,
    nume: null,
    prenume: null,
    e1: true,
    password: "",
    // datanamenu: false,
    email: "",
    // datana: null,
    locations: [],
    confirmPassword: "",
    rules: {
      required: value => !!value || "Obligatoriu.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email invalid.";
      }
    }
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Parolele nu corespund"
        : "";
    }
  },
  methods: {
    userSignUp() {
      this.$store.dispatch("signUp", {
        email: this.email,
        password: this.password,
        nume: this.nume,
        prenume: this.prenume,
        localitate: this.localitate,
        // datana: this.datana,
        phone: this.phone
      });
      this.signup = false;
    }
  },
  mounted() {
    this.locations = LocalitatiRO;
  }
};
</script>
