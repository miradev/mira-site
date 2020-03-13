<template>
  <div>
    <section class="hero welcome is-info">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <figure class="image is-square" v-if="widget != null">
              <img class="widget-image" :src="widget.images[0]" alt />
            </figure>
          </div>
          <div class="column" v-if="widget != null">
            <div class="container content">
              <h1 class="title">{{widget.name}}</h1>
              <h3 class="subtitle">{{widget.description}}</h3>

              <b-field>
                <b-taginput
                  type="is-info"
                  v-model="tags"
                  :data="filteredTags"
                  autocomplete
                  :allow-new="allowNew"
                  :open-on-focus="openOnFocus"
                  icon="tag"
                  placeholder="Tags"
                  @typing="getFilteredTags"
                  :disabled="!editMode"
                ></b-taginput>
              </b-field>
              <b-button
                :type="saved ? 'is-light' : 'is-success'"
                @click="favouriteWidget()"
                v-show="$store.state.authenticated"
                size="is-large"
              >{{ text }}</b-button>
              <b-button
                type=" is-success"
                v-show="!$store.state.authenticated"
                size="large"
                disabled
              >Login to Save</b-button>
              <b-button
                :type="editMode ? 'is-success' : 'is-light'"
                @click="save()"
                v-show="isDeveloper"
                size="is-large"
              >{{editMode ? "Save Changes" : "Edit"}}</b-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section" v-if="widget != null">
      <div class="container">
        <div class="content is-medium">
          <h3 class="title is-3">Overview</h3>
          <div class="box">
            <h4 id="const" class="title is-3">manifest.json</h4>
            <pre><code class="language-javascript">{{manifest}}</code></pre>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!--<section class="section">-->
  <!--<b-loading v-show="widget==null && !failed" :is-full-page="false" :active.sync="loading"></b-loading>-->
  <!--<div class="container">-->
  <!--<h2 class="subtitle" v-show="widget==null && failed">No widget found....</h2>-->
  <!--<div class="columns">-->
  <!--<div class="column is-2">-->
  <!--<figure class="image" v-if="widget != null">-->
  <!--<img class="widget-image" :src="widget.images[0]" alt />-->
  <!--</figure>-->
  <!--</div>-->
  <!--<div class="column" v-if="widget != null">-->
  <!--<h1 class="title">{{ widget.name }}</h1>-->
  <!--<h4 class="subtitle is-5">-->
  <!--<i class="fa fa-user"></i>-->
  <!--&nbsp;&nbsp;By:{{ widget.authorId }}-->
  <!--</h4>-->
  <!--<h1 class="title is-4">Description</h1>-->
  <!--<h3 class="subtitle">{{ widget.description }}</h3>-->
  <!--<button-->
  <!--class="button"-->
  <!--:class="saved ? 'is-danger' : 'is-success'"-->
  <!--@click="saveWidget()"-->
  <!--v-show="$store.state.authenticated"-->
  <!--{{ text }}</button>-->
  <!--<button-->
  <!--class="button is-success"-->
  <!--v-show="!$store.state.authenticated"-->
  <!--disabled-->
  <!--Login to Save</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</section>-->
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import store from "../store"
import { IWidget, WidgetTags } from "@/common/Types"

@Component
export default class WidgetPage extends Vue {
  private url = process.env.VUE_APP_HAR + "widgets/"
  private widget: IWidget = {
    _id: "",
    name: "",
    description: "",
    active: false,
    authorId: "",
    filename: "",
    tags: [],
    images: [],
    manifest: {},
  }
  private isDeveloper: boolean = false
  private editMode: boolean = false
  private tags: WidgetTags[] = []

  private allowNew: boolean = false
  private openOnFocus: boolean = true
  private validTags: string[] = [
    WidgetTags.ACCESSORY,
    WidgetTags.GAME,
    WidgetTags.NEWS,
    WidgetTags.SOCIAL,
    WidgetTags.UTILITY,
  ]
  private filteredTags: string[] = [
    WidgetTags.ACCESSORY,
    WidgetTags.GAME,
    WidgetTags.NEWS,
    WidgetTags.SOCIAL,
    WidgetTags.UTILITY,
  ]

  get saved() {
    if (this.widget) {
      let widgets = store.state.user.favorites
      for (let i of widgets) {
        if (i == this.widget._id) {
          return true
        }
      }
    }
    return false
  }

  get text() {
    return this.saved ? "Favourited" : "Favourite"
  }

  get manifest() {
    if (this.widget == null) {
      return ""
    }
    if ("manifest" in this.widget) {
      return this.widget.manifest
    }
    return "No manifest file found... This widget must be a demo widget."
  }

  getFilteredTags(text: string) {
    this.filteredTags = this.validTags.filter(option => {
      return option.toLowerCase().indexOf(text.toLowerCase()) >= 0
    })
  }

  mounted() {
    const id = this.$route.params.id
    let myWidgetsURL: string =
      process.env.VUE_APP_HAR + "widgets?userId=" + store.state.user.username
    axios
      .get(this.url + id)
      .then(response => {
        const { widget } = response.data
        this.widget = widget
        this.tags = widget.tags
        this.$forceUpdate()
        axios.get(myWidgetsURL).then(response => {
          const { widgets } = response.data
          if (widgets.some(e => e._id == this.widget._id)) {
            this.isDeveloper = true
          }
        })
      })
      .catch(err => {
        console.log("Bad:" + err)
      })
  }
  favouriteWidget() {
    if (this.saved) {
      store.commit("removeWidget", this.widget)
    } else {
      if (this.widget) {
        store.commit("saveWidget", this.widget)
      }
    }
  }

  save() {
    let url: string = process.env.VUE_APP_HAR + "widgets/" + this.widget._id
    this.editMode = !this.editMode
    let body: IWidget = {
      _id: this.widget._id,
      name: this.widget.name,
      description: this.widget.description,
      active: this.widget.active,
      authorId: this.widget.authorId,
      filename: this.widget.filename,
      images: this.widget.images,
      manifest: this.widget.manifest,
      tags: this.tags,
    }
    axios
      .put(url, body, { withCredentials: true })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log("Bad:" + err)
      })
  }
}
</script>

<style lang="stylus" scoped>
.is-square >>> img {
  object-fit: cover;
}

.is-dark {
  color: whitesmoke !important;
}

.widget-image {
  object-fit: cover;
}

button.button {
  margin-right: 1rem;
}
</style>
