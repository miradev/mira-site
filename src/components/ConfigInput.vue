<template>
  <div class="field is-expanded">
    <div class="field has-addons">
      <p class="control">
        <a class="button is-static">{{label}}</a>
      </p>
      <p class="control is-expanded">
        <input class="input short" :style="style" :type="type" :placeholder="placeholder" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

import { Widget } from "@/components/Widget"

@Component
export default class ConfigInput extends Vue {
  @Prop() private placeholder!: string
  @Prop() private label!: string
  @Prop() private type!: string
  @Prop() private style!: string
}
</script>

<style lang="stylus" scoped></style>

