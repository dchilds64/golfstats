<script setup>
import ShotView from './ShotView.vue'
import { useRoundStore } from '../stores/round'

import { ref } from 'vue'
import { VBtn, VTextField } from 'vuetify/components'

const store = useRoundStore()

const roundStarted = ref(false)
const addShotActive = ref(false)

const handleTextFieldChange = (val, target) => {
  store.currentRound[target] = val
}

const handleStartRoundClick = () => {
  store.addRound()
  store.addHole()
  roundStarted.value = true
}
</script>

<template>
  <div>
    <div v-if="!roundStarted">
      <v-text-field
        :label="'Course'"
        @change="(event) => handleTextFieldChange(event.target._value, 'courseName')"
      />
      <v-text-field
        :label="'Date'"
        @change="(event) => handleTextFieldChange(event.target._value, 'date')"
      />
      <v-text-field
        :label="'Temperature'"
        @change="(event) => handleTextFieldChange(event.target._value, 'temperature')"
      />
      <v-text-field
        :label="'Tees'"
        @change="(event) => handleTextFieldChange(event.target._value, 'tees')"
      />

      <v-btn @click="handleStartRoundClick"> Start Round </v-btn>
    </div>
    <div v-else>
      <ShotView />
    </div>
    <!-- <v-btn @click="addShotActive = !addShotActive">Add Shot</v-btn> -->
  </div>
</template>
