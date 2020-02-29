<template>
  <div class="container">
    <br />
    <br />
    <div class="flex-center">
      <div class="box is-mid-dark">
        <div class="field has-text-centered">
          <h2 class="subtitle is-3">Register Device</h2>
          <h3 class="subtitle is-6 red-text is-mid-dark" v-show="this.msg">{{this.msg}}</h3>
        </div>
        <div class="field">
          <label class="label" for="username">Device Identifier</label>
          <div class="control has-icons-right">
            <input id="name" v-model="username" class="input" type="text" name="username" />
            <span class="icon is-right">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div class="level is-mobile">
          <div class="level-left"></div>
          <div class="level-right">
            <div class="level-item">
              <button class="button is-primary" @click="login()">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import axios from "axios"
import router from "../router"
import store from "../store"
import { IUser } from "@/components/Types"

@Component
export default class CreateDevice extends Vue {
  private url = process.env.VUE_APP_HAR + "login"

  private username: string = ""

  private password: string = ""

  private msg: string = ""
}
</script>

<style lang="stylus" scoped>
.box {
  width: 450px;
}
</style>
