<template>
    <v-container style="margin-top: 80px; padding:0px">
      <v-row>
        <v-col style="padding:0px" cols="4"> <chats /> </v-col>
        <v-col style="padding:0px"> <conversation /> </v-col>     
      </v-row>
    </v-container>
</template>

<script>

import Chats from '../components/Chats.vue'
import Conversation from '../components/Conversation.vue'

export default {
  components: { Chats, Conversation },
}
</script>