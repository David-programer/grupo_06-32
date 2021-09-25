<template>
  <div>
    <v-container style="height: 90px;"></v-container>
    <hello-world />
    <hello-world />
  </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
  }
</script>
