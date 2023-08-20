import styles from './style.module.css'
import logo from '../../assets/Logotipo.svg'

function Header() {
  return (
    <>
      <header className={styles.headerMain}>
        <img alt="Logo" src={logo} />
        <span>Scrat</span>
      </header>
    </>
  )
}

export default Header
