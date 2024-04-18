<script setup>
import { VBtn } from 'vuetify/components'
const model = defineModel()
const props = defineProps({
  holes: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const isActiveHole = (index) => {
  return model.value === index
}
</script>

<template>
  <div class="navigator-container">
    <span> {{ props.label }}</span>
    <div v-if="props.holes.length >= 0">
      <v-btn
        v-for="(hole, index) in props.holes"
        :key="index"
        icon
        :size="'x-small'"
        class="item"
        :class="{ selected: isActiveHole(index) }"
        @click="model = index"
      >
        {{ index + 1 }}</v-btn
      >
    </div>
  </div>
</template>

<style scoped>
.selected {
  background-color: #2fce61;
}

.navigator-container {
  display: flex;
  margin: 5px;
}

.item {
  margin-left: 5px;
}
</style>
