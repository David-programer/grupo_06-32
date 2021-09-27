<template>
    <div>
        <v-container style="height: 50px;"></v-container>
        <!-- Logo-->
        <br />
        <br />
        <v-img
            src="../assets/logo.svg"
            class="my-3"
            contain
            height="150"
        />
        <br />
        <br />

        <!-- inicio de los campos de texto-->
        <v-container>
        <v-row class="justify-center">
            <v-col sm="3">
            <v-text-field
                label="Correo"
                outlined
                color="#000"
                dense
                :rules="[rules.required]"
                hide-details="auto"
            ></v-text-field>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col sm="3">
                <v-text-field
                    label="Contraseña..."
                    outlined
                    color="#000"
                    dense
                    hide-details="auto"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show ? 'text' : 'password'"
                    class="input-group--focused"
                    @click:append="show = !show"
                ></v-text-field>
                <br />
                <!-- olvido la contraseña?-->
                <v-row class="col align-self-start">¿Olvidó su contraseña?</v-row>
            </v-col>
        </v-row>
        <!--Final de campos de texto -->

        <!-- Inico de botones -->
        <v-row class="justify-center">
            <v-btn class="white--text ma-2" color="#0BC6AB">Iniciar Sesión</v-btn>
            <v-btn class="ma-2" outlined color="#0BC6AB" @click="$router.push('/sign-up')">Registrarse</v-btn>
        </v-row>
        <!--Final de botones-->
        </v-container>
    </div>
</template>

<script>
export default {
    name: "login",
    data: () =>{
        return{
            show: false,
            password: "password",
            rules: {
                required: (value) => !!value || "Required",
            }
        }
    }
}
</script>