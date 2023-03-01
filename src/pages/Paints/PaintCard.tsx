
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

const colorSwatch = (paint: Paint): string => {
  if (paint.color === 'Red') {
    return 'linear-gradient(315deg, #F6511D 3%, #A3333D 38%, #D10000 68%, #F64740 98%)'
  }
  if (paint.color === 'Orange') {
    return 'linear-gradient(315deg, #DE8F6E 3%, #F45D01 38%, #E24E1B 68%, #DB995A 98%)'
  }
  if (paint.color === 'Yellow') {
    return 'linear-gradient(315deg, #FFEE88 3%, #C2E812 38%, #CEC075 68%, #B39C4D 98%)'
  }
  if (paint.color === 'Green') {
    return 'linear-gradient(315deg, #768948 3%, #1E2F23 38%, #34623F 68%, #53FF45 98%)'
  }
  if (paint.color === 'Blue') {
    return 'linear-gradient(315deg, #0D3B66 3%, #81C3D7 38%, #016FB9 68%, #1AFFD5 98%)'
  }
  if (paint.color === 'Violet') {
    return 'linear-gradient(315deg, #7D83FF 3%, #820263 38%, #291720 68%, #9046CF 98%)'
  }
  if (paint.color === 'Magenta') {
    return 'linear-gradient(315deg, #CC59D2 3%, #F487B6 38%, #F15152 68%, #FF579F 98%)'
  }
  if (paint.color === 'Earth') {
    return 'linear-gradient(315deg, #494331 3%, #FEB800 38%, #8F250C 68%, #69140E 98%)'
  }
  if (paint.color === 'Black') {
    return 'linear-gradient(315deg, #484349 3%, #000000 38%, #595457 68%, #454545 98%)'
  }
  if (paint.color === 'White') {
    return 'linear-gradient(315deg, #F1FFFA 3%, #E6E8E6 38%, #CED0CE 68%, #FFFFFF 98%)'
  }
  if (paint.color === 'Metalic/Other') {
    return 'linear-gradient(315deg, #72DDF7 3%, #B388EB 38%, #4CB944 68%, #D741A7 98%)'
  }
  else {
    return 'linear-gradient(315deg, #C2CFB2 3%, #6320EE 38%, #231F20 68%, #8075FF 98%)'
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
      <div className="color-swatch" style={{background: colorSwatch(paint), animation: 'gradient 10s ease infinite', backgroundSize: '400% 400%', backgroundAttachment: 'fixed'}}></div>
      <div>
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

    </div>
    </>
  )
}

export default PaintCard