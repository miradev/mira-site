import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {"admin": "password"},
    authenticated: false,
    username: "",
    widgets: [{"id":2,"title":"Mira Notes","description":"Connect to your favourite notes application and show your notes on Mira.","img_url":"https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80","author":"willyang"},{"id":1,"title":"Mira Clock","description":"This is the default clock. Basic 7-segment display showing current time.","img_url":"https://images.unsplash.com/photo-1547908068-b3c55fdda5be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80","author":"kvnxiao"},{"id":5,"title":"Spotify","description":"Connect to your spotify account and play your playlists through Mira. ","img_url":"https://open.spotify.com/static/images/icons/Spotify_1024.png","author":"jimjzhu"},{"id":6,"title":"Lyft","description":"Call a Lyft ride straight from Mira!","img_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/1200px-Lyft_logo.svg.png","author":"kvnxiao"},{"id":7,"title":"Uber","description":"Call an Uber straight from Mira!","img_url":"http://www.brooklynvegan.com/files/2018/08/uber.jpg","author":"jimjzhu"},{"id":3,"title":"Mira Calendar","description":"Sync with your preferred calendar application and shows your daily agenda.","img_url":"https://images.unsplash.com/photo-1543168256-4ae2229821f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80","author":"harryh"},{"id":4,"title":"Countdown Timer","description":"Creates a timer that counts down. Perfect for timed events like teeth brushing!","img_url":"https://www.tickcounter.com/static/images/og/og_timer.png","author":"willyang"},{"id":8,"title":"Google Assistent","description":"Google assistant on your Mira!","img_url":"https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/34/56/ef/3456ef15-c3e1-aa3f-bbbe-0ff64f5fc3f9/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/1200x630wa.png","author":"harryh"},{"id":0,"title":"Mira Weather","description":"This is the default weather app. Displays local weather conditions and temperatures.","img_url":"https://images.unsplash.com/photo-1508697014387-db70aad34f4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80","author":"kvnxiao"}]
  },
  mutations: {
    login(state, username){
      state.username = username;
      state.authenticated = true;
    },
    register(state, credentials){
      state.username = credentials.username;
      state.users[credentials.username] = credentials.password
      state.authenticated = true;
    },
    logout(state){
      state.username = ""
      state.authenticated = false;
    }
  },
  actions: {

  },
});
