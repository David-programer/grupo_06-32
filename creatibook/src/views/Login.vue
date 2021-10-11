<template>
    <div style="height: 100vh" class="d-flex justify-center align-center">
        <v-card width="400px" outlined>
            <!-- Logo-->
            <v-img
            src="../assets/logo.svg"
            class="my-3"
            contain
            height="150"
            />

            <!-- inicio de los campos de texto-->
            <v-card-text>
                <v-text-field
                    label="Correo"
                    outlined
                    color="#000"
                    dense
                    :rules="[rules.required]"
                    hide-details="auto"
                    v-model="email"
                ></v-text-field>
                <br/>
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
                    v-model="password"
                ></v-text-field>
            </v-card-text>
            <!-- olvido la contraseña?-->
            <v-card-subtitle>¿Olvidó su contraseña?</v-card-subtitle>

            <!-- Inico de botones -->
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text ma-2" color="#00A3FF" @click="validarCampos()">Iniciar Sesión</v-btn>
                <v-btn class="ma-2" outlined color="#00A3FF" @click="$router.push('/sign-up')">Registrarse</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar right v-model="alert" color="error">{{msg}}</v-snackbar>
    </div>
</template>

<script>
import config from '../config';
export default {
    name: "login",
    data: () =>{
        return{
            show: false,
            email: null,
            password: null,
            alert: null,
            msg: null,
            rules: {
                required: (value) => !!value || "Required",
            }
        }
    },
    methods: {
        validarCampos(){
            if(this.email && this.password){
                if(!this.email.includes('@') || !this.email.includes('.com')){
                    this.alert = true
                    this.msg = 'Ingresa un email válido'
                }else{
                    this.consultUser();
                }
            }else{
                this.alert = true
                this.msg = 'Completa todos los campos'
            }
        },
        async consultUser(){
            const request = await fetch(`${config.server}/user/sign-up`, {
                method: 'POST',
                body: JSON.stringify({email: this.email, password: this.password}),
                headers: {'Content-Type': 'application/json'}
            });
            const respuesta = await request.json();
            if(respuesta.status == 404 || respuesta.validation == false){
                this.alert = true
                this.msg = 'Correo o contraseña incorrecta'
            }else{
                localStorage.setItem('registered', true);
                localStorage.setItem('id', respuesta.id);
                this.$store.dispatch('readUser');
                this.$store.state.registered = 'true';
                this.$router.push('/')
            }
        }
    }
}
</script>