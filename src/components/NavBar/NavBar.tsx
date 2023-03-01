// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

import './NavBar.css'

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav>
      {user ?
        <ul>
          <li>Welcome, {user.name}</li>
          {/* <li><NavLink to="/profiles" className={'link'}>Profiles</NavLink></li> */}
          <li><NavLink to="/change-password" className={'link'}>Change Password</NavLink></li>
          <li><NavLink to="" onClick={handleLogout} className={'link'}>LOG OUT</NavLink></li>
          <li><NavLink to="/paints" className={'link'}>Paints</NavLink></li>
          <li><NavLink to="/palettes" className={'link'}>Your Palettes</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/login" className={'link'}>Log In</NavLink></li>
          <li><NavLink to="/signup" className={'link'}>Sign Up</NavLink></li>
          <li><NavLink to="/paints" className={'link'}>Paints</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
