import './MensagemStatus.css'

const mensagens = {
  carregando: 'Carregando sapos...',
  vazia: 'Nenhum sapo cadastrado. Cadastre o primeiro sapo!',
  erro: 'Não foi possível carregar os sapos.',
}

function MensagemStatus({ variante, aoTentarNovamente }) {
  return (
    <div
      className={`mensagem-status mensagem-status--${variante}`}
      role={variante === 'erro' ? 'alert' : 'status'}
    >
      <p>{mensagens[variante]}</p>
      {aoTentarNovamente && (
        <button type="button" onClick={aoTentarNovamente}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}

export default MensagemStatus
