<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-one-quarter">
          <aside class="menu">
            <p class="menu-label">Discover</p>
            <ul class="menu-list">
              <li>
                <a>Top Rated</a>
              </li>
              <li>
                <a>Newest</a>
              </li>
              <li>
                <a>Most Popular</a>
              </li>
            </ul>
            <p class="menu-label">Categories</p>
            <ul class="menu-list">
              <li>
                <a>Accessories</a>
              </li>
              <li>
                <a>Games</a>
              </li>
              <li>
                <a>News</a>
              </li>
              <li>
                <a>Social Media</a>
              </li>
              <li>
                <a>Utilities</a>
              </li>
            </ul>
          </aside>
        </div>
        <div class="tile is-ancestor is-vertical">
          <h1 class="title">Featured Widgets</h1>
          <div class="tile is-parent">
            <WidgetCard v-for="widget in widgets" :key="widget._id" :widget="widget"></WidgetCard>
          </div>
          <h1 class="title">Top Rated</h1>
          <div class="tile is-parent">
            <WidgetCard v-for="widget in widgets" :key="widget._id" :widget="widget"></WidgetCard>
          </div>
          <h1 class="title">Newest</h1>
          <div class="tile is-parent">
            <WidgetCard v-for="widget in widgets" :key="widget._id" :widget="widget"></WidgetCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import axios from "axios"
import WidgetCard from "@/components/WidgetCard.vue"
import Navbar from "@/components/Navbar.vue"
import { Widget } from "@/common/Types"
import Footer from "@/components/FooterLarge.vue"

@Component({
  components: {
    WidgetCard,
    Navbar,
    Footer,
  },
})
export default class Marketplace extends Vue {
  private featured: Widget[] = []
  private widgets: Widget[] = []
  private isActive: boolean = true
  private url: string = process.env.VUE_APP_HAR + "widgets"

  mounted() {
    axios.get(this.url).then(response => {
      const { widgets } = response.data
      this.widgets = Marketplace.shuffle(widgets)
      this.featured = widgets.slice(0, 3)
    })
    //let widget = {
    //_id: "0",
    //name: "Title",
    //author: "Jim",
    //images: ["https://buefy.org/static/img/placeholder-1280x960.png"],
    //description: "This is a sample",
    //filename: ["Title"],
    //active: true,
    //}
    //let widget2 = {
    //_id: "1",
    //name: "Widget 2",
    //author: "Jim",
    //images: ["https://buefy.org/static/img/placeholder-1280x960.png"],
    //description: " is a sample",
    //filename: ["WIdget 2"],
    //active: true,
    //}
    //this.widgets = [widget, widget2]
  }

  static shuffle(a: any) {
    const b = a
    for (let i = b.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[b[i], b[j]] = [b[j], b[i]]
    }
    return b
  }
}
</script>

<style lang="stylus" ></style>
