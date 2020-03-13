<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-one-quarter">
          <aside class="menu">
            <p class="menu-label">Categories</p>
            <ul class="menu-list">
              <li v-for="tag in tags" :key="tag">
                <a @click="search(tag)">{{tag.charAt(0).toUpperCase() + tag.slice(1)}}</a>
              </li>
            </ul>
          </aside>
        </div>
        <div class="tile is-vertical">
          <div class="flex-space-between">
            <h1 class="title">{{title}}</h1>
            <b-field>
              <b-input placeholder="Search..." type="search" icon="search" v-model="query"></b-input>
              <p class="control">
                <button class="button is-primary" @click="search('')">Search</button>
              </p>
            </b-field>
          </div>

          <div class="tile is-parent">
            <WidgetCard
              v-for="widget in filteredWidgets"
              :key="widget._id"
              :widget="widget"
              :canSave="true"
            ></WidgetCard>
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
import { IWidget, WidgetTags } from "@/common/Types"
import Footer from "@/components/FooterLarge.vue"

@Component({
  components: {
    WidgetCard,
    Navbar,
    Footer,
  },
})
export default class Marketplace extends Vue {
  private featured: IWidget[] = []
  private widgets: IWidget[] = []
  private filteredWidgets: IWidget[] = []
  private isActive: boolean = true
  private url: string = process.env.VUE_APP_HAR + "widgets"
  private query: string = ""
  private title: string = "All Widgets"
  private tags: string[] = [
    WidgetTags.ACCESSORY,
    WidgetTags.GAME,
    WidgetTags.NEWS,
    WidgetTags.SOCIAL,
    WidgetTags.UTILITY,
  ]

  mounted() {
    axios.get(this.url).then(response => {
      const { widgets } = response.data
      this.widgets = widgets
      this.filteredWidgets = widgets
      //this.widgets = Marketplace.shuffle(widgets)
    })
  }

  search(query: string) {
    if (query) {
      this.query = query
    }
    if (!this.query) {
      this.title = "All Widgets"
      this.filteredWidgets = this.widgets
      return
    }
    this.query = this.query.toLowerCase()
    this.title = `Seaching for ${this.query}`
    this.filteredWidgets = this.widgets.filter(e => {
      return (
        e.filename.includes(this.query) ||
        JSON.stringify(e.tags).includes(this.query) ||
        JSON.stringify(e.manifest)
          .toLowerCase()
          .includes(this.query) ||
        e.description.toLowerCase().includes(this.query)
      )
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

<style lang="stylus" ></style>
