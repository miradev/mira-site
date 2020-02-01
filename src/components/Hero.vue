<template>
  <section class="hero is-dark is-shadowless is-small">
    <div class="hero-body is-dark">
      <div class="container has-text-centered">
        <h1 class="title text-white toggleadd is-1 is-cursor-pointer is-size-1-touch">
          Mira
          <span class="highlight">Smart Mirror</span>
        </h1>
        <!-- TODO: Add action -->
        <form class="field has-addons has-addons-centered">
          <p class="control is-expanded is-dark is-large">
            <input
              id="games"
              type="text"
              name="nameid"
              maxlength="20"
              value
              placeholder="search for a widget"
              class="input has-text-right is-large"
              autocomplete="off"
              required="required"
            />
          </p>
          <p class="control">
            <button
              name
              value="go"
              class="button is-primary is-large"
            >
              Go
            </button>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

export default class Hero extends Vue {}
</script>

<style lang="stylus" scoped>
.highlight {
  color: #AFEDFA !important;
}

.text-white {
  color: white;
}

.is-dark {
  background-color: #17171D;
}

.bg-white {
  background-color: white;
}
</style>
