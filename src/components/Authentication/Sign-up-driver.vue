<template>
  <v-card>
    <v-card-title>Create new account</v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout wrap>
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
        <v-flex xs6>
          <v-text-field
            label="Email"
            v-model="email"
            color="normal"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
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
            label="Credit card"
            v-model="creditcard"
            color="normal"
            :type="'number'"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-select
            :items="locations"
            v-model="location"
            color="normal"
            label="Location"
            autocomplete
            :rules="[rules.required]"
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="menubday"
            v-model="menubday"
            :close-on-content-click="false"
            :return-value.sync="bday"
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
              v-model="bday"
              no-title
              scrollable
              :max="new Date().toISOString().substr(0, 10)"
              min="1940-01-01"
            >
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menubday = false"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.menubday.save(bday)"
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
            label="Confirm password"
            hint="At least 8 characters"
            color="normal"
            v-model="confirmPassword"
            min="8"
            :type="'password'"
            :rules="[comparePasswords]"
          ></v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-btn raised class="primary" @click="onPickImageSelfie">Upload Selfie</v-btn>
          <input type="file" 
          style="display: none" 
          ref="fileInputSelfie" 
          accept="image/*"
          @change="onPickedImageSelfie"/>
        </v-flex>
        <v-flex xs3>
          <img :src ="imageUrlSelfie" height="70" width="200">
        </v-flex>
        <v-flex xs6>
          <div>Upload a selfie and your a picture of your ID, then click on the button below to verify identity!</div>
          <v-btn @click="testFace()">Verify Identity</v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn raised class="primary" @click="onPickImageID">Upload ID</v-btn>
          <input type="file" 
          style="display: none" 
          ref="fileInputID" 
          accept="image/*"
          @change="onPickedImageID"/>
        </v-flex>
        <v-flex xs3>
          <img :src ="imageUrlID" height="70" width="200">
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="menuid"
            v-model="menuid"
            :close-on-content-click="false"
            :return-value.sync="expireID"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="expireID"
                label="Expire date ID"
                readonly
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="expireID"
              no-title
              scrollable
              :min="new Date().toISOString().substr(0, 10)"
            >
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menuid = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menuid.save(expireID)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3>
          <v-btn raised class="primary" @click="onPickImageLicense">Upload License</v-btn>
          <input type="file" 
          style="display: none" 
          ref="fileInputLicense" 
          accept="image/*"
          @change="onPickedImageLicense"/>
        </v-flex>
        <v-flex xs3>
          <img :src ="imageUrlLicense" height="70" width="200">
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="menulicense"
            v-model="menulicense"
            :close-on-content-click="false"
            :return-value.sync="expireLicense"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="expireLicense"
                label="Expire date License"
                readonly
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="expireLicense"
              no-title
              scrollable
              :min="new Date().toISOString().substr(0, 10)"
            >
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menulicense = false"
                >Cancel</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.menulicense.save(expireLicense)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3>
          <v-btn raised class="primary" @click="onPickImageITP">Upload ITP</v-btn>
          <input type="file" 
          style="display: none" 
          ref="fileInputITP" 
          accept="image/*"
          @change="onPickedImageITP"/>
        </v-flex>
        <v-flex xs3>
          <img :src ="imageUrlITP" height="70" width="200">
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="menuitp"
            v-model="menuitp"
            :close-on-content-click="false"
            :return-value.sync="expireITP"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="expireITP"
                label="Expire date ITP"
                readonly
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="expireITP"
              no-title
              scrollable
              :min="new Date().toISOString().substr(0, 10)"
            >
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menuitp = false"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.menuitp.save(expireITP)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3>
          <v-btn raised class="primary" @click="onPickImageRCA">Upload RCA</v-btn>
          <input type="file" 
          style="display: none" 
          ref="fileInputRCA" 
          accept="image/*"
          @change="onPickedImageRCA"/>
        </v-flex>
        <v-flex xs3>
          <img :src ="imageUrlRCA" height="70" width="200">
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="menurca"
            v-model="menurca"
            :close-on-content-click="false"
            :return-value.sync="expireRCA"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="expireRCA"
                label="Expire date RCA"
                readonly
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="expireRCA"
              no-title
              scrollable
              :min="new Date().toISOString().substr(0, 10)"
            >
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menurca = false"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.menurca.save(expireRCA)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3>
          <v-btn raised class="primary" @click="onPickImageInsurance">Upload Insurance</v-btn>
          <input type="file" 
          style="display: none" 
          ref="fileInputInsurance" 
          accept="image/*"
          @change="onPickedImageInsurance"/>
        </v-flex>
        <v-flex xs3>
          <img :src ="imageUrlInsurance" height="70" width="200">
        </v-flex>
        <v-flex xs6>
          <v-menu
            ref="menuinsurance"
            v-model="menuinsurance"
            :close-on-content-click="false"
            :return-value.sync="expireInsurance"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="expireInsurance"
                label="Expire date Insurance"
                readonly
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="expireInsurance"
              no-title
              scrollable
              :min="new Date().toISOString().substr(0, 10)"
            >
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menuinsurance = false"
                >Cancel</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.menuinsurance.save(expireInsurance)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
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
      <v-btn type="submit" @click="driverSignUp">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import LocalitatiRO from "../../assets/LocalitatiRO";
