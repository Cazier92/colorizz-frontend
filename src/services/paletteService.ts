// services
import * as tokenService from './tokenService'

// types

import { Paint } from '../types/models'
import { Palette } from '../types/models'
import { PaletteFormData } from '../types/forms'
// import { PaintFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/palettes`

async function getAllPalettes(): Promise<Palette[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
    return await res.json() as Palette[]
  } catch (error) {
    throw error
  }
}

async function createPalette(formData: PaletteFormData): Promise<Palette> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as Palette
  } catch (error) {
    throw error
  }
}

async function associatePaint(palette: Palette, paint: Paint): Promise<Palette> {
  try {
    const paletteId = palette.id
    const paintId = paint.id
    const res = await fetch(`${BASE_URL}/${paletteId}/paints/${paintId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
    })
    return await res.json() as Palette
  } catch (error) {
    throw error
  }
}

async function removePaint(palette: Palette, paint: Paint): Promise<Palette> {
  try {
    const paletteId = palette.id
    const paintId = paint.id
    const res = await fetch(`${BASE_URL}/${paletteId}/paints/${paintId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
    })
    return await res.json() as Palette
  } catch (error) {
    throw error
  }
}

async function deletePalette(palette: Palette): Promise<Palette> {
  try {
    const paletteId = palette.id
    const res = await fetch(`${BASE_URL}/${paletteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      }
    })
    return await res.json() as Palette
  } catch (error) {
    throw error
  }
}

export {
  getAllPalettes,
  createPalette,
  associatePaint,
  removePaint,
  deletePalette,
}