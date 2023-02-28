
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

const PaintCard = (props: PaintCardProps): JSX.Element => {
  const {paint, handleUpdatePaint, user, palettes, setPalettes, setPaintAssociated, paintAssociated} = props


  return (
    <>
    <div className="paint-card">
      <h1>{paint.name}</h1>
      <h2>{paint.color}</h2>
      <h2>{paint.pigment_code} {paint.pigment_number}</h2>
      <h2>Transparency: {paint.transparency}</h2>
      <h2>Granulation: {paint.granulation}</h2>
      <h2>Staining: {paint.staining}</h2>
      {paint.profileId === user?.profile.id && paint.id ?  (
      <>
        <UpdatePaint handleUpdatePaint={handleUpdatePaint} user={user} paint={paint} key={paint.profileId}/>
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