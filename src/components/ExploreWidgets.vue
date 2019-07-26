<template>
  <section class="section">
    <div class="container">
      <div class="columns columnsholder is-block">
        <div class="column columnfull">
          <h2 class="title is-3 has-text-centered">
            Explore
            <router-link to="/marketplace">Featured Widgets</router-link>
          </h2>
          <div class="normalbox browsebox">
            <div class="body">
              <div
                class="tablegrid tablebrowse columns is-multiline is-mobile is-centered is-slick is-slick1 slick-initialized slick-slider"
              >
                <div class="slick-prev slick-arrow" style="display: block;">
                  <button type="button" class="button is-white is-large is-rounded is-hidden-touch">
                    <span class="icon">
                      <svg class="fa icon-light-chevron-left">
                        <use
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xlink:href="#icon-light-chevron-left"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div aria-live="polite" class="slick-list draggable" style="padding: 0px 50px;">
                  <div
                    class="slick-track"
                    style="opacity: 1; width: 55000px; transform: translate3d(-1131px, 0px, 0px);"
                    role="listbox"
                  >
                    <WidgetCard></WidgetCard>
                  </div>
                </div>
                <div class="slick-next slick-arrow" style="display: block;">
                  <button type="button" class="button is-white is-large is-rounded is-hidden-touch">
                    <span class="icon">
                      <svg class="fa icon-light-chevron-right">
                        <use
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xlink:href="#icon-light-chevron-right"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="content nomatches" style="display: none;">
                <p>
                  No games were found matching the criteria specified. We suggest you try the
                  <a href="https://mod.io/games">game list</a> with no filter applied, to browse all available.
                  <a
                    href="https://mod.io/members/register/widget"
                    class="thickbox"
                    rel="iframe=true;innerHeight=640;innerWidth=800"
                    target="_self"
                  >Join now</a> to share your own
                  content, we welcome creators and consumers alike and look forward to your comments.
                </p>
              </div>
              <div class="paginationurls has-text-centered">
                <p>
                  <router-link
                    class="button is-dark is-medium is-rounded is-padded"
                    to="/marketplace"
                  >
                    <span class="icon">
                      <i class='fa fa-cogs'></i>
                    </span>
                    <span>View all widgets</span>
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns columnsholder is-block"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WidgetCard from "@/components/WidgetCard.vue"; // @ is an alias to /src

@Component({
  components: {
    WidgetCard
  }
})
@Component
export default class ExploreWidgets extends Vue {}
</script>

<style>
</style>
