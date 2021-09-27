<template>
    <div>
        <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-8"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>CreatiBook</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        
            <!-- Avatar -->
            <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                    icon
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-avatar size="30">
                        <v-icon v-if="$store.state.registered == 'false'">mdi-account-circle</v-icon>
                        <img v-if="$store.state.registered == 'true'" :src="$store.state.user.avatar"/>
                    </v-avatar>
                    </v-btn>
                </template>

                <v-card v-if="$store.state.registered == 'true'">
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <img :src="$store.state.user.avatar" :alt="$store.state.user.name"/>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{$store.state.user.nickname}}</v-list-item-title>
                                <v-list-item-subtitle>{{$store.state.user.name}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item link dense>
                            <v-list-item-icon>
                                <v-icon left>mdi-bell</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Notificaciones</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn
                            text
                            @click="menu = false; logout()"
                        >
                            Cerrar Sesión
                        </v-btn>
                        <v-btn
                            color="primary"
                            text
                            @click="menu = false"
                        >
                            Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <v-card v-if="$store.state.registered == 'false'">
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-icon>mdi-account-circle</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>No estás registrado</v-list-item-title>
                                <v-list-item-subtitle>Accede</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn
                            text
                            color = "primary"
                            @click="$router.push('/login'); menu= false"
                        >
                            Iniciar Sesión
                        </v-btn>

                        <v-btn
                            text
                            @click="$router.push('/sign-up'); menu = false"
                        >
                            Registrarse
                        </v-btn>
                    </v-card-actions>
                </v-card>
        </v-menu>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        </v-app-bar>
        <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary>
            <v-list nav dense v-if="$store.state.registered == 'true'">
                <v-list-item>
                    <v-list-item-avatar>
                        <img :src="$store.state.user.avatar" :alt="$store.state.user.name">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{$store.state.user.nickname}}</v-list-item-title>
                        <v-list-item-subtitle>{{$store.state.user.name}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item @click="drawer = false; redirect(item.path)" link v-for="item in items" :key="item.title">
                        <v-list-item-icon>
                            <v-icon left>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list>

            <v-list nav dense v-if="$store.state.registered == 'false'">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>No estás registrado</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
                <v-list>
                    <v-list-item link @click="drawer = false; redirect(item.path)" v-for="item in itemsVariant" :key="item.title"> 
                        <v-list-item-icon>
                            <v-icon left>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'nav-bar',

    data: () => ({
        menu: false,
        drawer: false,
        items: [
            {
            icon: 'mdi-home',
            title: 'Inicio',
            path: '/'
            },
            {
            icon: 'mdi-collage',
            title: 'Mi perfil',
            path: '/user-page'
            },
            {
            icon: 'mdi-comment-text-multiple',
            title: 'Mensages',
            path: '/messages'
            },
            {
            icon: 'mdi-cog-outline',
            title: 'Configuración',
            path: '/configuracion'
            },
            {
            icon: 'mdi-logout',
            title: 'Cerrar Sesión',
            path: 'cerrar'
            },
            {
            icon: 'mdi-information-outline',
            title: 'Acerca de',
            path: '/about'
            }
        ],
        itemsVariant: [
            {
            icon: 'mdi-home',
            title: 'Inicio',
            path: '/'
            },
            {
            icon: 'mdi-login',
            title: 'Iniciar Sesión',
            path: '/login'
            },
            {
            icon: 'mdi-clipboard-account',
            title: 'Registrarse',
            path: '/sign-up'
            },
            {
            icon: 'mdi-information-outline',
            title: 'Acerca de',
            path: '/about'
            }
        ]
    }),
    methods: {
        logout(){
            localStorage.setItem('registered', false);
            this.$router.name == 'Home' ? $router.go(): (this.$router.push('/'), window.location.reload())
        },
        redirect(route){
            route === 'cerrar' ? this.logout() 
            :route == this.$router.history.current.path ? ""
            :this.$router.push(`${route}`)
        }
    }
    };
</script>