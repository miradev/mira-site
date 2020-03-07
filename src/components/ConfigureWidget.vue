<template>
  <div class="column is-6">
    <div class="media">
      <figure class="media-left">
        <p class="image">
          <img :src="widget.images[0]" :alt="widget.title" class="widget-image" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p class="title is-4">{{widget.name}}</p>
          <p class="subtitle is-6">{{widget.description}}</p>
        </div>
      </div>
      <div class="media-right">
        <div class="right-justify">
          <div class="buttons">
            <router-link :to="'/widget/' + widget._id" class="button is-info">View</router-link>
            <button
              class="button"
              :class="added ? 'is-danger' : 'is-success' "
              @click="addWidget()"
            >{{addedText}}</button>
          </div>
        </div>
        <!--<strong class="subtitle">Position</strong>-->
        <!--<ConfigInput-->
        <!--:disabled="!added"-->
        <!--placeholder="0 to 255"-->
        <!--label="x:"-->
        <!--type="num"-->
        <!--style="width:150px"-->
        <!--</ConfigInput>-->
        <!--<ConfigInput-->
        <!--:disabled="!added"-->
        <!--placeholder="0 to 255"-->
        <!--label="y:"-->
        <!--type="num"-->
        <!--style="width:150px"-->
        <!--</ConfigInput>-->
      </div>
    </div>
    <br />
    <b-collapse aria-id="contentIdForA11y2" class="panel" :open.sync="isOpen">
      <div slot="trigger" class="panel-heading" role="button" aria-controls="contentIdForA11y2">
        <strong>Additional Configs</strong>
      </div>
      <div class="box">
        <b-field label="Manifest.json">
          <pre><code class="language-javascript">{{widget.manifest}}</code></pre>
        </b-field>
        <b-field label="Configs">
          <b-input maxlength="999" type="textarea" autofocus v-model="configs" />
        </b-field>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import ConfigInput from "@/components/ConfigInput.vue"
import { Prop } from "vue-property-decorator"
import { IWidget } from "@/common/Types"

@Component({
  components: {
    ConfigInput,
  },
})
export default class ConfigureWidget extends Vue {
  @Prop() private widget!: IWidget
  public isOpen: boolean = false
  public added: boolean = false
  public addedText: string = "Add"
  public configs: string = "{\n  key:value,\n}"
  public addWidget() {
    this.added = !this.added
    this.addedText = this.added ? "Remove" : "Add"
    if (this.added) {
      this.$emit("added", { widgetId: this.widget._id, config: this.configs })
    } else {
      this.$emit("removed", { widgetId: this.widget._id, config: this.configs })
    }
  }
}
</script>

<style lang="stylus" scoped>
.card {
  margin-right: 1rem;
}

.widget-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
}

.right-justify {
  display: flex;
  justify-content: space-between;
}
</style>
