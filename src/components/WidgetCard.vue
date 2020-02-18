<template>
  <div class="card column is-one-fifth">
    <div class="card-image">
      <figure class="image is-4by3">
        <router-link :to="'/widget/' + widget.id" class>
          <img :src="widget.imgUrl" :alt="widget.title" />
        </router-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <router-link :to="'/widget/' + widget.id" class>
          <p class="title is-4">{{ widget.title }}</p>
        </router-link>
        <router-link :to="'/widget/' + widget.id" class="subtitle is-6">
          <p>By: {{ widget.author }}</p>
        </router-link>
        <b-rate disabled icon-pack="fas" size="is-small"></b-rate>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

import Widget from "@/components/Widget"

@Component
export default class WidgetCard extends Vue {
  @Prop() private widget!: Widget
}
</script>

<style lang="stylus" scoped>
.card {
  margin-right: 1rem;
}
</style>
