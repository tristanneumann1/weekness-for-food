import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify';
import store from '@/store'
import router from './router'
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
