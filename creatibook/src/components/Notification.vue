<template>
    <v-list two-line>
        <template v-for="item in $store.state.user.notifications.slice(0, 6)">
            <v-subheader
                v-if="item.header"
                :key="item.header"
            >
                {{ item.header }}
            </v-subheader>

            <v-list-item :key="item.title" link style="border-top: 1px solid lightgray">
                <v-list-item-avatar>
                    <img :src="item.avatar">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon large color="blue darken-2">mdi-dots-horizontal</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
    export default {
        data: () => ({}),
    }
</script>

