import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registered: localStorage.getItem('registered'),
    user: {
      name: "Sofía Tabares",
      nickname: "Sofi",
      email: "sofia@gmail.com",
      telefono: "3506996058",
      avatar: "https://i0.wp.com/www.diarlu.com/wp-content/uploads/2019/09/rostro-mujer-adulta.jpg?resize=500%2C500&ssl=1"
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
