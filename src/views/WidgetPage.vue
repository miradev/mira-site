<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <figure class="image">
            <img class="widget-image" :src="widget.images[0]" alt />
          </figure>
        </div>
        <div class="column">
          <h1 class="title">{{ widget.name }}</h1>
          <h4 class="subtitle is-5">
            <i class="fa fa-user"></i>
            &nbsp;&nbsp;By:{{ widget.author }}
          </h4>
          <h3 class="subtitle">{{ widget.description }}</h3>
          <div class="columns">
            <div class="column">
              <button
                class="button"
                :class="saved ? 'is-danger' : 'is-success' "
                @click="saveWidget()"
                v-show="$store.state.authenticated"
              >{{text}}</button>
              <button
                class="button is-success"
                v-show="!$store.state.authenticated"
                disabled
              >Login to Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import Footer from "@/components/FooterSmall.vue"
import Navbar from "@/components/Navbar.vue"
import store from "../store"
import { Widget, WidgetResponse } from "@/components/Widget"
import WidgetCard from "@/components/WidgetCard.vue" // @ is an alias to /src

@Component({
  components: {
    Footer,
    Navbar,
    WidgetCard,
  },
})
export default class WidgetPage extends Vue {
  private url = process.env.VUE_APP_HAR + "widgets/"
  public widget?: Widget

  get saved() {
    if (this.widget) {
      let widgets = store.state.widgets
      for (let i in widgets) {
        console.log(widgets[i]._id)
        console.log(this.widget._id)
        if (widgets[i]._id == this.widget._id) {
          return true
        }
      }
    }
    return false
  }

  get text() {
    return this.saved ? "Unsave" : "Save"
  }

  private mounted() {
    const id = this.$route.params.id
    axios
      .request<WidgetResponse>({ url: this.url + id, method: "get" })
      .then(response => {
        const { widget } = response.data
        this.widget = widget
        this.$forceUpdate()
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
