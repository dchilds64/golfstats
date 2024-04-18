<script setup>
import { useRoundStore } from '../stores/round'
import ButtonGroup from '../components/ButtonGroup.vue'
import HoleNavigator from '../components/HoleNavigator.vue'
import LongGameShot from '../components/LongGameShot.vue'
import ShortGameShot from '../components/ShortGameShot.vue'
import Putt from '../components/Putt.vue'

import { ref, computed, reactive } from 'vue'
import {
  VTextField,
  VBtn,
  VSelect,
  VRadio,
  VRadioGroup,
  VBtnGroup,
  VBtnToggle
} from 'vuetify/components'

const roundStore = useRoundStore()

const clubSuggestions = ['9i', '8i', '7i']

const handleNextShotClicked = () => {
  const shot = roundStore.getCurrentShot()

  if (shot.result === 'made') {
    roundStore.addHole()
  } else {
    roundStore.addShot()
  }
}

const handleFinishRoundClick = () => {}

const shotType = computed(() => {
  const { club, distance } = roundStore.getCurrentShot()

  if (club === 'Putter') {
    return 'putt'
  } else if (distance < 100) {
    return 'short'
  } else if (distance >= 100) {
    return 'long'
  }

  return ''
})
</script>

<template>
  <div>
    <HoleNavigator
      v-model="roundStore.activeHole"
      :label="'Holes'"
      :holes="roundStore.currentRound.holes"
    />
    <HoleNavigator
      v-model="roundStore.activeShot"
      :label="'Shots'"
      :holes="roundStore.getCurrentHole().shots"
    />
    <v-btn @click="handleFinishRoundClick">Finish Round</v-btn>
    <v-text-field
      v-model="roundStore.getCurrentShot().distance"
      class="form-input"
      label="Shot distance"
      variant="outlined"
      density="compact"
    ></v-text-field>

    <div>
      <ButtonGroup
        v-model="roundStore.getCurrentShot().club"
        :label="'Club'"
        :target="'club'"
        :options="clubSuggestions"
      />
      <v-select
        v-model="roundStore.getCurrentShot().club"
        class="form-input"
        label="Other"
        :items="[
          'Driver',
          '3Wood',
          '3i',
          '4i',
          '5i',
          '6i',
          '7i',
          '8i',
          '9i',
          'PW',
          '54W',
          '58W',
          'Putter'
        ]"
        variant="outlined"
        density="compact"
      >
      </v-select>
    </div>

    <LongGameShot v-if="shotType === 'long'" />
    <ShortGameShot v-else-if="shotType === 'short'" />
    <Putt v-else-if="shotType === 'putt'" />
    <ButtonGroup
      v-model="roundStore.getCurrentShot().penalty"
      :label="'Penalty?'"
      :target="'penalty'"
      :options="['Yes']"
    />
    <div>
      <v-btn id="next-shot-button" @click="handleNextShotClicked"> Next Shot </v-btn>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/shotview.css';
</style>
