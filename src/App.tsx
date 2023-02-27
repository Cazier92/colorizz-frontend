// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Paints from './pages/Paints/Paints'
import Palettes from './pages/Palettes/Palettes'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as paletteService from './services/paletteService'

// stylesheets
import './App.css'

// types
import { User } from './types/models'
import { Palette } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(authService.getUser())

  const [palettes, setPalettes] = useState<Palette[]>([])


  useEffect((): void => {
    const fetchPalettes = async (): Promise<void> => {
      try {
        const palettesData: Palette[] = await paletteService.getAllPalettes()
        setPalettes(palettesData.filter((palette) => palette.profileId === user?.profile.id))
        // setPalettes(palettesData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPalettes()
  }, [])

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }



  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
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
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
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
            <Paints user={user} palettes={palettes}/>
          }
        />
        <Route 
          path="/palettes"
          element={
            <ProtectedRoute user={user}>
              <Palettes user={user} palettes={palettes}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
