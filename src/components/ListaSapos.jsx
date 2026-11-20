import CartaoSapo from './CartaoSapo'
import './ListaSapos.css'

function ListaSapos({ sapos = [] }) {
  return (
    <ul className="lista-sapos">
      {sapos.map((sapo) => (
        <li className="lista-sapos-item" key={sapo.id}>
          <CartaoSapo sapo={sapo} />
        </li>
      ))}
    </ul>
  )
}

export default ListaSapos
