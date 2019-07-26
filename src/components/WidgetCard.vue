<template>
  <div
    class="column row rowcontent is-dynamic slick-slide"
    data-slick-index="2"
    aria-hidden="true"
    tabindex="-1"
    role="option"
    aria-describedby="slick-slide02"
  >
    <div class="card is-fullwidth">
      <div class="card-image">
        <div class="card-actions field inverttooltips has-addons">
          <p class="control">
            <a
              href="https://mod.io/messages/ajax/action/?action=subscribe&amp;sitearea=games&amp;siteareaid=5"
              rel="nofollow"
              class="button subscribebutton csstooltip is-small is-danger"
              title="Subscribe"
              data-id="5"
              data-name="0 A.D."
              data-icon="https://thumb.mod.io/games/e4da/5/crop_64x64/logo.png"
              data-url="https://0ad.mod.io"
              tabindex="-1"
            >
            </a>
          </p>
        </div>
        <a href="https://0ad.mod.io" class="image is-16by9" tabindex="-1">
          <img src="https://thumb.mod.io/games/e4da/5/crop_320x180/imageproxy.php.jpg" alt="0 A.D." />
        </a>
      </div>
      <header class="card-header">
        <a href="https://0ad.mod.io" class="card-header-title" tabindex="-1">
          <span class="truncate">0 A.D.</span>
        </a>
      </header>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class WidgetCard extends Vue {
  @Prop() private title!: string;
  @Prop() private imgLink!: string;
  @Prop() private author!: string;
  @Prop() private description!: string;
}
</script>

<style>
</style>

