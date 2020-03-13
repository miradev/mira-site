<template>
  <div class="column is-9">
    <section class="hero developer is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title white-text">Upload New Widget</h1>
        </div>
      </div>
    </section>
    <br />

    <div class="container">
      <b-steps v-model="activeStep" :hasNavigation="false">
        <b-step-item label="Upload" clickable>
          <h2 class="subtitle is-4">Upload a widget here</h2>
          <h2 class="subtitle is-6">
            See
            <a>docs</a> for more info.
          </h2>
          <UploadBox @event="uploaded"></UploadBox>
          <br />
          <b-button
            v-show="showNext"
            @click="activeStep++"
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
          >Next</b-button>
        </b-step-item>
        <b-step-item label="Details">
          <h2 class="subtitle is-4">Verify and complete the details below</h2>
          <b-field label="Name*">
            <b-input type="text" autofocus v-model="name" :disabled="'name' in manifest" />
          </b-field>
          <b-field label="Version*">
            <b-input type="text" autofocus v-model="version" :disabled="'version' in manifest" />
          </b-field>
          <b-field label="Identifier*">
            <b-input type="text" autofocus v-model="identifer" :disabled="'id' in manifest" />
          </b-field>
          <b-field label="Description">
            <b-input
              maxlength="200"
              type="textarea"
              autofocus
              v-model="description"
              :disabled="'description' in manifest"
            />
          </b-field>
          <b-field label="Image URL*">
            <b-input type="text" autofocus v-model="imageURL" />
          </b-field>
          <br />
          <br />
          <br />
          <div class="buttons">
            <b-button
              outlined
              @click="activeStep--"
              type="is-danger"
              icon-pack="fas"
              icon-left="backward"
            >Previous</b-button>
            <b-button
              v-show="validate"
              @click="submit()"
              outlined
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
            >Submit</b-button>
          </div>
        </b-step-item>
        <b-step-item label="Complete">
          <h1 class="title">Widget completed successfully.</h1>
          <h1 class="subtitle is-5">
            Find it under
            <a @click="$parent.currentPage = 6">My Widgets</a>
          </h1>
        </b-step-item>
      </b-steps>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import WidgetCard from "@/components/WidgetCard.vue"
import { UserTags } from "@/common/Types"
import store from "@/store"
import router from "@/router"
import UploadBox from "@/components/UploadBox.vue"

export interface FileResponse {
  filename: string
  manifest: object
}

@Component({
  components: {
    UploadBox,
    WidgetCard,
  },
})
export default class UploadWidget extends Vue {
  private url = process.env.VUE_APP_HAR + "widgets/"
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"
  private manifest: object = {}
  private filename: string = ""

  private identifer: string = ""
  private name: string = ""
  private version: string = ""
  private description: string = ""
  private imageURL: string = ""

  private msg: string = ""
  private showNext: boolean = false
  public activeStep: number = 0

  get profileURL() {
    return "/profile/" + store.state.user.username
  }
  get widgets() {
    return store.state.widgets
  }

  get isDeveloper() {
    return store.state.user.tags.includes(UserTags.DEVELOPER)
  }

  get validate() {
    return (
      this.name.length > 0 &&
      this.imageURL.length > 0 &&
      this.validURL(this.imageURL) &&
      this.version.length > 0 &&
      this.identifer.length > 0 &&
      this.filename.length > 0
    )
  }

  validURL(url: string) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
      "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    )
    return pattern.test(url)
  }

  uploaded(response: FileResponse) {
    this.showNext = true
    this.filename = response.filename
    this.manifest = response.manifest
    this.name = this.manifest["name"] ?? ""
    this.identifer = this.manifest["id"] ?? ""
    this.description = this.manifest["description"] ?? ""
    this.version = this.manifest["version"] ?? ""
  }

  submit() {
    let body = {
      _id: this.identifer,
      name: this.name,
      description: this.description,
      active: false,
      filename: this.filename,
      images: [this.imageURL],
      manifest: this.manifest,
    }
    axios
      .post(this.url, body, { withCredentials: true })
      .then(response => {
        if (response.data.success == false) {
          this.msg = "Widget Creation Failed"
          this.$forceUpdate()
          return
        }
        this.activeStep++
      })
      .catch(error => {
        this.msg = "Incorrect credentials."
        this.$forceUpdate()
      })
  }
}
</script>

<style lang="stylus" scoped>
.column >>> .profile-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.columns >>> .is-left-menu {
  margin-right: 40px;
  padding-left: 40px;
  padding-right: 20px;
  padding-top: 30px;
  background-color: $mid-gray;
}

.columns >>> .has-left-menu {
  padding-top: 30px;
}
</style>
