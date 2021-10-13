<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" style="padding:0px; margin-left:10px">  
          <v-card color="grey lighten-4" elevation="3">
            <v-card-title color="grey darken-4">
              Nombre usuario
            </v-card-title>
          </v-card>
      </v-col>  
    </v-row>
    <v-row style="height: 760px" align="end">
        <v-col cols="12" style="padding:0px; margin-left:10px">
            <v-card>
                <div v-for="(item, index) in chat" :key="index" 
                    :class="['d-flex flex-row align-center my-2', item.from == 'user' ? 'justify-end': null]">
                    <span v-if="item.from == 'user'" class="blue--text mr-3">{{ item.msg }}</span>
                    <v-avatar :color="item.from == 'user' ? 'indigo': 'red'" size="36">
                    <span class="white--text">{{ item.from[0] }}</span>
                    </v-avatar>
                    <span v-if="item.from != 'user'" class="blue--text ml-3">{{ item.msg }}</span>
                </div>
            </v-card>

        <v-container>
          <v-row>
            <v-col cols="12" style="padding:0px; margin-left:10px">
              <v-text-field
                v-model="message"
                :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
                filled
                clear-icon="mdi-close-circle"
                clearable
                label="Mensaje"
                type="text"
                @click:append="toggleMarker"
                @click:append-outer="sendMessage"
                @click:prepend="changeIcon"
                @click:clear="clearMessage"
                height="70"
              ></v-text-field>
            </v-col>
          </v-row>
      </v-container>
  </v-col>
        </v-row>
  </v-container>      
</template>

<script>
export default {
    data: () => ({
      password: 'Password',
      show: false,
      message: 'Escribe un mensaje ',
      chat: '',
      marker: true,
      iconIndex: 0,
      icons: [
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-dead',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue',
      ],
    }),

    computed: {
      icon () {
        return this.icons[this.iconIndex]
      },
    },

    methods: {
      toggleMarker () {
        this.marker = !this.marker
      },
      sendMessage () {
        this.resetIcon()
        this.clearMessage()
      },
      clearMessage () {
        this.message = ''
      },
      resetIcon () {
        this.iconIndex = 0
      },
      changeIcon () {
        this.iconIndex === this.icons.length - 1
          ? this.iconIndex = 0
          : this.iconIndex++
      },
    },
  }
</script>