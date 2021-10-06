import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registered: localStorage.getItem('registered') === null ? 'false' :localStorage.getItem('registered'),
    user: {
      name: null,
      email: null,
      password: null,
      phone: null,
      country: null, 
      city: null,
      avatar: null,
      notifications: null
    },
  },
  mutations: {
    async readUser(){
      const request = await fetch(`${config.server}/user/${localStorage.getItem('id')}`);
      let data = await request.json();
      this.state.user.avatar = data.avatar;
      this.state.user.name = data.name;
      this.state.user.password = data.password;
      this.state.user.phone = data.phone;
      this.state.user.country = data.country;
      this.state.user.city = data.city;
      this.state.user.email = data.email;
      this.state.user.notifications = data.notifications;
    }
  },
  actions: {
    readUser({commit}){
      commit('readUser')
    }
  },
  modules: {
  }
})

/*  { avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: `<span class="font-weight-bold">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?` },
    { avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: `<span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.` },
    { avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', title: 'Oui oui', subtitle: '<span class="font-weight-bold">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?' },*/