const cores = ["Verde", "Vermelho", "Amarelo", "Azul"];

let sequencia = [];
let jogador = [];
let rodada = 0;
let pontos = 0;

let podeClicar = false;

const botaoIniciar = document.querySelector(".Iniciar");
const rodadaSpan = document.querySelector(".Rodadas");
const pontosSpan = document.querySelector(".Pontos");

botaoIniciar.addEventListener("click", iniciarJogo);

function iniciarJogo(){

    sequencia = [];
    jogador = [];

    rodada = 0;
    pontos = 0;

    atualizarPainel();

    botaoIniciar.innerText = "Jogando...";

    proximaRodada();
}

function proximaRodada(){

    jogador = [];

    rodada++;

    atualizarPainel();

    const numeroAleatorio = Math.floor(Math.random() * cores.length);

    const corAleatoria = cores[numeroAleatorio];

    sequencia.push(corAleatoria);

    mostrarSequencia();
}

function mostrarSequencia(){

    podeClicar = false;

    sequencia.forEach(function(cor, indice){

        setTimeout(function(){

            piscarCor(cor);

        }, indice * 1000);

    });

    setTimeout(function(){

        podeClicar = true;

    }, sequencia.length * 1000);
}

function piscarCor(cor){

    const elemento = document.querySelector("." + cor);

    elemento.style.transform = "scale(1.05)";

    setTimeout(function(){

        elemento.style.transform = "scale(1)";

    }, 500);
}

document.querySelector(".Verde").addEventListener("click", function(){
    cliqueJogador("Verde");
});

document.querySelector(".Vermelho").addEventListener("click", function(){
    cliqueJogador("Vermelho");
});

document.querySelector(".Amarelo").addEventListener("click", function(){
    cliqueJogador("Amarelo");
});

document.querySelector(".Azul").addEventListener("click", function(){
    cliqueJogador("Azul");
});

function cliqueJogador(cor){

    if(!podeClicar){
        return;
    }

    piscarCor(cor);

    jogador.push(cor);

    verificarJogada();
}

function verificarJogada(){

    const indiceAtual = jogador.length - 1;

    if(jogador[indiceAtual] !== sequencia[indiceAtual]){

        perdeu();

        return;
    }

    if(jogador.length === sequencia.length){

        podeClicar = false;

        pontos += 10;

        atualizarPainel();

        setTimeout(function(){

            proximaRodada();

        }, 3000);
    }
}

function perdeu(){

    podeClicar = false;

    alert(
        "Você perdeu!\n" +
        "Rodada: " + rodada + "\n" +
        "Pontos: " + pontos
    );

    botaoIniciar.innerText = "Jogar Novamente";

    sequencia = [];
    jogador = [];

    rodada = 0;
    pontos = 0;

    atualizarPainel();
}

function atualizarPainel(){

    rodadaSpan.innerText = rodada;
    pontosSpan.innerText = pontos;
}