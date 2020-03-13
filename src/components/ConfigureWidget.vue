<template>
  <div class="column">
    <div class="media is-hidden-mobile">
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
          </div>
        </div>
      </div>
    </div>
    <div class="content is-hidden-tablet box">
      <p class="image flex-center">
        <img :src="widget.images[0]" :alt="widget.title" class="widget-image" />
      </p>
      <div class="flex-center">
        <p class="title is-4">{{widget.name}}</p>
        <p class="subtitle is-6">{{widget.description}}</p>
      </div>
      <div class="buttons flex-center">
        <router-link :to="'/widget/' + widget._id" class="button is-info">View</router-link>
      </div>
    </div>
    <br />
    <b-collapse aria-id="contentIdForA11y2" class="panel" :open.sync="isOpen">
      <div
        slot="trigger"
        class="panel-heading ends"
        role="button"
        aria-controls="contentIdForA11y2"
      >
        <div class="ends">
          <strong>Configuration</strong>
          <b-icon :icon="isOpen ? 'caret-up' : 'caret-down'"></b-icon>
        </div>
      </div>
      <div class="box">
        <b-field label="Manifest.json">
          <pre><code class="language-javascript">{{widget.manifest}}</code></pre>
        </b-field>
        <b-field label="Page">
          <b-field grouped>
            <b-input placeholder="i.e. 0, 1, 2..." v-model="pageValue" @input="changedPage" />
          </b-field>
        </b-field>
        <b-field label="Configurations">
          <b-field grouped group-multiline>
            <b-input placeholder="i.e. timezone" v-model="configProperty" />
            <b-input placeholder="i.e. PDT" v-model="configValue" />
            <b-button @click="addConfig()">Add</b-button>
          </b-field>
        </b-field>
        <b-field>
          <b-table :data="configData">
            <template slot-scope="props">
              <b-table-column field="property" label="Property">{{ props.row.property }}</b-table-column>

              <b-table-column field="value" label="Value">{{ props.row.value }}</b-table-column>
              <b-table-column label=" " width="40">
                <div class="flex-right">
                  <b-button
                    type="is-danger"
                    icon-right="trash"
                    @click="removeConfig(props.row.property)"
                  />
                </div>
              </b-table-column>
            </template>
          </b-table>
        </b-field>

        <b-field label="Styling">
          <b-field grouped group-multiline>
            <b-input placeholder="i.e. margin" v-model="cssProperty" />
            <b-input placeholder="i.e. 2rem" v-model="cssValue" />
            <b-button @click="addCSS()">Add</b-button>
          </b-field>
        </b-field>
        <b-field>
          <b-table :data="styleData">
            <template slot-scope="props">
              <b-table-column field="property" label="Property">{{ props.row.property }}</b-table-column>

              <b-table-column field="value" label="Value">{{ props.row.value }}</b-table-column>
              <b-table-column label=" " width="40">
                <div class="flex-right">
                  <b-button
                    type="is-danger"
                    icon-right="trash"
                    @click="removeCSS(props.row.property)"
                  />
                </div>
              </b-table-column>
            </template>
          </b-table>
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
import cssSet from "@/common/CSS"

@Component({
  components: {
    ConfigInput,
  },
})
export default class ConfigureWidget extends Vue {
  @Prop() public widget!: IWidget
  @Prop() public device!: IDevice
  @Prop() public page!: number
  public isOpen: boolean = true
  public styleData = []
  public configData = []
  public pageValue = 0
  public configProperty: string = ""
  public configValue: string = ""
  public cssProperty: string = ""
  public cssValue: string = ""

  mounted() {
    this.pageValue = this.page
    if (this.device && this.device.widgets && this.device.widgets[this.widget._id]) {
      this.configData = this.convertToTable(this.device.widgets[this.widget._id].config)
      this.styleData = this.convertToTable(this.device.widgets[this.widget._id].style)
    }
  }

  public changedPage() {
    console.log(this.pageValue)
    this.$emit("updatePage", this.pageValue)
  }

  public addConfig() {
    let config = { property: this.configProperty, value: this.configValue }
    this.configData.push(config)
    this.configProperty = ""
    this.configValue = ""
    this.$emit("updateConfig", this.convertToEmit(this.configData))
  }

  public removeConfig(property: string) {
    this.configData = this.configData.filter(field => field.property != property)
    this.$emit("updateConfig", this.convertToEmit(this.configData))
  }

  public addCSS() {
    let css = { property: this.cssProperty, value: this.cssValue }
    this.styleData.push(css)
    this.cssProperty = ""
    this.cssValue = ""
    this.$emit("updateCSS", this.convertToEmit(this.styleData))
  }

  public removeCSS(property: string) {
    this.styleData = this.styleData.filter(css => css.property != property)
    this.$emit("updateCSS", this.convertToEmit(this.styleData))
  }

  private convertToEmit(data) {
    // Prep data for emit
    let full = {}
    for (let c in data) {
      full[data[c].property] = data[c].value
    }
    return full
  }

  private convertToTable(data) {
    if (!data) return []
    // Prep data for emit
    let keys = Object.keys(data)
    let table = []
    for (let i = 0; i < keys.length; ++i) {
      table.push({ property: keys[i], value: data[keys[i]] })
    }
    return table
  }

  private validateConfig() {
    try {
      let configsJSON = JSON.parse(this.configs)
      return configsJSON
    } catch (err) {
      return null
    }
  }
}
</script>

<style lang="stylus" scoped>
.ends {
  display: flex;
  align-items: space-between;
}

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

.is-danger >>> textarea {
  border-color: #f14668;
}
</style>
