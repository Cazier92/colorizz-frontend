
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
import DeletePalette from './DeletePalette'

import './Palettes.css'

interface PalettesProps {
  user: User | null;
  palettes: Palette[];
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
  paintAssociated: boolean;
  handleCreatePalette: (formData: PaletteFormData) => void;
  handleDeletePalette: (palette: Palette) => void;
}

const Palettes = (props: PalettesProps): JSX.Element => {
  const {user, palettes, setPaintAssociated, paintAssociated, handleCreatePalette, handleDeletePalette} = props


  const handleRemovePaint = async(palette: Palette, paint: Paint): Promise<void> => {
    try {
      await paletteService.removePaint(palette, paint)
      setPaintAssociated(true)
    } catch (error) {
      console.log(error);
    }
  }

  // const handleClick = async(evt: React.MouseEvent): Promise<void> => {
  //   try {
  //     handleDeletePalette()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
              <>
                <h1 className='palette-name'>{palette.name}</h1>
                <DeletePalette handleDeletePalette={handleDeletePalette} palette={palette}/>
              </>
            )
            :
            (
              <>
                <h1 className='palette-name'>Palette {palette.id}</h1>
                <button className='delete-palette-btn'>Delete</button>
              </>
            )
            }
            {palette.paints?.map((paint) => 
              <>
              
              <div className='palette-paint'>
                <RemovePaintBtn palette={palette} paint={paint} handleRemovePaint={handleRemovePaint}/>
              </div>
              </>
            )}
          </div>
        )}
      </>) : (<><h1>Please Create a Palette to get Started</h1></>))}
    </main>
  )
}

export default Palettes