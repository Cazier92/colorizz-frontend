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

interface PaintsProps {
  user: User | null;
  palettes: Palette[];
}

const Paints = (props: PaintsProps): JSX.Element => {
  const {user, palettes} = props
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
  }, [])

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
    {user ?  (
      <>
        <AddPaint handleAddPaint={handleAddPaint} user={user}/>
      </>
      )
    :
      (
        <>
        </>
      )
    }
    {paints.map((paint) => 
      <>
        <h1>{paint.name}</h1>
        <h2>{paint.color}</h2>
        <h2>{paint.pigment_code} {paint.pigment_number}</h2>
        <h2>Transparency: {paint.transparency}</h2>
        <h2>Granulation: {paint.granulation}</h2>
        <h2>Staining: {paint.staining}</h2>
        {paint.profileId === user?.profile.id && paint.id ?  (
      <>
        <UpdatePaint handleUpdatePaint={handleUpdatePaint} user={user} paint={paint}/>
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
        <AddToPalette palettes={palettes} paint={paint} user={user}/>
      </>) : (<> </>)}
      </>
    )}
    </>
  )
}

export default Paints