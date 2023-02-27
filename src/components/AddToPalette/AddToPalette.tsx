import { useState } from "react";

import { Paint } from "../../types/models";
import { Palette } from "../../types/models";
import { User } from "../../types/models";

interface AddToPaletteProps {
  paint: Paint;
  palettes: Palette[];
  user: User | null;
}

const AddToPalette = (props: AddToPaletteProps): JSX.Element => {
  const {paint, palettes, user} = props
  const [showPalettes, setShowPalettes] = useState<boolean>(false)

  const handleShowPalettesButton = (): void => {
    setShowPalettes(!showPalettes)
  }

  return (
    <>
    {showPalettes ? (<>
      <button onClick={handleShowPalettesButton}>Discard Changes</button>
    </>) : (<>
      <button onClick={handleShowPalettesButton}>Add To Palette</button>
    </>)}
    </>
  )
}

export default AddToPalette