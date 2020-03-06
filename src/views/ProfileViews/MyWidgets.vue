<template>
  <div class="column is-9">
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">My Widgets</h1>
        </div>
      </div>
    </section>
    <br />
    <h2 v-show="widgets.length == 0">
      Oops. It looks like you haven't uploaded any widgets. Get started
      <a
        @click="$parent.currentPage = 7"
      >here</a>.
    </h2>
    <section class="info-tiles">
      <div class="tile is-ancestor has-text-centered">
        <router-link
          :to="'/widget/' + widget._id"
          class="tile is-parent"
          v-for="widget in widgets"
          :key="widget._id"
        >
          <article class="tile is-child box">
            <p class="title">{{widget.name}}</p>
            <p class="subtitle">Online</p>
          </article>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import WidgetCard from "@/components/WidgetCard.vue"
import { IWidget, UserTags } from "@/common/Types"
import store from "@/store"
import router from "@/router"

@Component({
  components: {
    WidgetCard,
  },
})
export default class MyWidgets extends Vue {
  public editMode: Boolean = false
  public editText: String = "Edit"
  private url: string = process.env.VUE_APP_HAR + "widgets?" + store.state.user._id
  private widgets: IWidget = []

  get profileURL() {
    return "/profile/" + store.state.user.username
  }
  mounted() {
    axios.get(this.url).then(response => {
      const { widgets } = response.data
      this.widgets = widgets
    })
  }
  get isDeveloper() {
    return store.state.user.tags.includes(UserTags.DEVELOPER)
  }
  toggleConfig() {
    this.editMode = !this.editMode
    this.editText = this.editMode ? "Save" : "Edit"
  }

  logout() {
    store.commit("logout")
  }
}
</script>

<style lang="stylus" scoped>
.column >>> .profile-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.field >>> input {
  background-color: $mid-gray;
  color: white;
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

.is-dev {
  background-color: #132D45;
}
</style>
