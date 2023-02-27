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
import RemovePaintBtn from './RemovePaintBtn'

interface PalettesProps {
  user: User | null;
  palettes: Palette[];
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
  paintAssociated: boolean;
}

const Palettes = (props: PalettesProps): JSX.Element => {
  const {user, palettes, setPaintAssociated, paintAssociated} = props
  // const [palettes, setPalettes] = useState<Palette[]>([])
  // const [showUpdate, setShowUpdate] = useState<boolean[]>([])


  // useEffect((): void => {
  //   const fetchPalettes = async (): Promise<void> => {
  //     try {
  //       const palettesData: Palette[] = await paletteService.getAllPalettes()
  //       setPalettes(palettesData.filter((palette) => palette.profileId === user?.profile.id))
  //       // setPalettes(palettesData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchPalettes()
  // }, [])

  const handleCreatePalette = async(formData: PaletteFormData): Promise<void> => {
    try {
      if (user !== null)
      await paletteService.createPalette(formData)
      setPaintAssociated(!paintAssociated)
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemovePaint = async(palette: Palette, paint: Paint): Promise<void> => {
    try {
      await paletteService.removePaint(palette, paint)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(palettes[1])

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
          
          <div>
            {/* <h1>{paint.name}</h1> */}
            <RemovePaintBtn palette={palette} paint={paint} handleRemovePaint={handleRemovePaint}/>
          </div>
          </>
        )}
      </>
    )}
    </>
  )
}

export default Palettes