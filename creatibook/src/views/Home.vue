<template>
  <div class="home" style="padding: 10px; margin-top: 50px">
    <v-container style="padding: 10px " fluid>
      <v-row >
        <v-col style="padding-left: 28px; padding-top: 35px; text-align: left; font-weight: bold" >Explorar</v-col>
        <v-spacer></v-spacer>
        <v-col>
        <p style="text-align: right; padding-right: 13px; padding-top: 15px">
          Popular
          <v-icon large color="#00A3FF">mdi-chevron-down</v-icon>
          <v-icon large color="#00A3FF">mdi-microsoft</v-icon>
          <v-icon large color="#00A3FF" style="margin:none">mdi-square</v-icon>
        </p>
        </v-col>
      </v-row>

      <v-row style="padding: 10px" dense>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="item in items" :key="item._id" cols="3">
                <v-card max-width="300px">
                <v-img :src="item.url" height="180px"
                  class="white--text align-end">
                  <v-card-title v-text="item.name"/>
                  <v-card-subtitle v-text="item.email"/>
                </v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-thumb-up-outline</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-thumb-down-outline</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-heart-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import config from '../config';
export default {
  async beforeCreate(){
    const request = await fetch(`${config.server}/publication`)
    const respuesta = await request.json();
    this.items = respuesta;
  },
  data: ()=>({
    items: []
  })
}
</script>


