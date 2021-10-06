<template>
    <div class="container" style="margin-top: 20px">
        <v-card
            class="mx-auto my-12"
            max-width="374"
            style="border-radius: 15px">
            <v-card-title>
                <v-icon color="blue darken-2" size="30" style="margin-right: 10px">
                    mdi-bell-outline
                </v-icon>
                <v-toolbar-title>Notificaciones</v-toolbar-title>
            </v-card-title>
            <notification v-if="$store.state.user.notifications >= 1"/>
            <v-card-text v-if="$store.state.user.notifications.length == 0"> Aún no hay notificaciones </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Notification from '../components/Notification.vue'
export default {
    components: { Notification },
}
</script>