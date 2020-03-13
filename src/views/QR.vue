<template>
  <div class>Redirecting...</div>
</template>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Component from "vue-class-component"
import WidgetCard from "@/components/WidgetCard.vue"
import { IWidget, UserTags } from "@/common/Types"
import store from "@/store"
import router from "@/router"

@Component({
  components: {
    WidgetCard,
  },
})
export default class MyWidgets extends Vue {
  mounted() {
    const id = this.$route.params.id
    console.log(id)
    store.commit("setQR", id)
    if (!store.state.authenticated) {
      router.push("/login")
    } else {
      let url = "/profile/" + id + "/2"
      router.push(url)
    }
  }
}
</script>

