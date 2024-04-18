<script setup>
import { ref, onMounted } from 'vue'
import ClockBackground from './icons/ClockBackground.vue'
let angle = ref(0)
const degrees = ref(0)

const centerPoint = ref({ x: 0, y: 0 })
const clickPoint = ref({ x: 0, y: 0 })
const handlePoint = ref({ x: 0, y: 0 })
const calc = ref(0)

const model = defineModel()

const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

onMounted(() => {
  updateCenterPoint()
  window.addEventListener('scroll', updateCenterPoint)
})

const updateCenterPoint = () => {
  const container = document.getElementById('dialContainer')
  const containerRect = container.getBoundingClientRect()

  centerPoint.value.x = Math.floor(containerRect.left + containerRect.width / 2 + window.scrollX)
  centerPoint.value.y = Math.floor(containerRect.top + containerRect.height / 2 + window.scrollY)
}

const updateMousePosition = (event) => {
  clickPoint.value.x = event.clientX + window.scrollX
  clickPoint.value.y = event.clientY + window.scrollY

  calculateAngle()
}

const calculateAngle = () => {
  const handle = document.getElementById('dialHandle')
  const handleRect = handle.getBoundingClientRect()

  handlePoint.value.x = Math.floor(handleRect.left + handleRect.width / 2 + window.scrollX)
  handlePoint.value.y = Math.floor(handleRect.top + handleRect.height / 2 + window.scrollY)

  const currVector = {
    x: handlePoint.value.x - centerPoint.value.x,
    y: handlePoint.value.y - centerPoint.value.y
  }
  const newVector = {
    x: clickPoint.value.x - centerPoint.value.x,
    y: clickPoint.value.y - centerPoint.value.y
  }

  let angleDiff = Math.atan2(newVector.y, newVector.x) - Math.atan2(currVector.y, currVector.x)

  // Normalize the angle to be within [-π, π]
  if (angleDiff < -Math.PI) {
    angleDiff += 2 * Math.PI
  } else if (angleDiff > Math.PI) {
    angleDiff -= 2 * Math.PI
  }

  // Update the total angle
  angle.value += angleDiff
  degrees.value = angle.value * (180 / Math.PI)
}

const calculateDirection = () => {
  const deg = (360 + degrees.value) % 360
  const increment = 360 / 12
  let direction = Math.round(deg / increment)
  if (direction === 0) {
    direction = 12
  }

  const radiansIncrement = increment * (Math.PI / 180)
  angle.value = direction * radiansIncrement
  model.value = direction
}

const handleMouseDown = (event) => {
  updateMousePosition(event)
  document.addEventListener('mousemove', updateMousePosition)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseUp = () => {
  document.removeEventListener('mousemove', updateMousePosition)
  document.removeEventListener('mouseup', handleMouseUp)
  calculateDirection()
}
</script>

<template>
  <div class="container">
    <div>{{ props.label }}</div>
    <ClockBackground class="background" />
    <div id="dialContainer" class="circle" :style="{ transform: 'rotate(' + angle + 'rad)' }">
      <div
        id="dialHandle"
        class="small-circle"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      ></div>
    </div>
    <div class="display">{{ model }}</div>
    <!-- <div class="debug" :style="{ top: centerPoint.y + 'px', left: centerPoint.x + 'px' }"></div>
    <div class="debug" :style="{ top: clickPoint.y + 'px', left: clickPoint.x + 'px' }"></div>
    <div class="debug" :style="{ top: handlePoint.y + 'px', left: handlePoint.x + 'px' }"></div> -->
  </div>
</template>

<style scoped>
.container {
  position: relative;
  margin-top: 16px;
}
.background {
  fill: #f4f4f4;
  stroke: f4f4f4;
  height: 150px;
  width: 150px;
}

.circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  top: 24px;
}

.small-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f4f4f4;
  position: absolute;
  top: 16px;
  left: 60px;
}

.small-circle:hover {
  cursor: pointer;
}

.display {
  color: #f4f4f4;
  position: absolute;
  top: 99px;
  left: 75px;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
}
</style>
