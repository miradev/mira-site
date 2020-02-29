<template>
  <section>
    <b-field>
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

    <div class="tags" v-if="dropFile">
      <div class="tag is-primary">
        {{ dropFile.name }}
        <button class="delete is-small" type="button" @click="deleteDropFile()"></button>
      </div>
      <b-button @click="upload()" :loading="uploading">Upload</b-button>
    </div>
    <div>
      <b-progress v-show="dropFile && uploading"></b-progress>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import store from "../store"
import router from "../router"

@Component
export default class Profile extends Vue {
  public dropFile?: File = undefined
  public uploading: boolean = false

  get profileURL() {
    return "/profile/" + store.state.user.username
  }
  deleteDropFile() {
    this.dropFile = undefined
  }
  upload() {
    this.uploading = true
    this.$forceUpdate()
  }
}
</script>
