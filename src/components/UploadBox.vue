<template>
  <section>
    <b-field v-if="dropFile == null">
      <b-upload v-model="dropFile" drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p class="subtitle">Drop new widget here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags" v-if="dropFile != null">
      <div class="tag is-primary is-large">
        {{ dropFile.name }}
        <button class="delete is-small" type="button" @click="deleteDropFile()"></button>
      </div>
    </div>
    <b-progress
      :value="progress"
      :type="progressType"
      v-show="uploading || done || failed"
      show-value
      size="is-medium"
    >{{msg}}</b-progress>
    <b-button
      @click="upload()"
      :loading="uploading"
      :disabled="dropFile == null"
      v-if="!done"
    >Upload</b-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import store from "@/store"
import router from "@/router"

@Component
export default class UploadBox extends Vue {
  private url = process.env.VUE_APP_HAR + "widgets/upload"
  private msg: string = ""
  public dropFile: File = null
  public uploading: boolean = false
  public done: boolean = false
  public failed: boolean = false
  public progress: number = null
  public progressType: string = "is-primary"

  get profileURL() {
    return "/profile/" + store.state.user.username
  }

  deleteDropFile() {
    this.dropFile = null
    this.uploading = false
    this.done = false
    this.failed = false
    this.progressType = "is-primary"
    this.msg = ""
    this.progress = null
  }

  upload() {
    if (!this.dropFile) {
      this.deleteDropFile()
      return
    }
    this.uploading = true
    this.$forceUpdate()
    let formData = new FormData()
    formData.append("widget", this.dropFile)

    axios
      .post(this.url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        console.log(response)
        this.uploading = false
        if (response.data.success) {
          console.log("Success")
          this.msg = "Done."
          this.progress = 100
          this.done = true
          this.failed = false
          this.progressType = "is-success"
          this.$emit("event", {
            filename: response.data.filename,
            manifest: response.data.manifest,
          })
        } else {
          console.log("fail")
          this.msg = response.data.description
          this.progress = 100
          this.done = false
          this.failed = true
          this.progressType = "is-danger"
        }
      })
      .catch(error => {
        this.uploading = false
        this.msg = error
        this.progress = 0
        this.done = false
        this.failed = true
        this.progressType = "is-danger"
      })
  }
}
</script>
