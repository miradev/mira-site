<template>
  <div>
    <section class="hero welcome is-info">
      <b-loading v-show="widget==null && !failed" :is-full-page="true" :active.sync="loading"></b-loading>
      <div class="hero-body">
        <div class="columns">
          <div class="column is-2">
            <figure class="image is-square" v-if="widget != null">
              <img class="widget-image" :src="widget.images[0]" alt />
            </figure>
          </div>
          <div class="column is-12" v-if="widget != null">
            <div class="container content">
              <h1 class="title">{{widget.name}}</h1>
              <h3 class="subtitle">{{widget.description}}</h3>
              <b-button
                :type="saved ? 'is-light' : 'is-success'"
                @click="saveWidget()"
                v-show="$store.state.authenticated"
                size="is-large"
              >{{ text }}</b-button>
              <b-button
                type=" is-success"
                v-show="!$store.state.authenticated"
                size="large"
                disabled
              >Login to Save</b-button>
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
import { IWidget } from "@/common/Types"

@Component
export default class WidgetPage extends Vue {
  private url = process.env.VUE_APP_HAR + "widgets/"
  public widget: IWidget = null
  private failed: boolean = false
  private loading: boolean = true

  get saved() {
    if (this.widget) {
      let widgets = store.state.widgets
      for (let i in widgets) {
        if (widgets[i]._id == this.widget._id) {
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

  private mounted() {
    const id = this.$route.params.id
    axios
      .get(this.url + id)
      .then(response => {
        const { widget } = response.data
        this.widget = widget
        this.loading = false
        this.failed = false
        this.$forceUpdate()
      })
      .catch(err => {
        console.log("Bad:" + err)
        this.failed = true
      })
  }
  public saveWidget() {
    if (this.saved) {
      store.commit("removeWidget", this.widget)
    } else {
      if (this.widget) {
        store.commit("saveWidget", this.widget)
      }
    }
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
