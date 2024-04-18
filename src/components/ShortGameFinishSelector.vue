<script setup>
import { useRoundStore } from '../stores/round.js'
import { ref } from 'vue'

const store = useRoundStore()
const shotEndLoc = ref({})

const greenRadius = 20
const center = 150

const addDot = (event) => {
  const green = document.getElementById('finish-green-image')
  const rect = green.getBoundingClientRect()
  shotEndLoc.value.x = event.clientX - rect.left
  shotEndLoc.value.y = event.clientY - rect.top
  updateShotFinishLocation(shotEndLoc.value.x, shotEndLoc.value.y)
}

const updateShotFinishLocation = (x, y) => {
  const distanceToCenter = Math.sqrt((x - center) ** 2 + (y - center) ** 2)
  const insideCircle = distanceToCenter <= greenRadius
  let result = ''

  if (insideCircle) {
    result = 'made'
  } else {
    const quadrantX = x < center ? 'left' : 'right'
    const quadrantY = y < center ? 'long' : 'short'
    const quadrant = quadrantY + ' ' + quadrantX

    result = quadrant
  }

  store.setValueOnCurrentShot('result', result)
}
</script>

<template>
  <div>Hit Landing Spot?</div>
  <div id="finish-green-image" @click="addDot">
    <div id="target-image"></div>
    <div
      v-if="shotEndLoc.x"
      class="dot"
      :style="{ left: shotEndLoc.x - 5 + 'px', top: shotEndLoc.y - 5 + 'px' }"
    ></div>
  </div>
</template>

<style scoped>
#finish-green-image {
  background-color: #2fce61;
  height: 300px;
  width: 300px;
  border-radius: 150px;
  position: relative;
}

#target-image {
  background-color: white;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  position: absolute;
  top: 130px;
  left: 130px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  z-index: 1000;
}
</style>
