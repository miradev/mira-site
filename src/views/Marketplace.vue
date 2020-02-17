<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-one-quarter">
          <aside class="menu">
            <p class="menu-label">
              Discover
            </p>
            <ul class="menu-list">
              <li><a>Top Rated</a></li>
              <li><a>Newest</a></li>
              <li><a>Most Popular</a></li>
            </ul>
            <p class="menu-label">
              Categories
            </p>
            <ul class="menu-list">
              <li><a>Accessories</a></li>
              <li><a>Games</a></li>
              <li><a>News</a></li>
              <li><a>Social Media</a></li>
              <li><a>Utilities</a></li>
            </ul>
          </aside>
        </div>
        <div class="column is-three-quarters">
          <p>Some Body Stuff</p>
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
import Widget from "@/components/Widget"
import Footer from "@/components/FooterLarge.vue"
import store from "../store"

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

  mounted() {
    axios
      .get("http://mirabackend-env.zp8gkvhdwt.ca-central-1.elasticbeanstalk.com/getAllWidgets")
      .then(response => {
        this.widgets = Marketplace.shuffle(response.data)
        this.featured = response.data.slice(0, 3)
      })
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

<style lang="stylus" scoped>
section {
  background-color: white !important;
}

.highlight {
  color: #AFEDFA !important;
}

.text-white {
  color: white;
}

.is-dark {
  background-color: #17171D;
}

.bg-white {
  background-color: white;
}
</style>
