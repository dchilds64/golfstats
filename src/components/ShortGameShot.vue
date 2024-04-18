<script setup>
import ButtonGroup from '../components/ButtonGroup.vue'
import LandingSpotSelector from './LandingSpotSelector.vue'
import ShortGameFinishSelector from './ShortGameFinishSelector.vue'
import { useRoundStore } from '../stores/round'

import { VSelect } from 'vuetify/components'

const roundStore = useRoundStore()
</script>

<template>
  <h2>Short Game</h2>
  <v-select
    v-model="roundStore.getCurrentShot().lie"
    class="form-input"
    label="Lie"
    :items="['Tee', 'Fairway', 'Rough', 'DeepRgh', 'Sand', 'Recovery']"
    variant="outlined"
    density="compact"
  />

  <ButtonGroup
    v-model="roundStore.getCurrentShot().aboveBelow"
    :label="'Above/Below Feet'"
    :target="'aboveBelow'"
    :options="['Above', 'Level', 'Below']"
  />

  <ButtonGroup
    v-model="roundStore.getCurrentShot().uphillDownhill"
    :label="'Uphill/Downhill'"
    :target="'uphillDownhill'"
    :options="['Uphill', 'Flat', 'Downhill']"
  />

  <!-- Wind -->

  <ButtonGroup
    v-model="roundStore.getCurrentShot().horizStrikeLoc"
    :label="'Horizontal Strike'"
    :target="'horizStrikeLoc'"
    :options="['Toe', 'Center', 'Heel']"
  />

  <ButtonGroup
    v-model="roundStore.getCurrentShot().vertStrikeLoc"
    :label="'Vertical/Ground Strike'"
    :target="'vertStrikeLoc'"
    :options="['Thin', 'Center', 'Fat']"
  />

  <LandingSpotSelector />
  <ShortGameFinishSelector />
</template>

<style scoped>
@import '../assets/shotview.css';
</style>
