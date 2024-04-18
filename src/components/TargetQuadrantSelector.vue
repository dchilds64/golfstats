<script setup>
import { useRoundStore } from '../stores/round.js'
import { ref, computed } from 'vue'

const store = useRoundStore()
const dotLocation = ref({})

const props = defineProps({
  outerRadius: {
    type: Number,
    required: true
  },
  innerRadius: {
    type: Number,
    required: true
  },
  outerColor: {
    type: String,
    required: false,
    default: 'darkgreen'
  },
  innerColor: {
    type: String,
    required: false,
    default: '#2fce61'
  },
  dotColor: {
    type: String,
    required: false,
    default: 'white'
  },
  target: {
    type: String,
    required: true
  },
  positiveResult: {
    type: String,
    required: true
  },
  round: {
    type: Boolean,
    required: false,
    default: false
  }
})

const addDot = (event) => {
  const background = document.getElementById(props.target + '-background')
  const rect = background.getBoundingClientRect()
  dotLocation.value.x = event.clientX - rect.left
  dotLocation.value.y = event.clientY - rect.top
  updateLocation(dotLocation.value.x, dotLocation.value.y)
}

const updateLocation = (x, y) => {
  const distanceToCenter = Math.sqrt((x - props.outerRadius) ** 2 + (y - props.outerRadius) ** 2)
  const insideCircle = distanceToCenter <= props.innerRadius
  let result = ''

  if (insideCircle) {
    result = props.positiveResult
  } else {
    const quadrantX = x < props.outerRadius ? 'left' : 'right'
    const quadrantY = y < props.outerRadius ? 'long' : 'short'
    const quadrant = quadrantY + ' ' + quadrantX

    result = quadrant
  }

  store.setValueOnCurrentShot(props.target, result)
}

const outerStyle = computed(() => {
  const style = {}
  const size = props.outerRadius * 2 + 'px'
  style.height = size
  style.width = size
  style.borderRadius = props.outerRadius
  style.backgroundColor = props.outerColor
  style.position = 'relative'

  if (props.round) {
    style.borderRadius = props.outerRadius + 'px'
  }
  return style
})

const innerStyle = computed(() => {
  const { outerRadius, innerRadius } = props
  const style = {}
  const size = innerRadius * 2 + 'px'
  style.height = size
  style.width = size
  style.borderRadius = props.inner
  style.top = outerRadius - innerRadius + 'px'
  style.left = outerRadius - innerRadius + 'px'
  style.backgroundColor = props.innerColor
  style.borderRadius = innerRadius + 'px'
  style.position = 'absolute'

  return style
})

const dotStyle = computed(() => {
  const style = {}
  style.left = dotLocation.value.x - 5 + 'px'
  style.top = dotLocation.value.y - 5 + 'px'
  style.backgroundColor = props.dotColor

  return style
})
</script>

<template>
  <div :id="props.target + '-background'" @click="addDot" :style="outerStyle">
    <div :style="innerStyle"></div>
    <div v-if="dotLocation.x" class="dot" :style="dotStyle"></div>
  </div>
</template>

<style scoped>
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  z-index: 1000;
}
</style>
