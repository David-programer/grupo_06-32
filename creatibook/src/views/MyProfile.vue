<template>
    <div style="margin-top: 70px">
        <v-container>
            <v-row>
                <v-col cols="4">
                    <div>
                        <v-avatar size="100">
                            <v-img  :src="$store.state.user.avatar"></v-img>
                        </v-avatar>
                        <h1>{{$store.state.user.name}}</h1>
                        <h3>Información de contacto</h3>
                        <p>{{$store.state.user.email}}</p>
                        <p>{{$store.state.user.phone}}</p>
                        <h3>Información personal</h3>
                        <p>{{$store.state.user.city}}</p>
                        <p>{{$store.state.user.country}}</p>
                        <v-list>
                            <v-list-item link @click="$router.push('/configuration')">
                                <v-list-item-icon>
                                    <v-icon left>mdi-cog-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Configuración</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item link @click="dialog = !dialog">
                                <v-list-item-icon>
                                    <v-icon left>mdi-comment-account</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Agregar publicación</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-col>
                <v-col v-if="items.length == 0">
                    <v-card outlined width="max-content">
                        <v-card-title>Aún no tienes publicaciones</v-card-title>
                        <v-card-subtitle>¡Publica contenido para que otras personas puedan ver tu trabajo!</v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col>
                    <v-snackbar right v-model="alert" color="success">{{msg}}</v-snackbar>
                    <v-container fluid>
                        <v-row dense>
                            <v-col v-for="item in items" :key="item._id" cols="6">
                                <v-card max-width="500px">
                                    <v-img :src="item.url" height="180px"
                                        class="white--text align-end">
                                        <v-card-title v-text="item.name"/>
                                        <v-card-subtitle v-text="item.email"/>
                                    </v-img>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="handleEditOpen(item._id)">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn icon @click="handleDelete(item._id)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialog" width="500px">
            <v-card outlined>
                <v-card-title>Crea tu nueva publicación</v-card-title>
                <v-card-text>
                    <v-card>
                        <v-img :src="imageUrl.length >=1 ? imageUrl : imageDefault"></v-img>
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
                </v-card-text>
                <v-card-text>
                    <v-text-field 
                        label="SUBIR" 
                        outlined
                        dense
                        style="min-width: 200px"
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
                <v-card-subtitle>Puedes hacer que tus publicaciones aparezcan en primera linea si tienen muchos likes, o adquiriendo el plan para promocionar tu perfil</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outlined :disabled="imageUrl.length == 0" @click="createPublication()">
                        publicar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" width="500px">
            <v-card outlined>
                <v-card-title>Actualizar publicación</v-card-title>
                <v-card-text>
                    <v-card>
                        <v-img :src="imageUrl.length >=1 ? imageUrl : publicationRead.url" height="200px"></v-img>
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
                </v-card-text>
                <v-card-text>
                    <v-text-field
                        prepend-icon='mdi-format-title'
                        outlined
                        dense
                        label="Título" 
                        v-model="publicationRead.name">
                    </v-text-field>
                    <v-text-field 
                        prepend-icon='mdi-subtitles'
                        outlined
                        dense
                        label="Subtitulo" 
                        v-model="publicationRead.email">
                    </v-text-field>
                    <v-text-field 
                        label="SUBIR" 
                        outlined
                        dense
                        style="min-width: 200px"
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
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outlined :disabled="imageUrl.length == 0" @click="handleEdit(publicationRead._id)">
                        Actualizar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import config from '../config';
export default {
    created(){
        this.readPublications();
    },
    data: () => ({
        items: [],
        dialog: false,
        imageName: '',
		imageUrl: '',
		imageFile: '',
        imageDefault: 'https://picsum.photos/510/300?random',
        alert: null,
        msg: null,
        publicationRead: {
            url: null,
            email: null,
            name: null
        },
        dialog2: false
    }),
    methods: {
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
		},
        async readPublications(){
            const request = await fetch(`${config.server}/publication/${localStorage.getItem('id')}`)
            const respuesta = await request.json();
            this.items = respuesta;
        },
        async createPublication(){
            const formdata = new FormData();
            formdata.append('name', this.$store.state.user.name);
            formdata.append('email', this.$store.state.user.email);
            formdata.append('publication', this.imageFile);
            formdata.append('idUser', localStorage.getItem('id'));

            const request = await fetch(`${config.server}/publication`, {
                method: 'POST',
                body: formdata
            });
            let resultado = await request.json();
            //if(resultado.status !== 200)
            if(resultado.status == 200){
                this.dialog = false
                this.msg = 'Publicación subida correctamente'
                this.alert = true
                this.imageName = ''
                this.imageUrl = ''
                this.imageFile = ''
                this.readPublications();
            }
        },
        async handleDelete(id){
            await fetch(`${config.server}/publication/${id}`,{
                method: 'DELETE'
            })
            this.readPublications();
            this.msg = 'Publicación eliminada correctamente'
            this.alert = true
        },
        async handleEditOpen(id){
            const request = await fetch(`${config.server}/publication/read/${id}`);
            const respuesta = await request.json();
            this.publicationRead = respuesta;
            this.dialog2 = true
        },
        async handleEdit(id){
            const formdata = new FormData();
            formdata.append('name', this.publicationRead.name);
            formdata.append('email', this.publicationRead.email);
            formdata.append('publication', this.imageFile);
            formdata.append('idUser', localStorage.getItem('id'));

            const request = await fetch(`${config.server}/publication/${id}`, {
                method: 'PUT',
                body: formdata
            });
            let resultado = await request.json();
            if(resultado.status == 200){
                this.dialog2 = false;
                this.imageName = ''
                this.imageUrl = ''
                this.imageFile = ''
                this.readPublications();
                this.msg = 'Publicación editada correctamente'
                this.alert = true
            }
        }
    }
}
</script>