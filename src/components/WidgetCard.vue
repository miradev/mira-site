<template>
  <div class="card column hover" :class="width == 4 ? 'is-one-quarter' : 'is-one-fifth'">
    <button
      class="corner button outlined is-small"
      :class="saved ? 'is-light' : 'is-success'"
      @click="saveWidget()"
      v-show="canSave && $store.state.authenticated"
    >{{ text }}</button>
    <button
      class="corner button is-success"
      v-show="canSave && !$store.state.authenticated"
      disabled
    >Login to Save</button>
    <div class="card-image flex-center">
      <figure class="image">
        <router-link :to="'/widget/' + widget._id" class>
          <img :src="widget.images[0]" :alt="widget.title" />
        </router-link>
      </figure>
    </div>
    <div class="card-content widget-content">
      <router-link :to="'/widget/' + widget._id" class>
        <p class="title is-6">{{ widget.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"
import { IWidget } from "@/common/Types"
import store from "@/store"
import axios from "axios"

@Component
export default class WidgetCard extends Vue {
  @Prop() private widget!: IWidget
  @Prop() private canSave!: boolean
  @Prop() private width!: number

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
  public saveWidget() {
    if (this.saved) {
      store.commit("removeWidget", this.widget)
    } else {
      if (this.widget) {
        store.commit("saveWidget", this.widget)
      }
    }
    let currentUserURL = process.env.VUE_APP_HAR + "currentUser"
    let body: IUser = store.state.user
    body.favorites = store.state.widgets.map(e => e._id)
    axios
      .put(currentUserURL, body, { withCredentials: true })
      .then(response => {
        this.$forceUpdate()
      })
      .catch(error => {
        this.$forceUpdate()
      })
  }
}
</script>

<style lang="stylus" scoped>
.card {
  margin-right: 1rem;
  border-radius: 6px;
}

.card >>> .widget-content {
  padding: 18px;
}

.image >>> img {
  object-fit: cover;
  width: 128px;
  height: 128px;
}

.corner {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
  border-radius: 0;
  border-top-left-radius: 15px !important;
}

.hover {
  &::before, &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale3d(0, 0, 1);
    transition: transform 0.3s ease-out 0s;
    background: rgba(255, 255, 255, 0.1);
    content: '';
    pointer-events: none;
  }

  &::before {
    transform-origin: left top;
  }

  &::after {
    transform-origin: right bottom;
  }

  &:hover, &:focus {
    &::before, &::after {
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
