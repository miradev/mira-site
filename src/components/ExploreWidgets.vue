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
              <div class="tablegrid tablebrowse columns is-multiline is-mobile is-centered is-slick">
                <WidgetCard v-for="widget in widgets" :key="widget.id" :widget="widget"></WidgetCard>
              </div>
              <div class="paginationurls has-text-centered">
                <p>
                  <router-link
                    class="button is-dark is-medium is-rounded is-padded"
                    to="/marketplace"
                  >
                    <span class="icon">
                      <i class="fa fa-cogs"></i>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import WidgetCard from "@/components/WidgetCard.vue"; // @ is an alias to /src
import Widget from "@/components/Widget";
import axios from "axios";
import store from '../store';

@Component({
  components: {
    WidgetCard,
  }
})
export default class ExploreWidgets extends Vue {
  private widgets: Widget[] = [];
  mounted() {
    // TODO: Fix SSL
    // axios
    //   .get(
    //     "http://mirabackend-env.zp8gkvhdwt.ca-central-1.elasticbeanstalk.com/getAllWidgets"
    //   )
    //   .then(response => {
    //     this.widgets = response.data;
    //     this.widgets = this.widgets.slice(0,3)
    //   });
    this.widgets = this.shuffle(store.state.widgets).slice(0, 3)
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
section 
    margin 0 !important
    background-color white
</style>
