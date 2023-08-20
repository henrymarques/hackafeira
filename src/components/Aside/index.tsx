import logo from '../../assets/Logotipo.png'

import styles from './styles.module.css'

interface ComponentProps {
  productQty: number
}

function Aside({ productQty }: ComponentProps) {
  return (
    <aside className={styles.aside}>
      <div className={styles.headerMain}>
        <img alt="Logo do Scrat" src={logo} />
        <h1>Scrat</h1>
      </div>
      <div className={styles.infos}>
        <span>Qtd. produtos</span>
        <b>{productQty}</b>
      </div>
    </aside>
  )
}

export default Aside
