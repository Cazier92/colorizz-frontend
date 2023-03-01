
import { Paint } from "../../types/models"
import { Palette } from "../../types/models"
import { PaintFormData } from "../../types/forms";
import { User } from "../../types/models";

import UpdatePaint from "../../components/UpdatePaint/UpdatePaint";
import AddToPalette from "../../components/AddToPalette/AddToPalette";

import './PaintCard.css'

interface PaintCardProps {
  paint: Paint;
  handleUpdatePaint: (formData: PaintFormData, paint: Paint) => void;
  user: User | null;
  palettes: Palette[];
  setPalettes: React.Dispatch<React.SetStateAction<Palette[]>>;
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
  paintAssociated: boolean;
}

const decideBoxColor = (paint: Paint): string => {
  if (paint.color === 'Red') {
    return '#FF3014 0px 0px 18px'
  }
  if (paint.color === 'Orange') {
    return '#FEB800 0px 0px 15px'
  }
  if (paint.color === 'Yellow') {
    return '#E4FF1A 0px 0px 15px'
  }
  if (paint.color === 'Green') {
    return '#6EEB83 0px 0px 20px'
  }
  if (paint.color === 'Blue') {
    return '#1BE7FF 0px 0px 15px'
  }
  if (paint.color === 'Violet') {
    return '#BB7EFE 0px 0px 25px'
  }
  if (paint.color === 'Magenta') {
    return '#E40066 0px 0px 15px'
  }
  if (paint.color === 'Earth') {
    return '#FEB47E 0px 0px 20px'
  }
  if (paint.color === 'Black') {
    return '#000000 0px 0px 18px'
  }
  if (paint.color === 'White') {
    return '#FFFFFF 0px 0px 15px'
  }
  if (paint.color === 'Metalic/Other') {
    return '#1EA896 0px 0px 15px'
  }
  else {
    return '#1BE7FF 0px 0px 15px'
  }
}

const decideBorderColor = (paint: Paint): string => {
  if (paint.color === 'Red') {
    return '#FF3014 3px solid'
  }
  if (paint.color === 'Orange') {
    return '#FEB800 3px solid'
  }
  if (paint.color === 'Yellow') {
    return '#E4FF1A 3px solid'
  }
  if (paint.color === 'Green') {
    return '#6EEB83 3px solid'
  }
  if (paint.color === 'Blue') {
    return '#1BE7FF 3px solid'
  }
  if (paint.color === 'Violet') {
    return '#BB7EFE 3px solid'
  }
  if (paint.color === 'Magenta') {
    return '#E40066 3px solid'
  }
  if (paint.color === 'Earth') {
    return '#DEA47E 3px solid'
  }
  if (paint.color === 'Black') {
    return '#000000 3px solid'
  }
  if (paint.color === 'White') {
    return '#FFFFFF 3px solid'
  }
  if (paint.color === 'Metalic/Other') {
    return '#1EA896 3px solid'
  }
  else {
    return '#1BE7FF 3px solid'
  }
}

const transparency = (paint: Paint): number | undefined => {
  if (paint.transparency !== undefined)
  return paint.transparency +1
}
const granulation = (paint: Paint): number | undefined => {
  if (paint.granulation !== undefined)
  return paint.granulation +1
}
const staining = (paint: Paint): number | undefined => {
  if (paint.staining !== undefined)
  return paint.staining +1
}

const romanNumeral = (x: number | undefined) => {
  if (x === 1) {
    return 'I'
  }
  if (x === 2) {
    return 'II'
  }
  if (x === 3) {
    return 'III'
  }
  if (x === 4) {
    return 'IV'
  }
  if (x === 5) {
    return 'V'
  }
}

const modifyColor = (paint: Paint): string => {
  if (paint.color === 'Black') {
    return 'Black/Grey'
  } else {
    return paint.color
  }
}

const PaintCard = (props: PaintCardProps): JSX.Element => {
  const {paint, handleUpdatePaint, user, palettes, setPalettes, setPaintAssociated, paintAssociated} = props


  return (
    <>
    <div className="paint-card" style={{ boxShadow: decideBoxColor(paint), border: decideBorderColor(paint)}}>
      <h1 className="paint-name">{paint.name}</h1>
      <div className="color-stats">
        <h2 className="color">{modifyColor(paint)}:</h2>
        <h2 className="color">{paint.pigment_code} {paint.pigment_number}</h2>
      </div>
      <div className="paint-stats">
        <h2 className="stat">Transparency: {romanNumeral(transparency(paint))}</h2>
        <h2 className="stat">Granulation: {romanNumeral(granulation(paint))}</h2>
        <h2 className="stat">Staining: {romanNumeral(staining(paint))}</h2>
      </div>
      <h2 className="brand">Brand: {paint.brand}</h2>
      {paint.profileId === user?.profile.id && paint.id ?  (
      <>
        <UpdatePaint handleUpdatePaint={handleUpdatePaint} user={user} paint={paint} key={paint.profileId} setPaintAssociated={setPaintAssociated}/>
      </>
      )
    :
      (
        <>
        </>
      )
    }
    {user ? (
      <>
        <AddToPalette palettes={palettes} paint={paint} user={user} setPalettes={setPalettes} setPaintAssociated={setPaintAssociated} paintAssociated={paintAssociated} key={paint.name}/>
      </>) : (<> </>)}

    </div>
    </>
  )
}

export default PaintCard