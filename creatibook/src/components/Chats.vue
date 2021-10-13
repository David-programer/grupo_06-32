<template>
  <v-container >
    <v-row>
      <v-col cols="12" style="padding:0px">
        <v-card elevation="10" >
          <v-toolbar color="grey lighten-4">
            <v-icon style="margin-rigth:20px; ">mdi-forum</v-icon>
            <v-toolbar-title color="grey darken-4"> Mensajes </v-toolbar-title>
            <v-spacer></v-spacer>                 
          </v-toolbar>

          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                inset
              >
                {{
                  item.header
                }}
              </v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                inset
              ></v-divider>

              <v-list-item
                v-else
                :key="item.title"
                ripple
              >
                <v-list-item-avatar>
                  <img :src="item.avatar">
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            header: 'Today',
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=660',
            title: 'Carlos Rua',
            subtitle:
              `¿Podemos acordar una reunión?`,
          },
          {
            avatar: 'https://picsum.photos/250/300?image=821',
            title: 'Jessica Lee',
            subtitle:
              'Me gustaría cotizar un proyecto. Contactame pronto',
          },
          {
            avatar: 'https://picsum.photos/250/300?image=783',
            title: 'George W.',
            subtitle:
              'Talk to you from Paris. I like your recommendations',
          },
          {
            header: 'Yesterday',
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1006',
            title: 'Andrea Castro',
            subtitle:
              '<span class="font-weight-bold">LaToya</span> &mdash; Vi tu galería en el museo.',
          },
          {
            avatar: 'https://picsum.photos/250/300?image=146',
            title: 'Esteban Perez',
            subtitle:
              '<span class="font-weight-bold">Nancy</span> &mdash; Cuándo nos reunimos?',
          },
          {
            header: 'Last Week',
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1008',
            title: 'Freddy Mercado',
            subtitle:
              'Me gustó mucho tu trabajo, te recomendaré con amigos.',
          },
          {
            avatar: 'https://picsum.photos/250/300?image=839',
            title:
              'Larissa White',
            subtitle:
              'Sí, estoy interesada...',
          },
          {
            avatar: 'https://picsum.photos/250/300?image=145',
            title: 'James Franco',
            subtitle:
              'Quieres hacer una colaboración?',
          },
        ],
      }
    },
  }
</script>