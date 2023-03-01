import { useState } from "react";

import { Paint } from "../../types/models";
import { PaintFormData } from "../../types/forms";
import { User } from "../../types/models";

interface AddPaintProps {
  handleAddPaint: (formData: PaintFormData) => void;
  user: User;
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
}

import './AddPaint.css'

const AddPaint = (props: AddPaintProps): JSX.Element => {
  const {handleAddPaint, user, setPaintAssociated} = props
  const [showAdd, setShowAdd] = useState<boolean>(false)

  const [form, setForm] = useState<PaintFormData>({
    name: '',
    pigment_code: 'PR',
    pigment_number: 0,
    color: '',
    transparency: 0,
    staining: 0,
    granulation: 0,
    brand: '',
    profileId: user.profile.id,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(evt.target.value)
    setForm({ ...form, [evt.target.name]: evt.target.value });
    console.log(form)
  };

  const handleSubmit = async(evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault()
    console.log(form)
    try {
      handleAddPaint(form)
      // setForm({
      //   name: '',
      //   color: '',
      //   pigment_number: 0,
      //   brand: undefined,
      //   profileId: user.profile.id,
      // })
      setShowAdd(false)
      setPaintAssociated(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = (): void => {
    setShowAdd(!showAdd)
  }

  return (
    <>
    {showAdd ? (<>
    <div className="add-paint-card">
      <h3>Add a Paint:</h3>
      <button onClick={handleClick} className='hide-button'>Hide</button>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Paint Name" name="name" required value={form.name} onChange={handleChange}/>
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
        <label htmlFor="brand-input">Brand:</label>
        <input type="text" name="brand" placeholder="Brand Name" value={form.brand} onChange={handleChange} id='brand-input'/>
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
        <button type="submit" className="submit-button">SUBMIT</button>
      </form>
    </div>
    
    </>) : (<>
      <div className="button-div">
        <button onClick={handleClick} className='add-paint-btn'>Add Paint</button>
      </div>
    </>)}
    </>
  )
}

export default AddPaint