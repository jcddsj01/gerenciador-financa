// Variáveis
let listaTransacoes = [];
let resultadoDescricao = document.getElementById("resultado-descricao");
let resultadoValor = document.getElementById("resultado-valor");
let resultadoTipo = document.getElementById("resultado-tipo");
let botaoDeletarResultado = document.getElementById("btn-deletar-resultado");

let receitas = document.getElementById("receitas");
let despesas = document.getElementById("despesas");
let total = document.getElementById("total");
let somaReceitas = 0;
let somaDespesas = 0;

// Função para adicionar uma transação
function adicionarTransacao() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value.replace(',', '.'));

    if (descricao.trim() === "" || isNaN(valor) || valor < 0) {
        alert("Por favor, preencha todos os campos com valores válidos e positivos.");
        return;
    }

    const transacao = {
        descricao,
        valor,
        tipo: obterTipoTransacaoSelecionada()
    };

    listaTransacoes.push(transacao);
    atualizarTransacoes();
}

// Função para obter o tipo de transação selecionado
function obterTipoTransacaoSelecionada() {
    const transacaoRadios = document.getElementsByName("transacao");

    for (let i = 0; i < transacaoRadios.length; i++) {
        if (transacaoRadios[i].checked) {
            return transacaoRadios[i].value;
        }
    }

    return "";
}

// Função para atualizar a lista de transações
function atualizarTransacoes() {
    limparConteudo();
    somaReceitas = 0;
    somaDespesas = 0;

    for (let i = 0; i < listaTransacoes.length; i++) {
        const transacao = listaTransacoes[i];
        const { descricao, valor, tipo } = transacao;

        const paragrafoDescricao = criarParagrafo(descricao);
        const paragrafoValor = criarParagrafo(`R$ ${valor.toFixed(2).replace('.', ',')}`);
        const paragrafoTipo = criarParagrafoComIconeTipo(tipo);
        const botaoDeletar = criarBotaoDeletarTransacao(i);

        resultadoDescricao.appendChild(paragrafoDescricao);
        resultadoValor.appendChild(paragrafoValor);
        resultadoTipo.appendChild(paragrafoTipo);
        botaoDeletarResultado.appendChild(botaoDeletar);

        if (tipo === "receita") {
            somaReceitas += valor;
        } else {
            somaDespesas += valor;
        }
    }

    const somaTotal = somaReceitas - somaDespesas;
    receitas.innerHTML = `R$ ${somaReceitas.toFixed(2).replace('.', ',')}`;
    despesas.innerHTML = `R$ ${somaDespesas.toFixed(2).replace('.', ',')}`;
    total.innerHTML = `R$ ${somaTotal.toFixed(2).replace('.', ',')}`;

    limparCampos();
}

// Função para criar parágrafo
function criarParagrafo(texto) {
    const paragrafo = document.createElement("p");
    paragrafo.style.fontSize = "1.1rem";
    paragrafo.style.padding = "15px 0 5px";
    paragrafo.textContent = texto;
    return paragrafo;
}

// Função para criar parágrafo com ícone do tipo de transação
function criarParagrafoComIconeTipo(tipo) {
    const paragrafo = criarParagrafo("");
    const icone = document.createElement("i");
    icone.style.paddingLeft = "10px";

    if (tipo === "receita") {
        icone.style.color = "#008000";
        icone.className = "fa-regular fa-circle-up fa-lg";
    } else {
        icone.style.color = "#ff0000";
        icone.className = "fa-regular fa-circle-down fa-lg";
    }

    paragrafo.appendChild(icone);
    return paragrafo;
}

// Função para criar botão de deletar transação
function criarBotaoDeletarTransacao(indice) {
    const botao = document.createElement("button");
    const icone = document.createElement("i");
    icone.className = "fa-solid fa-trash fa-lg";
    botao.appendChild(icone);
    botao.style.cursor = "pointer";
    botao.style.color = "#000";
    botao.style.border = "none";
    
    botao.addEventListener("click", () => {
        listaTransacoes.splice(indice, 1);
        atualizarTransacoes();
    });

    return botao;
}

// Função para limpar o conteúdo
function limparConteudo() {
    resultadoDescricao.innerHTML = "";
    resultadoValor.innerHTML = "";
    resultadoTipo.innerHTML = "";
    botaoDeletarResultado.innerHTML = "";
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo").value = "";
}
