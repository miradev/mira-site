import Vue from "vue"
import Buefy from "buefy"
import VueCookies from "vue-cookies"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

Vue.use(VueCookies)
// set default config
Vue.$cookies.config("7d")

library.add(fas)

Vue.component("fa-icon", FontAwesomeIcon)

Vue.use(Buefy, {
  defaultIconComponent: "fa-icon",
  defaultIconPack: "fas",
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
