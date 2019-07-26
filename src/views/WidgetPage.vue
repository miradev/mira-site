<template>
<body id="home">
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <figure class="image">
              <img class="widget-image" :src="getWidget($route.params.id).img_url" alt />
            </figure>
          </div>
          <div class="column">
            <h1 class="title">{{getWidget($route.params.id).title}}</h1>
            <h4 class="subtitle is-5">
              <i class="fa fa-user"></i>
              &nbsp;&nbsp;{{getWidget($route.params.id).author}}
            </h4>
            <h3 class="subtitle">{{getWidget($route.params.id).description}}</h3>
            <div class="columns">
              <div class="column">
                <button class="button is-success" disabled>Add to Mirror</button>
                <button class="button is-warning" disabled>Add to favourites</button>
                <button class="button is-primary" disabled>Review</button>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import WidgetCard from "@/components/WidgetCard.vue"; // @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Widget from "@/components/Widget";
import Footer from "@/components/FooterSmall.vue";
import axios from "axios";
import store from "../store";

@Component({
  components: {
    WidgetCard,
    Navbar,
    Footer
  }
})
export default class WidgetPage extends Vue {
  private widgets: Widget[] = [];
  mounted() {
    // TODO: Fix SSL
    // axios
    //   .get(
    //     "http://mirabackend-env.zp8gkvhdwt.ca-central-1.elasticbeanstalk.com/getAllWidgets"
    //   )
    //   .then(response => {
    //     this.widgets = response.data;
    //     this.$forceUpdate();
    //   });
    this.widgets = store.state.widgets;
  }

  private getWidget(id: number) {
    return this.widgets.find(widget => {
      return widget.id == id;
    });
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
