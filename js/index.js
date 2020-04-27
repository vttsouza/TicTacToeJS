// Objeto que armazenará as informações dos players
let players = {
    playerX: {
        pontos: 0,
        placar: document.querySelector("#placarX"),
        pontua: function() {
            return players.playerX.pontos++;
        },
    },
    playerO: {
        pontos: 0,
        placar: document.querySelector("#placarO"),
        pontua: function() {
            return players.playerO.pontos++;
        },
    },
};

let vencedor = false;
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
    players.playerX.placar.children[1].innerHTML =
        players.playerX.pontos + " pontos";
    players.playerO.placar.children[1].innerHTML =
        players.playerO.pontos + " pontos";

    areaJogo.forEach((valor, indice) => {
        mesa[indice].innerHTML = valor;
    });
}

function novoJogo() {
    areaJogo = ["", "", "", "", "", "", "", "", ""];
    renderizaJogadores();
    vencedor = false;
}

const btnNovoJogo = document.querySelector("#btnNovoJogo");
btnNovoJogo.addEventListener("click", () => {
    novoJogo();
});

function alteraJogadorAtual() {
    if (jogadorAtual == "X") {
        jogadorAtual = "O";
        players.playerX.placar.style.color = "white";
        players.playerO.placar.style.color = "lawngreen";
    } else {
        jogadorAtual = "X";
        players.playerO.placar.style.color = "white";
        players.playerX.placar.style.color = "lawngreen";
    }
}

function verificaGanhador() {
    let possiveisVitorias = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    possiveisVitorias.forEach((vitoria) => {
        // Verifica se a condição atual de vitoria é atendida
        let teste =
            areaJogo[vitoria[0]] === areaJogo[vitoria[1]] &&
            areaJogo[vitoria[1]] === areaJogo[vitoria[2]] &&
            areaJogo[vitoria[2]] !== "";

        if (teste) {
            if (areaJogo[vitoria[0]] === "X") {
                players.playerX.pontua();
                vencedor = "[X]";
            } else {
                players.playerO.pontua();
                vencedor = "[O]";
            }
        }
    });
}

function validaVelha() {
    if (areaJogo.indexOf("") === -1) {
        setTimeout(() => {
            alert("Deu velha! Ninguém pontuou");
        }, 100);
    }
}

function validaJogada(e) {
    // Gera id
    let id = e.target.id.toString().replace("a", "");

    // Valida se a celula não está preenchida
    if (areaJogo[id] != undefined && areaJogo[id] == "" && !vencedor) {
        // Altera o vetor da área de jogo para posteriormente preencher na tela
        areaJogo[id] = jogadorAtual;
        alteraJogadorAtual();
        // Preenche as informações na tela
        verificaGanhador();
    }

    validaVelha();

    if (vencedor) {
        setTimeout(() => {
            alert(`Ponto para o Jogador ${vencedor}`);
        }, 100);
    }

    renderizaJogadores();
}

// Cria evento de click para cada item da mesa
mesa.forEach((item) => {
    item.addEventListener("click", validaJogada);
});