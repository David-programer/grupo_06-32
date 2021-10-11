<template>
<v-container style="margin-top: 40px" class="container">
  <v-card class="mx-auto my-12" max-width="600" outlined style="border-radius: 15px">
    <!--barra de titulo-->
    <v-card-title flat>
      <v-icon style="margin-right: 10px">mdi-cog</v-icon>
      Configuración
    </v-card-title>

    <!--imagen de perfil-->
    <div class="d-flex flex-column align-center">
        <v-avatar size="100">
          <v-img :src="$store.state.user.avatar"/>
        </v-avatar>
        <!--boton de cambiar imagen-->
        <v-spacer></v-spacer>
        <v-btn
          color = "#00A3FF"
          class="white--text"
          @click="dialog = !dialog"
          style="margin-top: 15px"
        ><v-icon left>
          mdi-pencil
        </v-icon>
          Cambiar
        </v-btn>
    </div>
    <!--informacion personal-->
    <div class="d-flex flex-column align-center" style="margin-top: 30px; border-top: 1px solid lightgray">
        <div style="padding: 20px; font-size: 25px">
          <v-icon size="30">mdi-account-cog</v-icon>
          Informacion Personal
        </div>
      <!--informacion a editar-->
        <v-text-field
          v-model="$store.state.user.name"
          outlined
          label="Nombre"
        ></v-text-field>

        <v-text-field
          v-model="$store.state.user.country"
          outlined
          label="Pais"
        ></v-text-field>

        <v-text-field
          v-model="$store.state.user.city"
          outlined
          label="Ciudad"
        ></v-text-field>
    </div>
    <!--informacion de contacto-->
    <div class="d-flex flex-column align-center" style="border-top: 1px solid lightgray">
        <div style="padding: 20px; font-size: 25px">
          <v-icon size="30">mdi-account</v-icon>
          Informacion de contacto
        </div>
      <!--informacion a editar-->
        <v-text-field
          outlined
          v-model="$store.state.user.email"
          label="Correo electrónico"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="$store.state.user.phone"
          label="Teléfono"
        ></v-text-field>
    </div>
    <!--informacion de seguridad-->
    <div class="d-flex flex-column align-center" style="border-top: 1px solid lightgray">
        <div style="padding: 20px; font-size: 25px">
          <v-icon size="30">mdi-clipboard-account</v-icon>
          Seguridad
        </div>
      <!--informacion a editar-->
        <v-text-field
            v-model="$store.state.user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            hint="mínimo 8 caracteres"
            @click:append="show1 = !show1"
          outlined
          color="black"
          label="Contraseña"
        ></v-text-field>
    </div>

      <!--boton gurdar y cancelar-->
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="#00A3FF" > Cancelar </v-btn>
        <v-btn color="#00A3FF" @click="save" class="white--text"> Guardar </v-btn>
      </v-card-actions>
  </v-card>

    <!--dialogo emergente subir imagen-->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-file-input
                  truncate-length="15"
                  label= "nueva imagen"
          ></v-file-input>
          <small class="grey--text">Selecciona una nueva imagen</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog = false"> Subir </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--dialogo emergente gurdado exitoso-->
    <v-snackbar
      v-model="hasSaved"
      :timeout="2000"
      absolute
      bottom
      left
    >
      Información actualizada
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        hasSaved: false,
        dialog: false,
        model: null,
        show1: false,
      }
    },

    methods: {
      save () {
        this.hasSaved = true
      }
    },
  }
</script>