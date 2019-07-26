<template>
<body id="home">
  <section class="hero is-shadowless is-small">
    <div class="hero-body is-dark">
      <div class="container has-text-centered">
        <h1
          class="title text-white toggleadd is-1 is-cursor-pointer is-size-1-touch"
        >Widget Marketplace</h1>
        <!-- TODO: Add action -->
        <form class="field has-addons has-addons-centered">
          <p class="control is-expanded is-dark is-large">
            <input
              type="text"
              name="nameid"
              maxlength="20"
              id="games"
              value
              placeholder="search for a widget"
              class="input has-text-right is-large"
              autocomplete="off"
              required="required"
            />
          </p>
          <p class="control">
            <button type="submit" name value=".mod.io" class="button is-primary is-large">Go</button>
          </p>
        </form>
      </div>
    </div>
    <br />
    <div class="container bg-white">
      <div class="columns columnsholder is-block">
        <div class="column columnfull">
          <h2 class="title is-3 has-text-centered">Featured Widgets</h2>
          <div class="normalbox browsebox">
            <div class="body">
              <div
                class="tablegrid tablebrowse columns is-multiline is-mobile is-centered is-slick"
              >
                <WidgetCard v-for="widget in featured" :key="widget.id" :widget="widget"></WidgetCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns columnsholder is-block"></div>
    </div>
    <br />
    <div class="container bg-white">
      <div class="columns columnsholder is-block">
        <div class="column columnfull">
          <h2 class="title is-3 has-text-centered">All Widgets</h2>
          <div class="normalbox browsebox">
            <div class="body">
              <div
                class="tablegrid tablebrowse columns is-multiline is-mobile is-centered is-slick"
              >
                <WidgetCard v-for="widget in widgets" :key="widget.id" :widget="widget"></WidgetCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns columnsholder is-block"></div>
    </div>
    <Footer></Footer>
  </section>
</body>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WidgetCard from "@/components/WidgetCard.vue";
import Navbar from "@/components/Navbar.vue";
import Widget from "@/components/Widget";
import Footer from "@/components/FooterSmall.vue"
import axios from "axios";
import store from '../store';

@Component({
  components: {
    WidgetCard,
    Navbar,
    Footer
  }
})
export default class Marketplace extends Vue {
  private featured: Widget[] = [];
  private widgets: Widget[] = [];
  mounted() {
    // TODO: Fix SSL
    // axios
    //   .get(
    //     "http://mirabackend-env.zp8gkvhdwt.ca-central-1.elasticbeanstalk.com/getAllWidgets"
    //   )
    //   .then(response => {
    //     this.widgets = this.shuffle(response.data);
    //     this.featured = response.data.slice(0, 3);
    //     console.log(JSON.stringify(this.widgets))
    //   });
    this.widgets = this.shuffle(store.state.widgets)
    this.featured = this.widgets.slice(0, 3);
  }
  shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
</script>

<style lang="stylus" scoped>
section {
  background-color: white !important;
}

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