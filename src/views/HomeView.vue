<script setup>
import { useRouter } from 'vue-router'
import { VBtn } from 'vuetify/components'

const router = useRouter()

const addRound = () => {
  router.push('rounds/add')
}
</script>

<template>
  <main>
    <v-btn variant="outlined" @click="addRound()"> Add </v-btn>
  </main>
</template>
