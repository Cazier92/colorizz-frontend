import { useState } from "react";

import { Paint } from "../../types/models";
import { Palette } from "../../types/models";
import { User } from "../../types/models";

import * as paletteService from '../../services/paletteService'

import AddToPalBtn from "./AddToPalBtn";

interface AddToPaletteProps {
  paint: Paint;
  palettes: Palette[];
  user: User | null;
  setPalettes: React.Dispatch<React.SetStateAction<Palette[]>>;
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
  paintAssociated: boolean;
}

const AddToPalette = (props: AddToPaletteProps): JSX.Element => {
  const {paint, palettes, setPaintAssociated, paintAssociated} = props
  const [showPalettes, setShowPalettes] = useState<boolean>(false)

  const handleShowPalettesButton = (): void => {
    setShowPalettes(!showPalettes)
  }




  const handleAssociatePaint = async(palette: Palette, paint: Paint): Promise<void> => {
    try {
      await paletteService.associatePaint(palette, paint)
      setPaintAssociated(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    {showPalettes ? (<>
      <button onClick={handleShowPalettesButton}>Close</button>
      {palettes.map((palette) => 
        <div>
          <AddToPalBtn palette={palette} paint={paint} handleAssociatePaint={handleAssociatePaint} setPaintAssociated={setPaintAssociated} paintAssociated={paintAssociated} key={palette.id} setShowPalettes={setShowPalettes}/>
        </div>
      )}
    </>) : (<>
      <button onClick={handleShowPalettesButton}>Add To Palette</button>
    </>)}
    </>
  )
}

export default AddToPalette