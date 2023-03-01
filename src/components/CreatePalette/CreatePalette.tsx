import { useState } from "react";

import { PaletteFormData } from "../../types/forms";
import { User } from "../../types/models";

import './CreatePalette.css'

interface CreatePaletteProps {
  handleCreatePalette: (formData: PaletteFormData) => void;
  user: User;
}


const CreatePalette = (props: CreatePaletteProps): JSX.Element => {
  const {handleCreatePalette, user} = props

  const [form, setForm] = useState<PaletteFormData>({
    name: '',
    profileId: user.profile.id,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async(evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault()
    try {
      handleCreatePalette(form)
      setForm({
      name: '',
      profileId: user.profile.id,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new-palette-div">
      <h5>Create New Palette:</h5>
      <form onSubmit={handleSubmit} className='new-palette-form'>
        <input type="text" placeholder="Palette Name" name="name" required value={form.name} onChange={handleChange}/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreatePalette