// services
import * as tokenService from './tokenService'

// types

import { Paint } from '../types/models'
import { PaintFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/paints`

async function getAllPaints(): Promise<Paint[]> {
  try {
    const res = await fetch(BASE_URL)
    return await res.json() as Paint[]
  } catch (error) {
    throw error
  }
}

async function addPaint(formData: PaintFormData): Promise<Paint> {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as Paint
  } catch (error) {
    throw error
  }
}

async function updatePaint(formData:PaintFormData, paintId: Paint["id"]): Promise<Paint> {
  try {
    const res = await fetch(`${BASE_URL}/paintId`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as Paint
  } catch (error) {
    throw error
  }
}

export {
  getAllPaints,
  addPaint,
}