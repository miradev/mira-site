<template>
  <section class="section is-dev is-fullheight top-paddingless left-paddingless">
    <div class="columns is-fullheight">
      <aside class="menu column is-one-quarter is-left-menu">
        <div class="profile-header">
          <h1 class="title">Developer Dashboard</h1>
          <b-button :type="editMode ? 'is-success' : 'is-warning'" @click="toggleConfig">
            {{
            editText
            }}
          </b-button>
        </div>
        <b-field label="Username">
          <b-input type="text" :value="$store.state.user.username" :disabled="!editMode"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" :value="$store.state.user.email" :disabled="!editMode"></b-input>
        </b-field>
        <br />
        <br />
        <b-button type="is-danger">Log Out</b-button>
      </aside>
      <div class="column has-left-menu">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h1 class="title">My Widgets (0)</h1>
            </div>
          </div>
          <div class="level-left">
            <div class="level-item">
              <b-button tag="router-link" :to="profileURL" type="is-link">Back to Profile View</b-button>
            </div>
          </div>
        </div>
        <p class="subtitle" v-show="widgets">No widgets...</p>
        <UploadBox></UploadBox>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import WidgetCard from "@/components/WidgetCard.vue"
import { UserTags } from "@/components/Types"
import store from "../store"
import router from "../router"
import UploadBox from "@/components/UploadBox.vue"

@Component({
  components: {
    UploadBox,
    WidgetCard,
  },
})
export default class Profile extends Vue {
  public editMode: Boolean = false
  public editText: String = "Edit"

  get profileURL() {
    return "/profile/" + store.state.user.username
  }
  get widgets() {
    return store.state.widgets
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
