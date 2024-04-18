<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value
})
const emit = defineEmits(['option-selected'])
</script>

<template>
  <v-radio-group inline label="Above/Below Feet">
    <v-radio label="Above" value="above" color="#2fce61"></v-radio>
    <v-radio label="Below" value="below" color="#2fce61"></v-radio>
  </v-radio-group>
</template>
