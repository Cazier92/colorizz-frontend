import { useState, useEffect } from 'react'

// services
import * as paletteService from '../../services/paletteService'

// types
import { Paint } from '../../types/models'
import { Palette } from '../../types/models'
import { User } from '../../types/models'
import { PaletteFormData } from '../../types/forms'

// components
import CreatePalette from '../../components/CreatePalette/CreatePalette'

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

  const handleCreatePalette = async(formData: PaletteFormData): Promise<void> => {
    try {
      if (user !== null)
      await paletteService.createPalette(formData)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {user
    ? 
    (
    <div>
      <CreatePalette user={user} handleCreatePalette={handleCreatePalette}/>
    </div>
    ) 
    : 
    (<> </>)}
    {palettes.map((palette) => 
      <>
        {palette.name ? (
          <h1>{palette.name}</h1>
        )
        :
        (
          <h1>Palette {palette.id}</h1>
        )
        }
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