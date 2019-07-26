<template>
  <footer class="footer">
    <div class="footer-head background is-primary is-primary-gradient is-clipped">
      <span class="cogspin icon is-filled"><svg class="fa icon-custom-modio-cog">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-custom-modio-cog"></use>
        </svg></span>
      <div class="container has-text-centered">
        <h4 class="title is-3 is-uppercase">Come &amp; join the community!</h4>
        <p class="subtitle is-6">Sign up to receive the latest news and updates about Mira.</p>
        <router-link to="/register" class="button is-dark is-medium is-rounded is-padded"
          rel="iframe=true;innerHeight=640;innerWidth=800">Sign Up</router-link>
      </div>
    </div>
    <div class="footer-foot background is-dark">
      <div class="container">
        <div class="columns is-mobile">
          <ul class="column has-text-centered">
            <li class="footer-title">
              <router-link to="/" class="footer-logo">
                <span class="icon is-huge"><svg class="fa icon-custom-modio" aria-label="mod.io">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-custom-modio"></use>
                  </svg></span>
              </router-link>
            </li>
            <li>&nbsp;</li>
          </ul>
          <ul class="column">
            <li class="footer-title is-uppercase has-text-weight-bold">Explore</li>
            <li><router-link to="/marketplace">Marketplace</router-link></li>
          </ul>
          <ul class="column is-hidden-tiny">
            <li class="footer-title is-uppercase has-text-weight-bold">Develop</li>
            <li><router-link to="/docs">Documentation</router-link></li>
            <li><router-link to="/sdk">SDK &amp; Tools</router-link></li>
          </ul>
          <ul class="column is-hidden-mobile">
            <li class="footer-title is-uppercase has-text-weight-bold">Community</li>
            <li><router-link to="/forum">Forum</router-link></li>
            <li><router-link to="/discord">Discord</router-link></li>
          </ul>
          <ul class="column">
            <li class="footer-title is-uppercase has-text-weight-bold">About</li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
          </ul>
        </div>
      </div>
      <div class="container has-text-centered">
        Mira © 2019
        - <router-link to="/contact">Contact</router-link>
        - <a href="https://github.com/modio/WebDesign">Template from Mod.io</a>
     </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>

