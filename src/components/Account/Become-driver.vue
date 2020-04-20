<template>
  <v-card>
    <v-card-title>Complete the form below to become a driver!</v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout wrap>
        <v-flex xs6>
          <v-btn raised class="primary" @click="onPickImageSelfie">Upload Selfie</v-btn>
          <input type="file" 
          style="display: none" 
          ref="fileInputSelfie" 
          accept="image/*"
          @change="onPickedImageSelfie"/>
        </v-flex>
        <v-flex xs6>
          <img :src ="imageUrlSelfie" height="70" width="200">
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
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="submit" >Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Become-driver",
  data() {
    return {
      expireID: null,
      expireLicense: null,
      expireRCA: null,
      expireITP: null,
      expireInsurance: null,
      menuid: null,
      menurca: null,
      menuitp: null,
      menulicense: null,
      menuinsurance: null,
      imageID: null,
      imageUrlID: null,
      imageRCA: null,
      imageUrlRCA: null,
      imageLicense: null,
      imageUrlLicense: null,
      imageITP: null,
      imageSelfie: null,
      imageUrlSelfie: null,
      imageUrlITP: null,
      imageInsurance: null,
      imageUrlInsurance: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {},
  methods: {
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
  created() {},
  mounted() {},
};
</script>
