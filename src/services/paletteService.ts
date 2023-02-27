// services
import * as tokenService from './tokenService'

// types

import { Paint } from '../types/models'
import { Palette } from '../types/models'
// import { PaintFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/palettes`

async function getAllPalettes(): Promise<Palette[]> {
  try {
    const res = await fetch(BASE_URL)
    return await res.json() as Palette[]
  } catch (error) {
    throw error
  }
}

export {

}