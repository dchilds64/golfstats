<script setup>
import { useRoundStore } from '../stores/round.js'
import PushDrawIcon from '../components/icons/PushDrawIcon.vue'
import PullFadeIcon from '../components/icons/PullFadeIcon.vue'
import PullIcon from '../components/icons/PullIcon.vue'
import PushIcon from '../components/icons/PushIcon.vue'
import StraightDrawIcon from '../components/icons/StraightDrawIcon.vue'
import StraightFadeIcon from '../components/icons/StraightFadeIcon.vue'
import StraightIcon from '../components/icons/StraightIcon.vue'

import { VBtn } from 'vuetify/components'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  }
})

const roundStore = useRoundStore()

const activeShapeButton = (shape) => {
  return roundStore.getCurrentShot()[props.target] === shape
}
</script>

<template>
  <!-- Shape -->
  <div>{{ props.label }}</div>
  <v-btn
    size="small"
    icon
    :class="{ 'active-button': activeShapeButton('pull') }"
    @click="(val) => roundStore.setValueOnCurrentShot(props.target, 'pull')"
  >
    <PullIcon />
  </v-btn>
  <v-btn
    size="small"
    icon
    :class="{ 'active-button': activeShapeButton('pull_fade') }"
    @click="(val) => roundStore.setValueOnCurrentShot(props.target, 'pull_fade')"
  >
    <PullFadeIcon />
  </v-btn>
  <v-btn
    size="small"
    icon
    :class="{ 'active-button': activeShapeButton('straight_fade') }"
    @click="(val) => roundStore.setValueOnCurrentShot(props.target, 'straight_fade')"
  >
    <StraightFadeIcon />
  </v-btn>

  <v-btn
    size="small"
    icon
    :class="{ 'active-button': activeShapeButton('straight') }"
    @click="(val) => roundStore.setValueOnCurrentShot(props.target, 'straight')"
  >
    <StraightIcon />
  </v-btn>
  <v-btn
    size="small"
    icon
    :class="{ 'active-button': activeShapeButton('straight_draw') }"
    @click="(val) => roundStore.setValueOnCurrentShot(props.target, 'straight_draw')"
  >
    <StraightDrawIcon />
  </v-btn>
  <v-btn
    size="small"
    icon
    :class="{ 'active-button': activeShapeButton('push_draw') }"
    @click="(val) => roundStore.setValueOnCurrentShot(props.target, 'push_draw')"
  >
    <PushDrawIcon />
  </v-btn>
  <v-btn
    size="small"
    icon
    :class="{ 'active-button': activeShapeButton('push') }"
    @click="(val) => roundStore.setValueOnCurrentShot(props.target, 'push')"
  >
    <PushIcon />
  </v-btn>
</template>

<style scoped>
@import '../assets/shotview.css';
</style>
