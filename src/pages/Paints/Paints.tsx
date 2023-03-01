// npm packages
import { useState, useEffect } from 'react'

// services
import * as paintService from '../../services/paintService'

// types
import { Paint } from '../../types/models'
import { PaintFormData } from '../../types/forms'
import { User } from '../../types/models'
import { Palette } from '../../types/models'

// components
import AddPaint from '../../components/AddPaint/AddPaint'
import UpdatePaint from '../../components/UpdatePaint/UpdatePaint'
import AddToPalette from '../../components/AddToPalette/AddToPalette'
import PaintCard from './PaintCard'

import './Paints.css'

interface PaintsProps {
  user: User | null;
  palettes: Palette[];
  setPalettes: React.Dispatch<React.SetStateAction<Palette[]>>;
  setPaintAssociated: React.Dispatch<React.SetStateAction<boolean>>;
  paintAssociated: boolean;
}

const Paints = (props: PaintsProps): JSX.Element => {
  const {user, palettes, setPalettes, setPaintAssociated, paintAssociated} = props
  const [paints, setPaints] = useState<Paint[]>([])
  // const [showUpdate, setShowUpdate] = useState<boolean[]>([])


  useEffect((): void => {
    const fetchPaints = async (): Promise<void> => {
      try {
        const paintsData: Paint[] = await paintService.getAllPaints()
        setPaints(paintsData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPaints()
    if (paintAssociated === true) {
      fetchPaints()
      setPaintAssociated(false)
    }
  }, [paintAssociated])

  // useEffect((): void => {
  //   if (paints.length) {
  //     for (let i = 0; i < paints.length; i++)
  //     setShowUpdate([...showUpdate, false])
  //   }
  //   console.log(showUpdate)
  // }, [paints])

  const handleAddPaint = async(formData: PaintFormData): Promise<void> => {
    try {
      if (user !== null) {
        // formData.profileId = user.profile.id
        // console.log(formData)
        const newPaint: Paint = {
          name: formData.name,
          color: formData.color,
          pigment_code: formData.pigment_code,
          pigment_number: formData.pigment_number,
          transparency: formData.transparency,
          staining: formData.staining,
          granulation: formData.granulation,
          brand: formData.brand,
          profileId: formData.profileId
        }
        await paintService.addPaint(formData)
        setPaints([...paints, newPaint])
        setPaintAssociated(true)
      }
    } catch (error) {
      console.log(error);
    }
  }



  const handleUpdatePaint = async(formData: PaintFormData, paint: Paint): Promise<void> => {
    try {
      if (user !== null && paint.id !== undefined) {
        const updatedPaint: Paint = {
          id: paint.id,
          name: formData.name,
          color: formData.color,
          pigment_code: formData.pigment_code,
          pigment_number: formData.pigment_number,
          transparency: formData.transparency,
          staining: formData.staining,
          granulation: formData.granulation,
          brand: formData.brand,
          profileId: formData.profileId
        }
        paintService.updatePaint(formData, paint)
        setPaints([...paints, updatedPaint])
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(paints.length)
  // console.log(showUpdate)

  return (
    <>
    <main className='paint-main'>
      {(paints.length ? (
        <>
          {user ?  (
            <div className='add-paint-div'>
              <AddPaint handleAddPaint={handleAddPaint} user={user} key={"addPaint"} setPaintAssociated={setPaintAssociated}/>
            </div>
            )
          :
            (
              <>
              </>
            )
          }
          {paints.map((paint) => 
            <div className='paint-card-div'>
              <PaintCard key={paint.id} paint={paint} handleUpdatePaint={handleUpdatePaint} user={user} palettes={palettes} setPalettes={setPalettes} setPaintAssociated={setPaintAssociated} paintAssociated={paintAssociated}/>
            </div>
          )}
        </>

      ) : (
        <h1>Loading...</h1>
      ))}
    </main>
    </>
  )
}

export default Paints