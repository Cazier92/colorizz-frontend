// stylesheets
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

import Logo from '../../../public/assets/paletteLogo.png'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>Colorizz</h1>
      <img src={Logo} alt="Ven Diagram of colors logo" className={styles.logo}/>
      <h3>{user ? `Hello ${user.name}` : ''}</h3>
      <div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
  </div>
    </main>
  )
}

export default Landing
