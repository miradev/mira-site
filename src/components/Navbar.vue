<template>
  <nav class="navbar inverttooltips navbartooltips is-dark">
    <div class="navbar-brand">
      <a href="https://mod.io" class="navbar-item navbar-logo" style="margin-right: auto;">
        <img src="../assets/logo.png" alt="mod.io" />
      </a>
      <a
        href="https://mod.io/members/login/widget"
        class="navbar-item thickbox is-hidden-tablet is-paddingless"
        rel="iframe=true;innerHeight=640;innerWidth=800"
        target="_self"
      >Login</a>
      <div class="navbar-burger burger" style="margin-left: 0;">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a href="#" class="navbar-item">Marketplace</a>
        <a href="#" class="navbar-item">Documentation</a>
        <a href="#" class="navbar-item is-hidden-tablet-only">About</a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item navbar-search">
          <div class="field fieldsearch">
            <form action="https://mod.io/search" id="search-form" method="get">
              <div class="field">
                <p class="control has-icons-right is-dark">
                  <input
                    type="search"
                    name="q"
                    maxlength="500"
                    value
                    id="search"
                    class="input"
                    placeholder="Search"
                    required="required"
                    autocomplete="off"
                  />
                  <span class="icon is-small is-right">
                    <svg class="fa icon-light-search" aria-label="Search">
                      <use
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xlink:href="#icon-light-search"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </form>
            <div class="search-suggest" style="position:relative">
              <div class="dropdown-menu"></div>
            </div>
          </div>
        </div>
        <a
          href="https://mod.io/members/login/widget"
          class="navbar-item thickbox is-guest is-hidden-tablet"
          rel="iframe=true;innerHeight=640;innerWidth=800"
          target="_self"
        >Login</a>
        <a
          href="https://mod.io/members/register/widget"
          class="navbar-item thickbox is-guest is-hidden-tablet"
          rel="iframe=true;innerHeight=640;innerWidth=800"
          target="_self"
        >Sign Up</a>
        <div class="navbar-item is-hidden-mobile is-paddingless is-guest">
          <a
            href="https://mod.io/members/login/widget"
            class="button thickbox is-text is-nolink is-uppercase"
            rel="iframe=true;innerHeight=640;innerWidth=800"
            target="_self"
          >
            <span class="icon is-small">
              <svg class="fa icon-light-sign-in">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-light-sign-in" />
              </svg>
            </span>
            <span>Login</span>
          </a>
        </div>
        <span class="navbar-item is-hidden-mobile is-paddingless is-guest">or</span>
        <div class="navbar-item is-hidden-mobile is-guest">
          <a
            href="https://mod.io/members/register/widget"
            class="button thickbox is-primary is-uppercase"
            rel="iframe=true;innerHeight=640;innerWidth=800"
            target="_self"
          >Sign Up</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
</script>
