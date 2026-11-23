import { useState } from 'react'
import { validarSapo } from '../utilitarios/validacao'
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
  const [erros, setErros] = useState({})

  function atualizarCampo(evento) {
    const { name: nome, value: valor } = evento.target

    setDados((dadosAtuais) => ({
      ...dadosAtuais,
      [nome]: valor,
    }))

    setErros((errosAtuais) => {
      const novosErros = { ...errosAtuais }
      delete novosErros[nome]

      return novosErros
    })
  }

  async function lidarComEnvio(evento) {
    evento.preventDefault()

    if (enviando) {
      return
    }

    const resultado = validarSapo(dados)

    setErros(resultado.erros)

    if (!resultado.valido) {
      return
    }

    const sucesso = await aoEnviar(resultado.dados)

    if (sucesso === true) {
      setDados({ ...dadosIniciais })
      setErros({})
    }
  }

  return (
    <form
      className='formulario-sapo'
      onSubmit={lidarComEnvio}
      noValidate
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
          required
          aria-invalid={Boolean(erros.nomePopular)}
          aria-describedby={erros.nomePopular ? 'erro-nome-popular' : undefined}
        />
        {erros.nomePopular && (
          <p id='erro-nome-popular' className='formulario-sapo-erro' role='alert'>
            {erros.nomePopular}
          </p>
        )}
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
          required
          aria-invalid={Boolean(erros.especie)}
          aria-describedby={erros.especie ? 'erro-especie' : undefined}
        />
        {erros.especie && (
          <p id='erro-especie' className='formulario-sapo-erro' role='alert'>
            {erros.especie}
          </p>
        )}
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
          required
          aria-invalid={Boolean(erros.regiaoEncontrada)}
          aria-describedby={
            erros.regiaoEncontrada ? 'erro-regiao-encontrada' : undefined
          }
        />
        {erros.regiaoEncontrada && (
          <p id='erro-regiao-encontrada' className='formulario-sapo-erro' role='alert'>
            {erros.regiaoEncontrada}
          </p>
        )}
      </div>

      <div className='formulario-sapo-campo'>
        <label htmlFor='periodo'>Período de atividade</label>
        <select
          id='periodo'
          name='periodo'
          value={dados.periodo}
          onChange={atualizarCampo}
          aria-invalid={Boolean(erros.periodo)}
          aria-describedby={erros.periodo ? 'erro-periodo' : undefined}
        >
          <option value=''>Não informado</option>
          <option value='noturno'>Noturno</option>
          <option value='diurno'>Diurno</option>
          <option value='crepuscular'>Crepuscular</option>
        </select>
        {erros.periodo && (
          <p id='erro-periodo' className='formulario-sapo-erro' role='alert'>
            {erros.periodo}
          </p>
        )}
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
          aria-invalid={Boolean(erros.habitat)}
          aria-describedby={erros.habitat ? 'erro-habitat' : undefined}
        />
        {erros.habitat && (
          <p id='erro-habitat' className='formulario-sapo-erro' role='alert'>
            {erros.habitat}
          </p>
        )}
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
          aria-invalid={Boolean(erros.observacoes)}
          aria-describedby={erros.observacoes ? 'erro-observacoes' : undefined}
        />
        {erros.observacoes && (
          <p id='erro-observacoes' className='formulario-sapo-erro' role='alert'>
            {erros.observacoes}
          </p>
        )}
      </div>

      <button type='submit' disabled={enviando}>
        {enviando ? 'Cadastrando...' : 'Cadastrar sapo'}
      </button>
    </form>
  )
}

export default FormularioSapo
