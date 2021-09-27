<template>
<v-container fill-height style="height: 100vh">
    <v-card
        class="mx-auto"
        width="400"
        align-center
    >
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
                color="primary lighten-2"
                class="subheading white--text"
                size="24"
                v-text="step"
            ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
        <v-window-item :value="1">
            <v-card-text>
            <v-text-field 
                label="Correo electronico"
                v-model="user.email"
                outlined
                clearable
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
                El correo se utilizará para Iniciar sesión en la plataforma
            </span>
            </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
            <v-card-text>
            <v-text-field
                v-model="user.name"
                label="Nombre"
                :rules ="r1"
                outlined
                clearable
            ></v-text-field>
            <v-text-field
                v-model="user.phone"
                label="Telefono"
                outlined
                clearable
            ></v-text-field>
            <v-text-field
                v-model="user.country"
                label="Pais"
                outlined
                clearable
            ></v-text-field>
            <v-text-field
                v-model="user.city"
                label="Ciudad"
                outlined
                clearable
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
                Digita la información básica para que puedan contactarte
            </span>
            </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
            <v-card-text>
                <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                hint="Debe tener almenos 8 caracteres"
                counter
                outlined
                clearable
                @click:append="show1 = !show1"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
                Crea una contraseña para tu perfíl
            </span>
            </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
            <div class="pa-4 text-center">
            <v-img
                class="mb-4"
                contain
                height="128"
                src="../assets/logo.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
                Bienvenido a CreatiBook
            </h3>
            <span class="text-caption grey--text">Garcias por registrarte</span>
            </div>
        </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
        <v-btn
            :disabled="step === 1"
            text
            @click="step--"
        >
            Atras
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            :disabled="step === 4"
            color="primary"
            depressed
            @click="step === 3 ? createUser() :step++"
        >
            Siguente
        </v-btn>
        </v-card-actions>
    </v-card>
</v-container>
</template>

<script>
    export default {
        data: () => ({
            user:{
                name: null,
                email: null,
                phone: null,
                country: null,
                city: null,
                password: null
            },
            step: 1,
            checkbox: false,
            show1: false,
            r1:[
                    value => !!value || 'Requerido.'
            ],
            r2:[
                    checkbox => true || 'acepte terminos y condiciones'
            ],
            rules: {
                required: value => !!value || 'Requerido.',
                min: value => value.length >= 8 || 'Min 8 caracteres',
                emailMatch: () => (`el correo o la contraseña no coinciden`),
            },
        }),
        computed: {
        currentTitle () {
            switch (this.step) {
            case 1: return 'Registrarse'
            case 2: return 'Datos personales'
            case 3: return 'Crea una contraseña'
            default: return 'Cuenta creada'
            }
        },
        },
        methods: {
            async createUser(){
                let {name, email, phone, country, city, password} = this.user;
                
                const request = await fetch('http://192.168.43.252:3000/user', {
                    method: 'POST',
                    body: JSON.stringify({name, email, phone, country, city, password}),
                    headers: {'Content-Type': 'application/json'}
                });
                console.log(request);
                this.step++
            }
        }
    }
</script>