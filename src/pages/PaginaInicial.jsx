import { useCallback, useEffect, useRef, useState } from 'react'
import { cadastrarSapo, listarSapos } from '../api/sapos'
import FormularioSapo from '../components/FormularioSapo'
import ListaSapos from '../components/ListaSapos'
import MensagemStatus from '../components/MensagemStatus'
import './PaginaInicial.css'

function PaginaInicial() {
  const [sapos, setSapos] = useState([])
  const [estadoLista, setEstadoLista] = useState('carregando')
  const [enviando, setEnviando] = useState(false)
  const [erroCadastro, setErroCadastro] = useState(false)
  const envioEmAndamento = useRef(false)
  const novosSapos = useRef([])
  const consultaAtual = useRef(0)

  const carregarSapos = useCallback(async () => {
    const consulta = ++consultaAtual.current
    try {
      const registros = await listarSapos()
      if (consulta !== consultaAtual.current) return

      // Preserva cadastros feitos enquanto a consulta estava em andamento.
      const idsNovos = new Set(novosSapos.current.map((sapo) => sapo.id))
      const lista = [
        ...novosSapos.current,
        ...registros.toReversed().filter((sapo) => !idsNovos.has(sapo.id)),
      ]
      setSapos(lista)
      setEstadoLista(lista.length ? 'pronta' : 'vazia')
    } catch {
      if (consulta === consultaAtual.current) setEstadoLista('erro')
    }
  }, [])

  useEffect(() => {
    carregarSapos()
    return () => { consultaAtual.current += 1 }
  }, [carregarSapos])

  function tentarNovamente() {
    setEstadoLista('carregando')
    carregarSapos()
  }

  async function aoCadastrar(dados) {
    if (envioEmAndamento.current) return false

    envioEmAndamento.current = true
    setEnviando(true)
    setErroCadastro(false)

    try {
      const sapo = await cadastrarSapo(dados)
      novosSapos.current = [sapo, ...novosSapos.current]
      setSapos((anteriores) => [sapo, ...anteriores])
      setEstadoLista((estado) => estado === 'vazia' ? 'pronta' : estado)
      return true
    } catch {
      setErroCadastro(true)
      return false
    } finally {
      envioEmAndamento.current = false
      setEnviando(false)
    }
  }

  return (
    <>
      <header className='pagina-inicial-cabecalho'><h1>FrogDex</h1></header>
      <main className='pagina-inicial-conteudo'>
        <section className='pagina-inicial-secao' aria-labelledby='titulo-cadastro'>
          <h2 id='titulo-cadastro'>Cadastrar sapo</h2>
          <FormularioSapo aoEnviar={aoCadastrar} enviando={enviando} />
          {erroCadastro && <p role='alert'>Não foi possível realizar o cadastro.</p>}
        </section>

        <section className='pagina-inicial-secao' aria-labelledby='titulo-lista'>
          <h2 id='titulo-lista'>Sapos cadastrados</h2>
          {estadoLista !== 'pronta' && (
            <MensagemStatus
              variante={estadoLista}
              aoTentarNovamente={estadoLista === 'erro' ? tentarNovamente : undefined}
            />
          )}
          {sapos.length > 0 && <ListaSapos sapos={sapos} />}
        </section>
      </main>
    </>
  )
}

export default PaginaInicial
