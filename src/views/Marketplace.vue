<template>
  <div>
    <div class="container">
      <div id="flow">
        <span class="flow-1"></span>
        <span class="flow-2"></span>
        <span class="flow-3"></span>
      </div>
      <div class="section">
        <h1 class="title">Install widgets for your Mira smart mirror</h1>
        <div class="columns">
          <div class="column is-offset-one-quarter is-two-quarters">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  class="input has-text-centered is-large"
                  type="search"
                  placeholder="Search for widgets"
                />
              </div>
              <div class="control">
                <a class="button is-info is-large">Search</a>
              </div>
            </div>
          </div>
          <div class="column is-one-quarter"></div>
        </div>
      </div>
      <div class="section">
        <!-- Featured Widgets -->
        <h1 class="title">Featured Widgets</h1>
        <div class="row columns is-multiline">
          <div class="column is-one-sixth">
            <WidgetCard
              title="Weather App"
              author="Miradev"
              imgLink="https://images.unsplash.com/photo-1508697014387-db70aad34f4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              description="This is a basic weather app"
            ></WidgetCard>
          </div>
          <div class="column is-one-sixth">
            <WidgetCard
              title="Clock App"
              author="Miradev"
              imgLink="https://images.unsplash.com/photo-1547908068-b3c55fdda5be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
              description="This is a basic clock app"
            ></WidgetCard>
          </div>
          <div class="column is-one-sixth">
            <WidgetCard
              title="Lyft App"
              author="Miradev"
              imgLink="https://images.unsplash.com/photo-1531756346973-7b893b8dbbdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
              description="This is a lyft app"
            ></WidgetCard>
          </div>
          <div class="column is-one-sixth">
            <WidgetCard
              title="Calendar App"
              author="Miradev"
              imgLink="https://images.unsplash.com/photo-1543168256-4ae2229821f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
              description="This is a basic calendar app"
            ></WidgetCard>
          </div>
          <div class="column is-one-sixth">
            <WidgetCard
              title="Notes App"
              author="Miradev"
              imgLink="https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
              description="This is a basic notes app"
            ></WidgetCard>
          </div>
        </div>
        <!-- End Featured -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WidgetCard from "@/components/WidgetCard.vue"; // @ is an alias to /src

@Component({
  components: {
    WidgetCard
  }
})
export default class Marketplace extends Vue {}
</script>

<style>
</style>
