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

import './Palettes.css'

interface PalettesProps {
  user: User | null;
  palettes: Palette[];
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
  paintAssociated: boolean;
  handleCreatePalette: (formData: PaletteFormData) => void;
}

const Palettes = (props: PalettesProps): JSX.Element => {
  const {user, palettes, setPaintAssociated, paintAssociated, handleCreatePalette} = props
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



  const handleRemovePaint = async(palette: Palette, paint: Paint): Promise<void> => {
    try {
      await paletteService.removePaint(palette, paint)
      setPaintAssociated(true)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(palettes[1])

  return (
    <main className='palettes-main'>
      {user
      ? 
      (
        <div className='create-palette-div'>
          <CreatePalette user={user} handleCreatePalette={handleCreatePalette}/>
        </div>
      ) 
      : 
      (<> </>)}
      {(palettes.length ? (<>
        {palettes.map((palette) => 
          <div className='palette-card'>
            {palette.name ? (
              <h1 className='palette-name'>{palette.name}</h1>
            )
            :
            (
              <h1 className='palette-name'>Palette {palette.id}</h1>
            )
            }
            {palette.paints?.map((paint) => 
              <>
              
              <div className='palette-paint'>
                {/* <h1>{paint.name}</h1> */}
                <RemovePaintBtn palette={palette} paint={paint} handleRemovePaint={handleRemovePaint}/>
              </div>
              </>
            )}
          </div>
        )}
      </>) : (<><h1>Loading...</h1></>))}
    </main>
  )
}

export default Palettes