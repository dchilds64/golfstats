<script setup>
import TargetQuadrantSelector from './TargetQuadrantSelector.vue'
import DirectionDial from './DirectionDial.vue'
import { useRoundStore } from '@/stores/round'

const roundStore = useRoundStore()
</script>

<template>
  <h2>Putt</h2>
  <div>Putt Result</div>
  <TargetQuadrantSelector
    :target="'result'"
    :positiveResult="'made'"
    :outerRadius="150"
    :innerRadius="20"
    :round="true"
  />
  <DirectionDial v-model="roundStore.getCurrentShot().direction" :label="'Putt Break Direction'" />
</template>

<style scoped>
@import '../assets/shotview.css';
</style>
