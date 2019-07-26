<template>
  <div class="column row rowcontent is-dynamic">
    <div class="card is-fullwidth">
      <div class="card-image">
        <router-link :to="'/widget/' + widget.id" class="image is-16by9">
          <img :src="widget.img_url" alt="Foundation" />
          <span class="card-overlay is-overlay is-scrollable is-hidden-touch">
            <span style="display: block; float: right; height: 27px; width: 49px;"></span>
            {{widget.description}}
          </span>
        </router-link>
      </div>
      <header class="card-header">
        <router-link :to="'/widget/' + widget.id" class="card-header-title">
          <span class="truncate">{{widget.title}}</span>
        </router-link>
        <router-link :to="'/widget/' + widget.id" class="card-header-icon">
          <!-- For download count, we don't need this yet -->
          <!-- <span
            class="togglehover button csstooltip is-text is-nolink is-paddingless is-small is-opaque75"
            original-title="Downloads"
          >
            <span class="icon is-small">
              <svg class="fa icon-light-caret-down">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#icon-light-caret-down"
                />
              </svg>
            </span>
            <span>93</span>
          </span>-->
          <span
            title="Author"
            class="button csstooltip is-text is-nolink is-paddingless is-small is-opaque75"
          >
            <span class="icon is-small">
              <i class="fa fa-user-circle"></i>
            </span>
            <span>{{widget.author}}</span>
          </span>
        </router-link>
      </header>
      <div class="filtersearch" style="display: none;">{{widget.title}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Widget from "@/components/Widget";

@Component
export default class WidgetCard extends Vue {
  @Prop() private widget!: Widget;
}
</script>

<style lang="stylus" scoped>
img {
  object-fit: cover;
}
</style>

