
import { Palette } from "../../types/models"
import { Paint } from "../../types/models"

import './RemovePaintBtn.css'

interface RemovePaintBtnProps {
  palette: Palette;
  paint: Paint;
  handleRemovePaint: (palette: Palette, paint: Paint) => void;
}

const RemovePaintBtn = (props: RemovePaintBtnProps): JSX.Element => {
  const {palette, paint, handleRemovePaint} = props


  const handleClick = async(evt: React.MouseEvent): Promise<void> => {
    try {
      handleRemovePaint(palette, paint)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="remove-paint-div">
      <label htmlFor="remove-btn" className="paint-label">{paint.name}</label>
      <button id="remove-btn" onClick={handleClick}>X</button>
    </div>
  )
}

export default RemovePaintBtn