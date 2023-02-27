import { useState } from "react";

import { Palette } from "../../types/models";
import { PaletteFormData } from "../../types/forms";
import { User } from "../../types/models";

interface CreatePaletteProps {
  handleCreatePalette: (formData: PaletteFormData) => void;
  user: User | null;
}


const CreatePalette = (props: CreatePaletteProps): JSX.Element => {
  const {handleCreatePalette, user} = props

  const [form, setForm] = useState<PaletteFormData>({
    name: '',
    profileId: user.profile.id,
  })

  return (
    <>
    <h1>Create Palette</h1>
    </>
  )
}

export default CreatePalette