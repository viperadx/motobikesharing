<template>
  <div id="app">
    <canvas ref="canvas" id="emo_canvas" width="400" height="400"></canvas>
    <div>
      <video
        ref="video"
        id="video"
        width="400"
        height="400"
        playsinline
        muted
        autoplay
      ></video>
    </div>
    <v-btn @click="faceCapture()">CApture</v-btn>
    <v-btn @click="faceDetect()">SUBMIT</v-btn>
    <v-btn @click="faceVerify()">Verify</v-btn>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, Axios);

export default {
  name: "Face-api",
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      faceId: []
    };
  },

  mounted() {
    //Start the PC front camera and display real-time video on the video tag
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        });
    }
    console.log(this.$refs.canvas);
    this.canvas = this.$refs.canvas;
  },

  methods: {
    faceCapture() {
      this.canvas.getContext("2d").drawImage(this.video, 0, 0, 400, 300); //Store the captured image in the "captures" array
      this.captures.push(this.canvas.toDataURL("image/png"));
    },
    faceDetect() {
      let subscriptionKey = "51fc2876d96a42e19d922c448dc19990"; //microsoft face api key
      let uriBase =
        "https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect";

      //Convert the format of the image added at the end of the array and assign it to the imgURL format
      const imgURL = this.makeblob(this.captures[this.captures.length - 1]);
      //Send imgURL image to Face API
      console.log(imgURL);
      Axios.post(
        uriBase +
          "?returnFaceId=true",
        imgURL,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        }
      )
        .then((response) => {
          console.log(response.data[0].faceId);
          this.faceId.push(response.data[0].faceId)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    faceVerify () {
      let subscriptionKey = "51fc2876d96a42e19d922c448dc19990"; //microsoft face api key
      let uriBase =
        "https://northeurope.api.cognitive.microsoft.com/face/v1.0/verify";

      //Convert the format of the image added at the end of the array and assign it to the imgURL format
      const faceId = {
        faceId1: this.faceId[0],
        faceId2: this.faceId[1]
        }
        console.log(faceId)
        console.log(this.faceId[0])
        console.log(this.faceId[1])
      Axios.post(
        uriBase,
        faceId,
        {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        }
      )
        .then((response) => {
          console.log(response.data.isIdentical)
          console.log(response.data.confidence)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    makeblob: function(dataURL) {
      let BASE64_MARKER = ";base64,";
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(",");
        let contentType = parts[0].split(":")[1];
        let raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
      }
      let parts = dataURL.split(BASE64_MARKER);
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
  }
};
</script>




