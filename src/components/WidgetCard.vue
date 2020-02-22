<template>
  <div class="card column is-one-quarter">
    <div class="card-image">
      <figure class="image is-4by3">
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

import { Widget } from "@/components/Widget"

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
