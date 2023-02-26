// npm packages
import { useState, useEffect } from 'react'

// services
import * as paintService from '../../services/paintService'

// types
import { Paint } from '../../types/models'

const Paints = (): JSX.Element => {
  const [paints, setPaints] = useState<Paint[]>([])

  // useEffect((): void => {
  //   const fetchProfiles = async (): Promise<void> => {
  //     try {
  //       const profileData: Profile[] = await profileService.getAllProfiles()
  //       setProfiles(profileData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchProfiles()
  // }, [])

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

  console.log(paints)

  return (
    <>
    {paints.map((paint) => 
      <>
        <h1>{paint.name}</h1>
        <h2>{paint.color}</h2>
        <h2>{paint.pigment_code} {paint.pigment_number}</h2>
        <h2>Transparency: {paint.transparency}</h2>
        <h2>Granulation: {paint.granulation}</h2>
        <h2>Staining: {paint.staining}</h2>
      </>
    )}
    </>
  )
}

export default Paints