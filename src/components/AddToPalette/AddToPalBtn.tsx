

import { Palette } from "../../types/models"
import { Paint } from "../../types/models";

interface AddToPalBtnProps {
  palette: Palette;
  paint: Paint;
  handleAssociatePaint: (palette: Palette, paint: Paint) => void;
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
  paintAssociated: boolean;
}

const AddToPalBtn = (props: AddToPalBtnProps): JSX.Element => {
  const {palette, paint, handleAssociatePaint, setPaintAssociated, paintAssociated} = props
  

  const handleClick = async(evt: React.MouseEvent): Promise<void> => {
    try {
      handleAssociatePaint(palette, paint)
      setPaintAssociated(!paintAssociated)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <label htmlFor="palette-button">{palette.name}</label>
    <button id="palette-button" onClick={handleClick}>Add</button>
    </>
  )
}

export default AddToPalBtn