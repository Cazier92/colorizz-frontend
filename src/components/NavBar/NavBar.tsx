// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'
import { Profile } from '../../types/models';

import Logo from '../../../public/assets/paletteIcon.png'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
  userProfile: Profile | undefined;
}

import './NavBar.css'

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout, userProfile } = props
  
  return (
    <nav>
      {user ?
      
        <ul>
          {userProfile !== undefined ? (
            <li className='avatar-li'><img src={userProfile.photo} alt="user avatar" className='avatar'/></li>
          ) : (<></>)}
          <li>Welcome, {user.name}</li>
          <li><NavLink to="/change-password" className={'link'}>Change Password</NavLink></li>
          <li><NavLink to="/" className={'link-for-logo'}><img src={Logo} className='logo-link'/></NavLink></li>
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
