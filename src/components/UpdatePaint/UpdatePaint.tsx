import { useState } from "react";

import { Paint } from "../../types/models";
import { PaintFormData } from "../../types/forms";
import { User } from "../../types/models";

interface UpdatePaintProps {
  handleUpdatePaint: (formData: PaintFormData, paint: Paint) => void;
  user: User
  paint: Paint
}



const UpdatePaint = (props: UpdatePaintProps): JSX.Element => {
  const {handleUpdatePaint, user, paint} = props
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
    // console.log(evt.target.value)
    setForm({ ...form, [evt.target.name]: evt.target.value });
    // console.log(form)
  };

  const handleSubmit = async(evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault()
    // console.log(form)
    try {
      handleUpdatePaint(form, paint)

    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateButton = (): void => {
    setShowUpdate(!showUpdate)
  }
  
  if (showUpdate === false) {
    return (
      <button onClick={handleUpdateButton}>Update Paint</button>
    )
  } else {
    return (
      <>
        <h3>Update Paint:</h3>
        <button onClick={handleUpdateButton}>Discard Changes</button>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" required value={form.name} onChange={handleChange} />
          <select required name="color" id="color-select" value={form.color} onChange={handleChange}>
            {/* <option value={form.color}>{form.color}</option> */}
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
            {/* <option value={form.pigment_code}>{form.pigment_code}</option> */}
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
          <label htmlFor="pigment_number-input">Pigment Number:</label>
          <input type="number" name="pigment_number" id="pigment_number-input" value={form.pigment_number} onChange={handleChange}/>
          <input type="text" name="brand" placeholder="Brand Name" value={form.brand} onChange={handleChange}/>
          <label htmlFor="transparency-select">Transparency: (0=Opaque, 4=Transparent)</label>
          <select name="transparency" id="transparency-select" value={form.transparency} onChange={handleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="staining-select">Staining: (0=Non-Staining, 4=Heavily-Staining)</label>
          <select name="staining" id="staining-select" value={form.staining} onChange={handleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="granulation-select">Granulation: (0=Smooth, 4=Heavy Granulation)</label>
          <select name="granulation" id="granulation-select" value={form.granulation} onChange={handleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button type="submit">SUBMIT</button>
        </form>
      </>
    )
  }
}

export default UpdatePaint