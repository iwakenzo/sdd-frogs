const limites = {
  nomePopular: 80,
  especie: 120,
  regiaoEncontrada: 120,
  habitat: 200,
  observacoes: 500,
}

const camposObrigatorios = {
  nomePopular: 'Informe o nome popular do sapo.',
  especie: 'Informe a espécie.',
  regiaoEncontrada: 'Informe a região encontrada.',
}

export function validarSapo(dados) {
  const origem = dados ?? {}
  const camposTexto = Object.keys(limites)

  const dadosValidados = {
    nomePopular: '',
    especie: '',
    regiaoEncontrada: '',
    periodo: String(origem.periodo ?? '').trim(),
    habitat: '',
    observacoes: '',
  }

  const erros = {}

  if (!['', 'noturno', 'diurno', 'crepuscular'].includes(dadosValidados.periodo)) {
    erros.periodo = 'Selecione um período válido.'
  }

  camposTexto.forEach((campo) => {
    const valor = String(origem[campo] ?? '').trim()

    dadosValidados[campo] = valor

    if (camposObrigatorios[campo] && !valor) {
      erros[campo] = camposObrigatorios[campo]
      return
    }

    if (valor.length > limites[campo]) {
      erros[campo] = `Este campo deve ter no máximo ${limites[campo]} caracteres.`
    }
  })

  return {
    valido: Object.keys(erros).length === 0,
    erros,
    dados: dadosValidados,
  }
}
