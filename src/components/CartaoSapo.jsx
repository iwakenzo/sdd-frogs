import './CartaoSapo.css'

function textoParaExibicao(valor) {
  if (valor === undefined || valor === null) {
    return 'não informado'
  }

  const texto = String(valor).trim()

  return texto === '' ? 'não informado' : texto
}

function CartaoSapo({ sapo }) {
  const dados = sapo ?? {}
  const campos = [
    { rotulo: 'Espécie', valor: dados.especie },
    { rotulo: 'Região encontrada', valor: dados.regiaoEncontrada },
    { rotulo: 'Período', valor: dados.periodo },
    { rotulo: 'Habitat', valor: dados.habitat },
    { rotulo: 'Observações', valor: dados.observacoes },
  ]

  return (
    <article className='cartao-sapo'>
      <h3 className='cartao-sapo-titulo'>
        {textoParaExibicao(dados.nomePopular)}
      </h3>
      <dl className='cartao-sapo-detalhes'>
        {campos.map(({ rotulo, valor }) => {
          const texto = textoParaExibicao(valor)
          const classeDescricao =
            texto === 'não informado'
              ? 'cartao-sapo-descricao campo-nao-informado'
              : 'cartao-sapo-descricao'

          return (
            <div className='cartao-sapo-linha' key={rotulo}>
              <dt className='cartao-sapo-termo'>{rotulo}</dt>
              <dd className={classeDescricao}>{texto}</dd>
            </div>
          )
        })}
      </dl>
    </article>
  )
}

export default CartaoSapo
