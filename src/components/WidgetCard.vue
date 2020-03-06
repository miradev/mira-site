<template>
  <div class="card column is-one-quarter hover">
    <button
      class="corner button"
      :class="saved ? 'is-danger' : 'is-success'"
      @click="saveWidget()"
      v-show="$store.state.authenticated"
    >{{ text }}</button>
    <button
      class="corner button is-success"
      v-show="!$store.state.authenticated"
      disabled
    >Login to Save</button>
    <div class="card-image">
      <figure class="image is-square">
        <router-link :to="'/widget/' + widget._id" class>
          <img :src="widget.images[0]" :alt="widget.title" />
        </router-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <router-link :to="'/widget/' + widget._id" class>
          <p class="title is-6">{{ widget.name }}</p>
        </router-link>
        <router-link :to="'/widget/' + widget._id" class="subtitle is-7">
          <p>By: {{ widget.author }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"
import { IWidget } from "@/common/Types"
import store from "@/store"

@Component
export default class WidgetCard extends Vue {
  @Prop() private widget!: IWidget
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
.card {
  margin-right: 1rem;
  border-radius: 6px;
}

.is-square >>> img {
  object-fit: cover;
}

.corner {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
  border-radius: 0;
  border-top-left-radius: 15px;
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
