<template>
  <div class="column is-9">
    <section class="hero developer is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title white-text">My Widgets</h1>
            </div>
            <button class="button is-warning" @click="refresh()">
              <b-icon icon="sync-alt"></b-icon>
            </button>
          </div>
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
      <div class="tile is-ancestor has-text-centered wrap">
        <WidgetCard v-for="widget in widgets" :key="widget._id" :widget="widget" :canSave="false"></WidgetCard>
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
  private url: string = process.env.VUE_APP_HAR + "widgets?" + store.state.user._id
  private currentUserURL = process.env.VUE_APP_HAR + "currentUser"
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

  refresh() {
    axios
      .get(this.currentUserURL, { withCredentials: true })
      .then(response => {
        let user: IUser = response.data.user
        store.commit("login", user)
        this.$forceUpdate()
      })
      .catch(error => {
        this.$forceUpdate()
      })
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
