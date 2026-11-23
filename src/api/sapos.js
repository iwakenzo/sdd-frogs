const enderecoSapos = '/api/sapos'

export async function listarSapos() {
  const resposta = await fetch(enderecoSapos)

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os sapos.')
  }

  return resposta.json()
}

export async function cadastrarSapo(dados) {
  const { nomePopular, especie, regiaoEncontrada, periodo, habitat, observacoes } = dados
  const resposta = await fetch(enderecoSapos, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nomePopular, especie, regiaoEncontrada, periodo, habitat, observacoes }),
  })

  if (!resposta.ok) {
    throw new Error('Não foi possível realizar o cadastro.')
  }

  return resposta.json()
}
