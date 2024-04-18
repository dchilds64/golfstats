<script setup>
import { VTable } from 'vuetify/components'
import { useRouter } from 'vue-router'
import { VBtn } from 'vuetify/components'

const router = useRouter()

const addRound = () => {
  router.push('rounds/add')
}

const rounds = [
  {
    date: '01/24/2024',
    course: 'Ranches',
    score: 42
  },
  {
    date: '03/17/2024',
    course: 'Ranches',
    score: 39
  },
  {
    date: '04/1/2024',
    course: 'Ranches',
    score: 50
  }
]
</script>

<template>
  <v-table id="rounds-table">
    <thead>
      <tr>
        <th class="text-left">Date</th>
        <th class="text-left">Course</th>
        <th class="text-left">Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="round in rounds" :key="round.date">
        <td>{{ round.date }}</td>
        <td>{{ round.courseName }}</td>
        <td>{{ round.score }}</td>
      </tr>
    </tbody>
    <v-btn></v-btn>
  </v-table>
  <v-btn variant="outlined" @click="addRound()"> Add Round </v-btn>
</template>

<style scoped>
#rounds-table {
}
</style>
