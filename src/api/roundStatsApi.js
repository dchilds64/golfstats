const url = 'http://localhost:8080/rounds'

export async function makeAddRoundCall(round) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(round)
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error('There was an issue.')
  }
  const data = await response.json()
  return data
}

export async function makeAddShotCall(shot) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shot)
  }

  const response = await fetch(`${url}/${shot.roundId}/shots`, options)
  if (!response.ok) {
    throw new Error('There was an issue.')
  }
  const data = await response.json()
  return data
}
