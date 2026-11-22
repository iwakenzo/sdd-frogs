
import { useState } from 'react'
import './FormularioSapo.css'

const dadosIniciais = {
  nomePopular: '',
  especie: '',
  regiaoEncontrada: '',
  periodo: '',
  habitat: '',
  observacoes: '',
}

function FormularioSapo({ aoEnviar, enviando = false }) {
  const [dados, setDados] = useState(() => ({ ...dadosIniciais }))

  function atualizarCampo(evento) {
    const { name, value } = evento.target

    setDados((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }))
  }

  async function lidarComEnvio(evento) {
    evento.preventDefault()

    if (enviando) {
      return
    }

    const sucesso = await aoEnviar(dados)

    if (sucesso === true) {
      setDados({ ...dadosIniciais })
    }
  }

  return (
    <form
      className='formulario-sapo'
      onSubmit={lidarComEnvio}
      aria-busy={enviando}
    >
      <div className='formulario-sapo-campo'>
        <label htmlFor='nomePopular'>Nome popular</label>
        <input
          id='nomePopular'
          name='nomePopular'
          type='text'
          value={dados.nomePopular}
          onChange={atualizarCampo}
          placeholder='Ex.: Sapo-cururu'
        />
      </div>

      <div className='formulario-sapo-campo'>
        <label htmlFor='especie'>Espécie</label>
        <input
          id='especie'
          name='especie'
          type='text'
          value={dados.especie}
          onChange={atualizarCampo}
          placeholder='Ex.: Rhinella marina'
        />
      </div>

      <div className='formulario-sapo-campo'>
        <label htmlFor='regiaoEncontrada'>Região encontrada</label>
        <input
          id='regiaoEncontrada'
          name='regiaoEncontrada'
          type='text'
          value={dados.regiaoEncontrada}
          onChange={atualizarCampo}
          placeholder='Ex.: Região Norte do Brasil'
        />
      </div>

      <div className='formulario-sapo-campo'>
        <label htmlFor='periodo'>Período de atividade</label>
        <select
          id='periodo'
          name='periodo'
          value={dados.periodo}
          onChange={atualizarCampo}
        >
          <option value=''>Não informado</option>
          <option value='noturno'>Noturno</option>
          <option value='diurno'>Diurno</option>
          <option value='crepuscular'>Crepuscular</option>
        </select>
      </div>

      <div className='formulario-sapo-campo'>
        <label htmlFor='habitat'>Habitat</label>
        <input
          id='habitat'
          name='habitat'
          type='text'
          value={dados.habitat}
          onChange={atualizarCampo}
          placeholder='Ex.: Florestas, brejos e áreas úmidas'
        />
      </div>

      <div className='formulario-sapo-campo'>
        <label htmlFor='observacoes'>Observações</label>
        <textarea
          id='observacoes'
          name='observacoes'
          value={dados.observacoes}
          onChange={atualizarCampo}
          placeholder='Adicione informações complementares sobre o sapo.'
          rows={4}
        />
      </div>

      <button type='submit' disabled={enviando}>
        {enviando ? 'Cadastrando...' : 'Cadastrar sapo'}
      </button>
    </form>
  )
}

export default FormularioSapo
