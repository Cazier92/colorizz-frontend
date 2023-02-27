import { useState } from "react";

import { Palette } from "../../types/models";
import { PaletteFormData } from "../../types/forms";
import { User } from "../../types/models";

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
    // console.log(evt.target.value)
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
    <>
    <h5>Create New Palette:</h5>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Palette Name" name="name" required value={form.name} onChange={handleChange}/>
      <button type="submit">Create</button>
    </form>
    </>
  )
}

export default CreatePalette