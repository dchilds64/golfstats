<script setup>
import { useRoundStore } from '../stores/round'
import { VBtn } from 'vuetify/components'

const model = defineModel()

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

const store = useRoundStore()

const activeButton = (option) => {
  return store.getValueOnCurrentShot(props.target) === option.toLowerCase()
}
</script>

<template>
  <div>{{ props.label }}</div>
  <v-btn
    v-for="option in props.options"
    :key="option"
    class="button"
    :class="{ 'active-button': activeButton(option) }"
    @click="model = option.toLowerCase()"
  >
    {{ option }}
  </v-btn>
</template>

<style scoped>
@import '../assets/shotview.css';

.button {
  margin: 8px;
}
</style>
