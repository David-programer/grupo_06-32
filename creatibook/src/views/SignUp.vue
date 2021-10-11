<template>
<v-container fill-height style="height: 100vh">
    <v-card
        class="mx-auto"
        width="400"
        align-center
        outlined
    >
        <v-alert dense outlined type="error" v-if="error">{{error}}</v-alert>
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
                color="#00A3FF"
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
                v-model="$store.state.user.email"
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
                v-model="$store.state.user.name"
                label="Nombre"
                :rules ="r1"
                outlined
                clearable
            ></v-text-field>
            <v-text-field
                v-model="$store.state.user.phone"
                label="Telefono"
                outlined
                clearable
            ></v-text-field>
            <v-text-field
                v-model="$store.state.user.country"
                label="Pais"
                outlined
                clearable
            ></v-text-field>
            <v-text-field
                v-model="$store.state.user.city"
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
            <v-card-text class="d-flex align-center flex-column">
                <v-avatar size="110">
                    <v-img :src="imageUrl.length >=1 ? imageUrl : imageDefault"/>
                </v-avatar>
				<v-text-field 
                    label="SUBIR" 
                    outlined
                    dense
                    style="margin-top:20px; min-width: 200px"
                    @click='pickFile' 
                    v-model='imageName' 
                    prepend-icon='mdi-cloud-upload'>
                </v-text-field>
				<input
					type="file"
					style="display: none"
					ref="image"
					accept="image/*"
					@change="onFilePicked"
				/>
            </v-card-text>
            <v-card-text>
                <span class="text-caption grey--text text--darken-1">
                    Sube un avatar para tu perfíl
                </span>
            </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
            <v-card-text>
                <v-text-field
                v-model="$store.state.user.password"
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

        <v-window-item :value="5">
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
            :disabled="step === 1 || step === 5"
            text
            @click="step--"
        >
            Atras
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            class="white--text"
            color="#00A3FF"
            depressed
            @click="validarCampos()"
        >
            {{step > 4 ?'Iniciar':'Siguente'}}
        </v-btn>
        </v-card-actions>
    </v-card>
</v-container>
</template>

<script>
import config from '../config';
export default {
        data: () => ({
            step: 1,
            error: null,
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
            imageName: '',
		    imageUrl: '',
		    imageFile: '',
            imageDefault: `${config.server}/public/avatars/defaultavatar.png`
        }),
        computed: {
        currentTitle () {
            switch (this.step) {
            case 1: return 'Registrarse'
            case 2: return 'Datos personales'
            case 3: return 'Selecciona un avatar'
            case 3: return 'Crea una contraseña'
            default: return 'Cuenta creada'
            }
        }},
        methods: {
            validarCampos(){
                this.error = null;
                try {
                    if(this.step === 1){
                        if(this.$store.state.user.email == null || !this.$store.state.user.email.includes('@') || !this.$store.state.user.email.includes('.com')){
                        throw 'Digite un correo válido'
                    }} else if(this.step === 2){
                        if(this.$store.state.user.name == null){
                        throw 'Digite un nombre válido'
                    }}else if(this.step === 4){
                        if(this.$store.state.user.password == null || this.$store.state.user.password.length < 8){
                        throw 'Digite una contraseña válida'
                        }if(!this.createUser()){
                        throw 'Error al guardar el usuario, intentalo más tarde'
                    }}else if(this.step === 5){
                            this.$router.push('/');
                    }this.step++
                } catch (error) {
                    this.error = error;
                }
            },
            async createUser(){
                const formdata = new FormData();
                for (const key in this.$store.state.user) {
                    if(key == 'avatar') continue
                    formdata.append(`${key}`,this.$store.state.user[key])
                }
                formdata.append(`avatar`, this.imageFile);

                const request = await fetch(`${config.server}/user`, {
                    method: 'POST',
                    body: formdata
                });
                let resultado = await request.json();
                if(resultado.status !== 200) return false
                localStorage.setItem('registered', true);
                localStorage.setItem('id', resultado.id);
                this.$store.dispatch('readUser');
                this.$store.state.registered = 'true';
                return true;
            },
            pickFile () {
                this.$refs.image.click()
            },
            onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}}
}
</script>