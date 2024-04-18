<script setup>
import ShotFinishPosition from './ShotFinishPosition.vue'
import DirectionDial from './DirectionDial.vue'
import ShapeSelector from './ShapeSelector.vue'

import ButtonGroup from '../components/ButtonGroup.vue'
import { useRoundStore } from '../stores/round'

import { VTextField, VSelect } from 'vuetify/components'

const roundStore = useRoundStore()

roundStore.$subscribe((mutation) => {
  if (mutation.events.key === 'goingForGreen' && mutation.events.newValue === 'No') {
    roundStore.setValueOnCurrentShot('result', '')
  }
})
</script>

<template>
  <h2>Long Game</h2>
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

  <ShapeSelector :label="'Intended Shot Shape'" :target="'intendedShape'" />

  <ShapeSelector :label="'Actual Shot Shape'" :target="'shape'" />

  <DirectionDial v-model="roundStore.getCurrentShot().direction" :label="'Wind Direction'" />
  <!-- <ClockBackground :style="{fill: 'white', path: 'white', width: '150px', height: '150px'}"/> -->

  <ButtonGroup
    v-model="roundStore.getCurrentShot().goingForGreen"
    :label="'Going for green?'"
    :target="'goingForGreen'"
    :options="['Yes', 'No']"
  />

  <!-- Hit Green? -->
  <ShotFinishPosition v-if="roundStore.getValueOnCurrentShot('goingForGreen') === 'yes'" />
  <ButtonGroup
    v-model="roundStore.getCurrentShot().made"
    :label="'Made shot?'"
    :target="'made'"
    :options="['Yes', 'No']"
  />

  <!-- Plan? -->
  <v-text-field
    class="form-input"
    label="Plan"
    variant="outlined"
    density="compact"
    @update:modelValue="(val) => roundStore.setValueOnCurrentShot('plan', val)"
  ></v-text-field>
  <!-- Notes -->
  <v-text-field
    class="form-input"
    label="Notes"
    variant="outlined"
    density="compact"
    @update:modelValue="(val) => roundStore.setValueOnCurrentShot('notes', val)"
  ></v-text-field>
</template>

<style scoped>
@import '../assets/shotview.css';
</style>
