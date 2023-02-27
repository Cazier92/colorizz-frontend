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
  const {paint, palettes, user, setPalettes, setPaintAssociated, paintAssociated} = props
  const [showPalettes, setShowPalettes] = useState<boolean>(false)
  // const [form, setForm] = useState<number[]>([])

  const handleShowPalettesButton = (): void => {
    setShowPalettes(!showPalettes)
  }

  // const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(evt.target.value)
  //   console.log(evt.target.value)
  //   let newVal = parseInt(evt.target.value)
  //   form.push(newVal)
  //   console.log('FORM:', form)
  // };

  // console.log('FORM:', form)


  const handleAssociatePaint = async(palette: Palette, paint: Paint): Promise<void> => {
    try {
      paletteService.associatePaint(palette, paint)
      // const fetchPalettes = async (): Promise<void> => {
      //   try {
      //     const palettesData: Palette[] = await paletteService.getAllPalettes()
      //     setPalettes(palettesData.filter((palette) => palette.profileId === user?.profile.id))
      //     // setPalettes(palettesData)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      // fetchPalettes()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    {showPalettes ? (<>
      <button onClick={handleShowPalettesButton}>Close</button>
      {/* <form>
        {palettes.map((palette) =>
        <>
          <label htmlFor="palette-checkbox">{palette.name}</label>
          <input type="checkbox" name={palette.name} value={palette.id} id="palette-checkbox" onChange={handleChange}/>
        </>
        )}
        <button type="submit">Add</button>
      </form> */}
      {palettes.map((palette) => 
        <div>
          <AddToPalBtn palette={palette} paint={paint} handleAssociatePaint={handleAssociatePaint} setPaintAssociated={setPaintAssociated} paintAssociated={paintAssociated} key={palette.id}/>
        </div>
      )}
    </>) : (<>
      <button onClick={handleShowPalettesButton}>Add To Palette</button>
    </>)}
    </>
  )
}

export default AddToPalette