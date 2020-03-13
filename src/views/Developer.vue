 <template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <a class="ribbon" href="https://github.com/miradev/mira-ui-widget-template-vue">
          <img
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
            class="attachment-full size-full"
            alt="Fork me on GitHub"
            data-recalc-dims="1"
          />
        </a>
        <div class="columns">
          <div class="column is-12">
            <div class="container content">
              <h1 class="title">Mira Developer</h1>
              <h3 class="subtitle">Develop and share your custom widget creations</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="content is-medium">
          <h2>Overview</h2>
          <p>
            Mira widgets run on familiar web technologies, making it an easily accessible platform to get started with. For those familiar with git, creating your first widget is as easy as cloning
            <a
              href="https://github.com/miradev/mira-ui-widget-template-vue/"
            >this repo.</a>
          </p>

          <h1 id="mirauiwidgettemplatevue">mira-ui-widget-template-vue</h1>

          <p>This repository is a template repository that contains all the setup and scripts needed to build a mira-ui widget that uses the Vue.js (2.X) framework.</p>

          <h2 id="setup">Setup</h2>

          <p>
            To get started, clone this repository and set it up with the
            <code>yarn install</code> command.
          </p>

          <h2 id="developingyourwidget">Developing your widget</h2>

          <p>
            Local development can be done by starting up a local vue dev server with hot-reloading using
            <code>yarn install</code>.
          </p>

          <p>
            Check the
            <code>Widget.vue</code> file in the
            <code>src</code> folder as a baseline example.
          </p>

          <p>
            A
            <code>manifest.json</code> file is used to define the file bundles required by your widget for loading.
          </p>

          <p>Example manifest.json:</p>

          <pre><code class="json language-json">{
  "id": "clock",
  "name": "Clock",
  "version": "1.0.0",
  "author": "Mira",
  "entrypoint": {
    "js": "main.js",
    "css": "main.css"
  },
  "configKeys": {
    "format": "string"
  }
}
</code></pre>

          <p>For this template repository using vue, you may leave the entrypoint as default. The other fields can be edited as necessary.</p>

          <ul>
            <li>
              id - a unique identifier for the widget, used by the marketplace and for rendering the widget (the root div will have it's id attribute set to this). Note that every widget should have a unique id, as the marketplace will not accept two different widgets with overlapping ids (a widget may only be updated with version bumps once it exists in the marketplace).
              <strong>Please keep the id as all lower-case with hyphens separating words and phrases (no spaces.</strong>
            </li>

            <li>name - a user friendly name for the widget</li>

            <li>version - the version of the widget</li>

            <li>author - the author of the widget</li>

            <li>entrypoint - used to define the single javascript and css bundle files to load. For this template repository, this should be left as default.</li>

            <li>
              configKeys - an object containing key-value pairs where the key names are the config keys, and the values define the type of value supported for each config key (string, boolean, or number)
              <ul>
                <li>Custom configs are supported by the Mira platform for an individual user. A user can change the values for these configKeys on the Mira application website.</li>

                <li>
                  If a widget wishes to use configKeys, it is also necessary to declare an empty or null config object in the
                  <code>data()</code> return of the
                  <code>.vue</code> source file (see the
                  <code>Widget.vue</code> example).
                </li>
              </ul>
            </li>
          </ul>

          <h3 id="caveatswhatisid">Caveats (what is --ID-- ?)</h3>

          <p>
            Notice that the
            <code>&lt;template&gt;</code> and
            <code>&lt;style&gt;</code> blocks in the .vue file reference a div named
            <code>--ID--</code>. This is the root div corresponding to your widget and is required and should not be removed. It is a temporary variable name that will be replaced with the ID set in the
            <code>manifest.json</code> when the widget is built.
          </p>

          <p>
            You may edit your manifest.json file to have a different
            <code>id</code> field.
            <strong>Note that your widget must have a unique ID as any two widgets with a clashing ID will not be loaded!</strong>
          </p>

          <h2
            id="whatifmywidgetneedstosendhttprequests"
          >What if my widget needs to send HTTP requests?</h2>

          <p>
            Use the
            <a href="https://github.com/axios/axios">axios</a> library. Add
            <code>const axios = require("axios").default</code> to the beginning of the
            <code>&lt;script&gt;</code> block in your widget's
            <code>.vue</code> file. Axios is supported by the Mira UI system globally, so this import statement will be automatically removed when the widget is built.
          </p>

          <p>e.g.</p>

          <pre><code class="vue language-vue">&lt;script&gt;
const axios = require("axios").default // this will be removed when the widget is compiled

...
my vue widget code here
use axios anywhere here
...
&lt;/script&gt;
</code></pre>

          <h2 id="momentjssupport">Moment.js support</h2>

          <p>
            The Mira UI system also globally supports
            <a
              href="https://github.com/moment/moment"
            >moment.js</a> out of the box. This can simply be used directly within the
            <code>&lt;script&gt;</code> block in your widget's
            <code>.vue</code> file. Add
            <code>const moment = require("moment")</code> to the beginning of the
            <code>&lt;script&gt;</code> block.
          </p>

          <p>e.g.</p>

          <pre><code class="vue language-vue">&lt;script&gt;
const moment = require("moment") // this will be removed when the widget is compiled

...
my vue widget code here
use moment anywhere here
...
&lt;/script&gt;
</code></pre>

          <h2 id="buildingyourwidget">Building your widget</h2>

          <p>Build your .css, .js, and manifest.json bundle using</p>

          <pre><code>yarn build src/Widget.vue
</code></pre>

          <p>Package it as a zip using</p>

          <pre><code>yarn package
</code></pre>

          <p>
            This will create a
            <code>.zip</code> file in the
            <code>dist</code> directory using the id name specified in the manifest.json file.
          </p>

          <pre><code>yarn copy
</code></pre>

          <p>
            This will copy all the
            <code>.zip</code> files from the
            <code>dist</code> directory to the
            <code>$HOME/.mira/widgets</code> folder for running on a
            local instance of the Mira UI system.
          </p>

          <h2 id="developmentservertotestyourwidget">Development Server to test your widget</h2>

          <p>A local vue server instance can be run to locally test the widget:</p>

          <pre><code>yarn serve --src=@
</code></pre>

          <p>
            where @ is the location of your widget's
            <code>.vue</code> file, within the
            <code>src</code> folder.
          </p>

          <p>For the Widget.vue example, this command would be:</p>

          <pre><code>yarn serve --src=Widget.vue
</code></pre>

          <p>
            since
            <code>Widget.vue</code> is located as
            <code>src/Widget.vue</code> relative to the root folder.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
body, html {
  background: #f2f2f2;
}

pre, .message {
  max-width: 960px;
}

li {
  margin: 10px;
}

.ribbon {
  position: absolute;
  top: 85px;
  right: 0;
}

.hero.is-primary {
  background: linear-gradient(to top right, #524ad0 10%, #D099FA);
}

.box {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}

.box span.icon {
  float: right;
  font-size: 1.7em;
  padding: 2rem 2rem 0 0;
}

.is-large.fab {
  font-size: 7em;
}

.is-large.fas {
  font-size: 5em;
  margin-left: 0.2em;
}

.media-content {
  overflow: hidden;
}

.menu-list li a:hover {
  background: #d9d9d9;
}

.token.number {
  display: inline;
  padding: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  vertical-align: inherit;
  border-radius: inherit;
  font-weight: inherit;
  white-space: inherit;
  background: inherit;
  margin: inherit;
}

.footer {
  background-color: white;
}
</style>
