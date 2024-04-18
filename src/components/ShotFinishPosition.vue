<script setup>
import { useRoundStore } from '../stores/round.js'
import { ref } from 'vue'

const store = useRoundStore()
const shotEndLoc = ref({})

const greenRadius = 100
const center = 150

const addDot = (event) => {
  const green = document.getElementById('rough-image')
  const rect = green.getBoundingClientRect()
  shotEndLoc.value.x = event.clientX - rect.left
  shotEndLoc.value.y = event.clientY - rect.top
  updateShotFinishLocation(shotEndLoc.value.x, shotEndLoc.value.y)
}

const updateShotFinishLocation = (x, y) => {
  const distanceToCenter = Math.sqrt((x - center) ** 2 + (y - center) ** 2)
  const insideCircle = distanceToCenter <= greenRadius
  let shotResult = ''

  if (insideCircle) {
    shotResult = 'Hit Green'
  } else {
    const quadrantX = x < center ? 'left' : 'right'
    const quadrantY = y < center ? 'long' : 'short'
    const quadrant = quadrantY + ' ' + quadrantX

    shotResult = quadrant
  }

  store.setValueOnCurrentShot('result', shotResult)
}
</script>

<template>
  <div>Hit Green?</div>
  <div id="rough-image" @click="addDot">
    <div ref="green" id="green-image"></div>
    <div
      v-if="shotEndLoc.x"
      class="dot"
      :style="{ left: shotEndLoc.x - 5 + 'px', top: shotEndLoc.y - 5 + 'px' }"
    ></div>
  </div>
</template>

<style scoped>
#rough-image {
  background-color: darkgreen;
  height: 300px;
  width: 300px;
  position: relative;
}

#green-image {
  background-color: #2fce61;
  height: 200px;
  width: 200px;
  border-radius: 100px;
  position: absolute;
  top: 50px;
  left: 50px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  z-index: 1000;
}
</style>
