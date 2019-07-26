<template>
  <section class="hero is-dark is-shadowless is-medium">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title toggleadd is-1 is-cursor-pointer is-size-1-touch">
          Mira
          <span class="highlight">Smart Mirror</span>
        </h1>
        <!-- TODO: Add action -->
        <form class="field has-addons has-addons-centered">
          <p class="control is-expanded is-dark is-large">
            <input
              type="text"
              name="name"
              maxlength="20"
              placeholder="search for a widget"
              class="input has-text-right is-large"
              required="required"
            />
          </p>
          <p class="control">
            <button name value="go" class="button is-primary is-large">Go</button>
          </p>
        </form>
      </div>
    </div>
    <!-- HERO FOOTER -->
    <div class="hero-foot background is-primary is-primary-gradient">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-3">
            <span class="button is-huge is-text">
              <span class="icon iconbg is-huge is-marginless">
                <svg class="fa icon-custom-modio-cog">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#icon-custom-modio-cog"
                  />
                </svg>
              </span>
              <span class="icon is-centered-text is-huge is-marginless">
                <i class="fas fa-sliders-h"></i>
              </span>
            </span>
            <h3 class="title">Easy to Setup</h3>
            <h4 class="subtitle is-6">
              Access your mirror from your pc or mobile device. Connect to your mirror and start adding widgets!
              <!-- <a href="https://mod.io/games/add">control panel</a> that puts you in charge. -->
            </h4>
          </div>
          <div class="column is-3">
            <span class="button is-huge is-text">
              <span class="icon iconbg is-huge is-marginless">
                <svg class="fa icon-custom-modio-cog">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#icon-custom-modio-cog"
                  />
                </svg>
              </span>
              <span class="icon is-centered-text is-huge is-marginless">
                <i class="fas fa-store-alt"></i>
              </span>
            </span>
            <h3 class="title">Widget Marketplace</h3>
            <h4
              class="subtitle is-6"
            >From clocks and weather to news and calanders, search for anything in our widget repo</h4>
          </div>
          <div class="column is-3">
            <span class="button is-huge is-text">
              <span class="icon iconbg is-huge is-marginless">
                <svg class="fa icon-custom-modio-cog">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#icon-custom-modio-cog"
                  />
                </svg>
              </span>
              <span class="icon is-centered-text is-huge is-marginless">
                <i class="fas fa-code"></i>
              </span>
            </span>
            <h3 class="title">Development tools</h3>
            <h4 class="subtitle is-6">
              <a>Download</a> our SDK.
              <a>Upload</a> your widget to Mira in seconds
            </h4>
          </div>
        </div>
      </div>
      <!-- TODO: This is cool, maybe add later -->
      <!-- <div class="buttonpulse">
        <a
          href="#"
          id="howdoesitwork"
          class="button is-dark is-medium is-rounded is-padded is-ignored"
        >
          How to get
          started?
        </a>
        <span class="button pulse is-dark is-medium is-rounded is-padded is-overlay is-ignored"></span>
      </div> -->
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
export default class Hero extends Vue {}
</script>

<style lang="stylus" scoped>
.highlight
  color #AFEDFA !important

.is-dark
  background-color #17171D

</style>


