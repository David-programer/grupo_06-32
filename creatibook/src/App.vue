<template>
  <v-app>
    <nav-bar/>
    <v-sheet
      id="scrolling-techniques-8"
      class="overflow-y-auto"
      max-height="100vh"
      overflow-y-auto>
      <v-main>
        <router-view />
      </v-main>
    </v-sheet>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  beforeCreate(){
    localStorage.getItem('registered') === null ? localStorage.setItem('registered', false) : localStorage.getItem('registered');
  },
  name: 'App',
  data: () => ({}),
  components:{ NavBar }
};
</script>
