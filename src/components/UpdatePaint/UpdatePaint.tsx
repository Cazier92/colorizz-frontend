import { useState } from "react";

import { Paint } from "../../types/models";
import { PaintFormData } from "../../types/forms";
import { User } from "../../types/models";

import './UpdatePaint.css'

interface UpdatePaintProps {
  handleUpdatePaint: (formData: PaintFormData, paint: Paint) => void;
  user: User;
  paint: Paint;
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
}



const UpdatePaint = (props: UpdatePaintProps): JSX.Element => {
  const {handleUpdatePaint, paint, setPaintAssociated} = props
  const [showUpdate, setShowUpdate] = useState<boolean>(false)

  const [form, setForm] = useState<PaintFormData>({
    name: paint.name,
    pigment_code: paint.pigment_code,
    pigment_number: paint.pigment_number,
    color: paint.color,
    transparency: paint.transparency,
    staining: paint.staining,
    granulation: paint.granulation,
    brand: paint.brand,
    profileId: paint.profileId,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async(evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault()
    try {
      handleUpdatePaint(form, paint)
      setPaintAssociated(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateButton = (): void => {
    setShowUpdate(!showUpdate)
  }

  if (showUpdate === false) {
    return (
      <button onClick={handleUpdateButton} className='update-btn'>Update Paint</button>
    )
  } else {
    return (
      <div className="update-paint-div">
        <h3>Update Paint:</h3>
        <button onClick={handleUpdateButton} className='discard-btn'>Discard Changes</button>
        <form onSubmit={handleSubmit} className='update-paint-form'>
          <input type="text" name="name" required value={form.name} onChange={handleChange} />
          <select required name="color" id="color-select" value={form.color} onChange={handleChange}>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Violet">Violet</option>
            <option value="Magenta">Magenta</option>
            <option value="Earth">Earth</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Metallic/Other">Metallic/Other</option>
          </select>
          <label htmlFor="pigment_code-select">Pigment Code:</label>
          <select name="pigment_code" id="pigment_code-select" value={form.pigment_code} onChange={handleChange}>
            <option value="PR">PR</option>
            <option value="PO">PO</option>
            <option value="PY">PY</option>
            <option value="PG">PG</option>
            <option value="PB">PB</option>
            <option value="PV">PV</option>
            <option value="PBr">PBr</option>
            <option value="PBk">PBk</option>
            <option value="PW">PW</option>
            <option value="PM">PM</option>
          </select>
          <label htmlFor="pigment_number-input">Pigment Number: (0 if not applicable)</label>
          <input type="number" name="pigment_number" id="pigment_number-input" value={form.pigment_number} onChange={handleChange}/>
          <input type="text" name="brand" placeholder="Brand Name" value={form.brand} onChange={handleChange}/>
          <label htmlFor="transparency-select">Transparency: (I=Opaque, V=Transparent)</label>
          <select name="transparency" id="transparency-select" value={form.transparency} onChange={handleChange}>
          <option value="0">I</option>
          <option value="1">II</option>
          <option value="2">III</option>
          <option value="3">IV</option>
          <option value="4">V</option>
          </select>
          <label htmlFor="staining-select">Staining: (I=Non-Staining, V=Heavily-Staining)</label>
          <select name="staining" id="staining-select" value={form.staining} onChange={handleChange}>
          <option value="0">I</option>
          <option value="1">II</option>
          <option value="2">III</option>
          <option value="3">IV</option>
          <option value="4">V</option>
          </select>
          <label htmlFor="granulation-select">Granulation: (I=Smooth, V=Heavy Granulation)</label>
          <select name="granulation" id="granulation-select" value={form.granulation} onChange={handleChange}>
          <option value="0">I</option>
          <option value="1">II</option>
          <option value="2">III</option>
          <option value="3">IV</option>
          <option value="4">V</option>
          </select>
          <button type="submit" className="submit-update-btn" onClick={handleUpdateButton}>SUBMIT</button>
        </form>
      </div>
    )
  }
}

export default UpdatePaint