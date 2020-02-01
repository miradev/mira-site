<template>
  <body id="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-2">
              <figure class="image">
                <img
                  class="widget-image"
                  :src="getWidget($route.params.id).img_url"
                  alt
                />
              </figure>
            </div>
            <div class="column">
              <h1 class="title">
                {{ getWidget($route.params.id).title }}
              </h1>
              <h4 class="subtitle is-5">
                <i class="fa fa-user"></i>
                &nbsp;&nbsp;{{ getWidget($route.params.id).author }}
              </h4>
              <h3 class="subtitle">
                {{ getWidget($route.params.id).description }}
              </h3>
              <div class="columns">
                <div class="column">
                  <button
                    class="button is-success"
                    disabled
                  >
                    Add to Mirror
                  </button>
                  <button
                    class="button is-warning"
                    disabled
                  >
                    Add to favourites
                  </button>
                  <button
                    class="button is-primary"
                    disabled
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </body>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Component from 'vue-class-component';
import Footer from '@/components/FooterSmall.vue';
import Navbar from '@/components/Navbar.vue';
import store from '../store';
import Widget from '@/components/Widget';
import WidgetCard from '@/components/WidgetCard.vue'; // @ is an alias to /src

@Component({
  components: {
    Footer,
    Navbar,
    WidgetCard,
  },
})
export default class WidgetPage extends Vue {
  private widgets: Widget[] = [];

  private mounted() {
    axios
      .get(
        'http://mirabackend-env.zp8gkvhdwt.ca-central-1.elasticbeanstalk.com/getAllWidgets',
      )
      .then((response) => {
        this.widgets = response.data;
        this.$forceUpdate();
      });
  }

  private getWidget(id: string) {
    return this.widgets.find(widget => widget.id === id);
  }
}
</script>

<style lang="stylus" scoped>
.is-dark {
  color: whitesmoke !important;
}

.widget-image {
  object-fit: cover;
}

button.button {
  margin-right: 1rem;
}
</style>
