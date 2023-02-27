import { useState } from "react";

import { Paint } from "../../types/models";
import { Palette } from "../../types/models";
import { User } from "../../types/models";

interface AddToPaletteProps {
  paint: Paint;
  palettes: Palette[];
  user: User | null;
}

const AddToPalette = (props: AddToPaletteProps): JSX.Element => {
  const {paint, palettes, user} = props




  return (
    <>
    <h5>Add to Palette</h5>
    </>
  )
}

export default AddToPalette