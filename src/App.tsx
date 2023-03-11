// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Paints from './pages/Paints/Paints'
import Palettes from './pages/Palettes/Palettes'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as paletteService from './services/paletteService'
import * as profileService from './services/profileService'

// stylesheets
import './App.css'

// types
import { User } from './types/models'
import { Palette } from './types/models'
import { PaletteFormData } from './types/forms'
import { Profile } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(authService.getUser())

  const [palettes, setPalettes] = useState<Palette[]>([])
  const [paintAssociated, setPaintAssociated] = useState<boolean>(false)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [userProfile, setUserProfile] = useState<Profile>()


  useEffect((): void => {
    const fetchPalettes = async (): Promise<void> => {
      try {
        const palettesData: Palette[] = await paletteService.getAllPalettes()
        setPalettes(palettesData.filter((palette) => palette.profileId === user?.profile.id))
      } catch (error) {
        console.log(error)
      }
    }
    fetchPalettes()
    if (paintAssociated === true) {
      fetchPalettes()
      setPaintAssociated(false)
    }
  }, [paintAssociated])

  useEffect((): void => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const profileData: Profile[] = await profileService.getAllProfiles()
        setProfiles(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfiles()
  }, [])

  useEffect((): void => {
    const findUserProfile = (profiles: Profile[]): void => {
      if (user !== null) {
        setUserProfile(profiles.find(profile => profile.userId === user.profile.id))
      }
    }
    findUserProfile(profiles)
  }, [profiles])


  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  const handleCreatePalette = async(formData: PaletteFormData): Promise<void> => {
    try {
      if (user !== null)
      await paletteService.createPalette(formData)
      setPaintAssociated(true)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePalette = async(palette: Palette): Promise<void> => {
    try {
      if (user !== null)
      await paletteService.deletePalette(palette)
      setPaintAssociated(true)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} userProfile={userProfile}/>
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/paints"
          element={
            <Paints user={user} palettes={palettes} setPalettes={setPalettes} setPaintAssociated={setPaintAssociated} paintAssociated={paintAssociated}/>
          }
        />
        <Route 
          path="/palettes"
          element={
            <ProtectedRoute user={user}>
              <Palettes user={user} palettes={palettes} paintAssociated={paintAssociated} setPaintAssociated={setPaintAssociated} handleCreatePalette={handleCreatePalette} handleDeletePalette={handleDeletePalette}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
