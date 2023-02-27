
import { Palette } from "../../types/models"
import { Paint } from "../../types/models"

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
    <>
    
    <label htmlFor="remove-btn">{paint.name}</label>
    <button id="remove-btn" onClick={handleClick}>X</button>
    </>
  )
}

export default RemovePaintBtn