// npm packages
import { useState, useEffect } from 'react'

// services
import * as paintService from '../../services/paintService'

// types
import { Paint } from '../../types/models'
import { PaintFormData } from '../../types/forms'
import { User } from '../../types/models'

// components
import AddPaint from '../../components/AddPaint/AddPaint'

interface PaintsProps {
  user: User | null;
}

const Paints = (props: PaintsProps): JSX.Element => {
  const {user} = props
  const [paints, setPaints] = useState<Paint[]>([])


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

  const handleAddPaint = async(formData: PaintFormData): Promise<void> => {
    try {
      if (user !== null) {
        // formData.profileId = user.profile.id
        console.log(formData)
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
        paintService.addPaint(formData)
        setPaints([...paints, newPaint])

      }

    } catch (error) {
      console.log(error);
    }
  }

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
        {paint.profileId === user?.profile.id ?  (
      <>
        <button>Update Paint</button>
      </>
      )
    :
      (
        <>
        </>
      )
    }
      </>
    )}
    </>
  )
}

export default Paints