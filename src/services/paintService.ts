// services
import * as tokenService from './tokenService'

// types

import { Paint } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/paints`

async function getAllPaints(): Promise<Paint[]> {
  try {
    const res = await fetch(BASE_URL)
    return await res.json() as Paint[]
  } catch (error) {
    throw error
  }
}

export {
  getAllPaints,
}