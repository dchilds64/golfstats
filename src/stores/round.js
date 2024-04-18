import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { makeAddRoundCall, makeAddShotCall } from '@/api/roundStatsApi.js'

export const useRoundStore = defineStore('round', () => {
  const rounds = ref([])

  const currentRound = ref({ holes: [] })
  const activeHole = ref(0)
  const activeShot = ref(0)

  // const checkSetValue = (target, value) => {
  //   return round.value[]
  // }

  async function addRound() {
    const round = currentRound.value
    const body = {
      course: round.courseName,
      date: new Date(round.date),
      temperature: round.temperature,
      tees: round.tees
    }

    const roundId = await makeAddRoundCall(body)
    currentRound.value.id = roundId
  }

  function addHole() {
    const newShot = { num: 1, roundId: currentRound.value.id }
    currentRound.value.holes.push({ shots: [newShot] })
    activeHole.value = currentRound.value.holes.length - 1
    activeShot.value = 0
  }

  async function addShot() {
    const shot = getCurrentShot()
    shot.roundId = currentRound.value.id
    shot.distance = Number(shot.distance)
    shot.goingForGreen = shot.goingForGreen === 'yes' ? 'true' : 'false'
    shot.made = shot.made === 'yes' ? 'true' : 'false'
    shot.penalty = shot.penalty === 'yes' ? 'true' : 'false'
    const shotId = await makeAddShotCall(shot)
    shot.id = shotId

    const shots = currentRound.value.holes[currentRound.value.holes.length - 1].shots
    const newShot = {
      num: shots.length + 1,
      roundId: currentRound.value.id
    }
    shots.push(newShot)
    currentRound.value.holes[currentRound.value.holes.length - 1].shots = shots
    activeShot.value++
  }

  function setValueOnCurrentShot(target, val) {
    const currentShot = getCurrentShot()

    currentShot[target] = val
  }

  function setGoingForGreen(val) {
    const numHoles = currentRound.value.holes.length
    const currentHole = currentRound.value.holes[numHoles - 1]
    const numShots = currentHole.shots.length
    const currentShot = currentHole.shots[numShots - 1]

    currentShot.goingForGreen = val
    if (val === 'No') {
      currentShot.result = ''
    }
  }

  function getValueOnCurrentShot(target) {
    const hole = currentRound.value.holes[currentRound.value.holes.length - 1]
    const shot = hole.shots[hole.shots.length - 1]

    return shot[target]
  }

  function getCurrentShot() {
    const hole = getCurrentHole()
    const shot = hole.shots[activeShot.value]

    return shot
  }

  function getCurrentHole() {
    return currentRound.value.holes[activeHole.value]
  }

  return {
    rounds,
    activeHole,
    activeShot,
    currentRound,
    addRound,
    setValueOnCurrentShot,
    getValueOnCurrentShot,
    getCurrentShot,
    getCurrentHole,
    addHole,
    addShot
  }
})
