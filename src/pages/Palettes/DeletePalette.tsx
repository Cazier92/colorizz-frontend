import { useState } from "react";

import { Palette } from "../../types/models"
import { Paint } from "../../types/models"

import './RemovePaintBtn.css'

interface RemovePaintBtnProps {
  palette: Palette;
  handleDeletePalette: (palette: Palette) => void;
}

const DeletePalette = (props: RemovePaintBtnProps): JSX.Element => {
  const {palette, handleDeletePalette} = props
  const [showDelete, setShowDelete] = useState<boolean>(false)

  const toggleDeleteWarning = (): void => {
    setShowDelete(!showDelete)
  }

  const handleClick = async(evt: React.MouseEvent): Promise<void> => {
    try {
      handleDeletePalette(palette)
      setShowDelete(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <button id="delete-btn"  className='delete-palette-btn' onClick={toggleDeleteWarning}>Delete</button>
      {showDelete ? (<>
        <div className="warning-div">
          <h1>Warning</h1>
          <p>
            This will delete this palette permanently!
            <br />
            This action cannot be undone!
            <br />
            Continue?
          </p>
          <div className="delete-buttons-div">
            <button className='confirm-delete' onClick={handleClick}>Delete</button>
            <button className="cancel-delete" onClick={toggleDeleteWarning}>Cancel</button>
          </div>
        </div>
      </>) : (<></>)}
    </>
  )
}

export default DeletePalette