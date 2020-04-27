let playerX = {
    pontos: 0,
};

let playerO = {
    pontos: 0,
};

let jogadorAtual = "X";
let areaJogo = ["", "", "", "", "", "", "", "", ""];

const mesa = [
    document.querySelector("#a0"),
    document.querySelector("#a1"),
    document.querySelector("#a2"),
    document.querySelector("#a3"),
    document.querySelector("#a4"),
    document.querySelector("#a5"),
    document.querySelector("#a6"),
    document.querySelector("#a7"),
    document.querySelector("#a8"),
];

function renderizaJogadores() {
    areaJogo.forEach((valor, indice) => {
        mesa[indice].innerHTML = valor;
    });
}

function alteraJogadorAtual() {
    jogadorAtual = jogadorAtual == "X" ? "O" : "X";
}

function verificaGanhador() {}

function validaJogada(e) {
    // Gera id
    let id = e.target.id.toString().replace("a", "");

    // Valida se a celula não está preenchida
    if (areaJogo[id] != undefined && areaJogo[id] == "") {
        // Altera o vetor da área de jogo para posteriormente preencher na tela
        areaJogo[id] = jogadorAtual;
        alteraJogadorAtual();
        // Preenche as informações na tela
        renderizaJogadores();
        //console.log(areaJogo);
    }
}

// Cria evento de click para cada item da mesa
mesa.forEach((item) => {
    item.addEventListener("click", validaJogada);
});