const API_BASE_URL = 'http://localhost:5000/api'

export const detectEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'API request failed')
    }

    return await response.json()
  } catch (error) {
    throw new Error(error.message || 'Failed to connect to backend')
  }
}