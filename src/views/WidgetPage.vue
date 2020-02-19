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
              <button class="button is-success" disabled>Save</button>
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
