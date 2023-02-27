import { useState, useEffect } from 'react'

// services
import * as paletteService from '../../services/paletteService'

// types
import { Paint } from '../../types/models'
import { Palette } from '../../types/models'
import { User } from '../../types/models'

// components

interface PalettesProps {
  user: User | null;
}

const Palettes = (props: PalettesProps): JSX.Element => {
  const {user} = props
  const [palettes, setPalettes] = useState<Palette[]>([])
  // const [showUpdate, setShowUpdate] = useState<boolean[]>([])


  useEffect((): void => {
    const fetchPalettes = async (): Promise<void> => {
      try {
        const palettesData: Palette[] = await paletteService.getAllPalettes()
        setPalettes(palettesData.filter((palette) => palette.profileId === user?.profile.id))
        // setPalettes(palettesData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPalettes()
  }, [])

  console.log(palettes[0])

  return (
    <>
    {palettes.map((palette) => 
      <>
        <h1>Palette</h1>
        {palette.paints?.map((paint) => 
          <>
            <h5>{paint.name}</h5>
          </>
        )}
      </>
    )}
    </>
  )
}

export default Palettes