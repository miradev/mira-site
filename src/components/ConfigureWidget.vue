<template>
  <div class="column is-one-half">
    <div class="media">
      <figure class="media-left">
        <p class="image">
          <img :src="widget.images[0]" :alt="widget.title" class="widget-image" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p class="title is-4">{{widget.name}}</p>
          <p class="subtitle is-6">{{widget.description}}</p>
        </div>
      </div>
      <div class="media-right">
        <div class="right-justify">
          <router-link :to="'/widget/' + widget._id" class="button is-info">View</router-link>
          <button
            class="button"
            :class="added ? 'is-danger' : 'is-success' "
            @click="addWidget()"
          >{{addedText}}</button>
        </div>
        <strong class="subtitle">Position</strong>
        <ConfigInput
          :disabled="!added"
          placeholder="0 to 255"
          label="x:"
          type="num"
          style="width:150px"
        ></ConfigInput>
        <ConfigInput
          :disabled="!added"
          placeholder="0 to 255"
          label="y:"
          type="num"
          style="width:150px"
        ></ConfigInput>
      </div>
    </div>
    <br />
    <b-collapse aria-id="contentIdForA11y2" class="panel" :open.sync="isOpen">
      <div slot="trigger" class="panel-heading" role="button" aria-controls="contentIdForA11y2">
        <strong>Additional Configs</strong>
      </div>
      <strong class="subtitle">Position</strong>
      <ConfigInput :disabled="!added" placeholder="123" help="help" label="longitude" type="num"></ConfigInput>
      <ConfigInput :disabled="!added" placeholder="123" help="help" label="latitude" type="num"></ConfigInput>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import ConfigInput from "@/components/ConfigInput.vue"
import { Prop } from "vue-property-decorator"

import { Widget } from "@/components/Widget"

@Component({
  components: {
    ConfigInput,
  },
})
export default class ConfigureWidget extends Vue {
  @Prop() private widget!: Widget
  public isOpen: boolean = false
  public added: boolean = false
  public addedText: string = "Add"
  public addWidget() {
    this.added = !this.added
    this.addedText = this.added ? "Remove" : "Add"
  }
}
</script>

<style lang="stylus" scoped>
.card {
  margin-right: 1rem;
}

.widget-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
}

.right-justify {
  display: flex;
  justify-content: space-between;
}
</style>
