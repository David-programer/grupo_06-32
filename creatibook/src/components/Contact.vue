<template >
  <div>
    <h1>Contactanos</h1>
    <br />

    <!-- inicio de los campos de texto-->
    <v-container>

      <!-- Campo de texto del Nombre-->
      <v-row class="justify-center">
        <v-col sm="4">
          <v-text-field
            label="Nombre"
            outlined
            color="#000"
            dense
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <br />
<!-- Campo de texto del Apellido-->
      <v-row class="justify-center">
        <v-col sm="4">
          <v-text-field
            label="Apellido"
            outlined
            color="#000"
            dense
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <br />
<!-- Campo de texto del telefono-->
      <v-row class="justify-center">
        <v-col sm="4">
          <v-text-field
            label="Telefono"
            outlined
            color="#000"
            dense
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <br />
<!-- Campo de texto del Correo-->
      <v-row class="justify-center">
        <v-col sm="4">
          <v-text-field
            label="Correo"
            outlined
            color="#000"
            dense
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <br />
<!-- Area de texto de Solicitud, queja o reclamo-->
      <v-row class="justify-center">
        <v-col sm="4">
          <v-textarea
            outlined
            no-resize
            hide-details="auto"
            color="#000"
            name="sqr"
            label="Solicitud, queja o reclamo"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <!--Boton de enviar-->
    <v-btn outlined color="#0BC6AB" > Enviar </v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>