export default {
  name: "Sign-up-driver",
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
      email: "",
      locations: [],
      confirmPassword: "",
      bday: null,
      expireID: null,
      expireLicense: null,
      expireRCA: null,
      expireITP: null,
      expireInsurance: null,
      menubday: null,
      menuid: null,
      menurca: null,
      menuitp: null,
      menulicense: null,
      menuinsurance: null,
      modal: false,
      imageID: null,
      imageUrlID: '',
      imageRCA: null,
      imageUrlRCA: '',
      imageLicense: null,
      imageUrlLicense: '',
      imageITP: null,
      imageSelfie: null,
      imageUrlSelfie: '',
      imageUrlITP: '',
      imageInsurance: null,
      imageUrlInsurance: '',
      captures: [],
      faceId: [],
      genders: ["Male", "Female", "Other", "Unspecified"],
      gender: null,
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
  },
  methods: {
    driverSignUp() {
      this.$store.dispatch("signUpDriver", {
        email: this.email,
        password: this.password,
        lastname: this.lastname,
        firstname: this.firstname,
        location: this.location,
        bday: this.bday,
        phone: this.phone,
        creditcard: this.creditcard,
        gender: this.gender,
        expiredateid: this.expireID,
        expiredatelicense: this.expireLicense,
        expiredaterca: this.expireRCA,
        expiredateitp: this.expireITP,
        expiredateinsurance: this.expireInsurance,
      });
      this.signup = false;
    },
    onPickImageID(){
      this.$refs.fileInputID.click()
    },
    onPickedImageID (event){
      const filesID = event.target.files
      let filenameID = filesID[0].name
      if (filenameID.lastIndexOf('.') <=0){
        return alert ('Please add a valid file!')
      }
      const fileReaderID = new FileReader()
      fileReaderID.addEventListener('load', () =>{
        this.imageUrlID = fileReaderID.result
      })
      fileReaderID.readAsDataURL(filesID[0])
      this.imageID = filesID[0]
    },
    onPickImageRCA(){
    this.$refs.fileInputRCA.click()
    },
    onPickedImageRCA (event){
      const filesRCA = event.target.files
      let filenameRCA = filesRCA[0].name
      if (filenameRCA.lastIndexOf('.') <=0){
        return alert ('Please add a valid file!')
      }
      const fileReaderRCA = new FileReader()
      fileReaderRCA.addEventListener('load', () =>{
        this.imageUrlRCA = fileReaderRCA.result
      })
      fileReaderRCA.readAsDataURL(filesRCA[0])
      this.imageRCA = filesRCA[0]
    },
    onPickImageITP(){
    this.$refs.fileInputITP.click()
    },
    onPickedImageITP (event){
      const filesITP = event.target.files
      let filenameITP = filesITP[0].name
      if (filenameITP.lastIndexOf('.') <=0){
        return alert ('Please add a valid file!')
      }
      const fileReaderITP = new FileReader()
      fileReaderITP.addEventListener('load', () =>{
        this.imageUrlITP = fileReaderITP.result
      })
      fileReaderITP.readAsDataURL(filesITP[0])
      this.imageITP = filesITP[0]
    },
    onPickImageLicense(){
    this.$refs.fileInputLicense.click()
    },
    onPickedImageLicense (event){
      const filesLicense = event.target.files
      let filenameLicense = filesLicense[0].name
      if (filenameLicense.lastIndexOf('.') <=0){
        return alert ('Please add a valid file!')
      }
      const fileReaderLicense = new FileReader()
      fileReaderLicense.addEventListener('load', () =>{
        this.imageUrlLicense = fileReaderLicense.result
      })
      fileReaderLicense.readAsDataURL(filesLicense[0])
      this.imageLicense = filesLicense[0]
    },
    onPickImageInsurance(){
    this.$refs.fileInputInsurance.click()
    },
    onPickedImageInsurance (event){
      const filesInsurance = event.target.files
      let filenameInsurance = filesInsurance[0].name
      if (filenameInsurance.lastIndexOf('.') <=0){
        return alert ('Please add a valid file!')
      }
      const fileReaderInsurance = new FileReader()
      fileReaderInsurance.addEventListener('load', () =>{
        this.imageUrlInsurance = fileReaderInsurance.result
      })
      fileReaderInsurance.readAsDataURL(filesInsurance[0])
      this.imageInsurance = filesInsurance[0]
    },        
    onPickImageSelfie(){
    this.$refs.fileInputSelfie.click()
    },
    onPickedImageSelfie (event){
      const filesSelfie = event.target.files
      let filenameSelfie = filesSelfie[0].name
      if (filenameSelfie.lastIndexOf('.') <=0){
        return alert ('Please add a valid file!')
      }
      const fileReaderSelfie = new FileReader()
      fileReaderSelfie.addEventListener('load', () =>{
        this.imageUrlSelfie = fileReaderSelfie.result
      })
      fileReaderSelfie.readAsDataURL(filesSelfie[0])
      this.imageSelfie = filesSelfie[0]
    },        
  },
  mounted() {
    this.locations = LocalitatiRO;
  },
};
</script>
