// Para reiniciar o Rank
//localStorage.clear();

const cores = ["Verde", "Vermelho", "Amarelo", "Azul"];

let sequencia = [];
let jogador = [];
let rodada = 0;
let pontos = 0;
let podeClicar = false;
let ranking = [];
let nomeJogador = "";

const telaLogin = document.querySelector(".TelaLogin");
const inputNome = document.querySelector(".InputNome");
const botaoEntrar = document.querySelector(".BotaoEntrar");

botaoEntrar.addEventListener("click", function(){

    const nome = inputNome.value.trim();

    if(nome == ""){
        alert("Digite um nome!");
        return;
    }

    nomeJogador = nome;
    telaLogin.style.display = "none";
});

const botaoIniciar = document.querySelector(".Iniciar");

const botaoRank = document.querySelector(".Rank");
const rodadaSpan = document.querySelector(".Rodadas");
const pontosSpan = document.querySelector(".Pontos");
const listaRank = document.querySelector(".ListaRank");

const cardPontuacao = document.querySelector(".CardPontuacao");
const cardComoJogar = document.querySelector(".Card2");
const cardRank = document.querySelector(".CardRank");
const rankingSalvo = localStorage.getItem("ranking");

const telaDerrota = document.querySelector(".TelaDerrota");
const rodadaFinal = document.querySelector(".RodadaFinal");
const pontosFinais = document.querySelector(".PontosFinais");
const botaoReiniciar = document.querySelector(".BotaoReiniciar");
const botaoVoltar = document.querySelector(".BotaoVoltar");

const mensagemCentro = document.querySelector(".MensagemCentro");

function Centro(texto){
    mensagemCentro.innerText = texto;
}

if(rankingSalvo){
    ranking =
    JSON.parse(rankingSalvo);
}

function atualizarRanking(){
    listaRank.innerHTML = "";
    if(ranking.length == 0){
        listaRank.innerHTML =
        "<li>Nenhuma pontuação.</li>";
        return;
    }

    ranking.forEach(function(jogador, indice){
        const item = document.createElement("li");

        item.innerHTML = "#" + (indice + 1) + " 🎮 " + jogador.nome + " — " + jogador.pontos + " pontos";

        listaRank.appendChild(item);
    });
}

atualizarRanking();

function salvarPontuacao(){

    const jogadorExistente = ranking.find(function(jogador){
        return jogador.nome === nomeJogador;
    });

    if(jogadorExistente){
        if(pontos > jogadorExistente.pontos){
            jogadorExistente.pontos = pontos;
        }
    }else{
        ranking.push({
            nome:nomeJogador,
            pontos:pontos
        });
    }
    ranking.sort(function(a,b){
        return b.pontos - a.pontos;
    });

    ranking = ranking.slice(0,5);
    localStorage.setItem(
        "ranking",
        JSON.stringify(ranking)
    );
    atualizarRanking();
}

let rankAberto = false;

botaoRank.addEventListener("click", function(){

    if(rankAberto == false){

        cardPontuacao.style.display = "none";
        cardComoJogar.style.display = "none";

        cardRank.style.display = "block";

        botaoRank.innerText = "Voltar";

        rankAberto = true;

    }else{

        cardPontuacao.style.display = "block";
        cardComoJogar.style.display = "block";

        cardRank.style.display = "none";

        botaoRank.innerText = "Rank";

        rankAberto = false;
    }
});

botaoIniciar.addEventListener("click", iniciarJogo);

function iniciarJogo(){

    sequencia = [];
    jogador = [];

    rodada = 0;
    pontos = 0;

    atualizarPainel();

    proximaRodada();
}

function proximaRodada(){

    jogador = [];

    rodada++;

    atualizarPainel();

    const numeroAleatorio = Math.floor(Math.random() * 4);

    const corAleatoria = cores[numeroAleatorio];

    sequencia.push(corAleatoria);

    mostrarSequencia();
}

function mostrarSequencia(){

    podeClicar = false;
    Centro("Observe");

    sequencia.forEach(function(cor,indice){

        setTimeout(function(){
            piscarCor(cor);
        }, indice * 1000);
    });

    setTimeout(function(){
        podeClicar = true;
        Centro("Sua vez");
    }, sequencia.length * 1000);
}

function piscarCor(cor){

    const elemento = document.querySelector("." + cor);

    elemento.style.filter = "brightness(2.5)";
    elemento.style.transform = "scale(1.05)";

    setTimeout(function(){
        elemento.style.filter = "brightness(1)";
        elemento.style.transform = "scale(1)";
    },500);
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
        Centro("Correto!");
        atualizarPainel();
        setTimeout(function(){
            proximaRodada();
        },1000);
    }
}


function perdeu(){

    podeClicar = false;

    salvarPontuacao();

    rodadaFinal.innerText = rodada;
    pontosFinais.innerText = pontos;
    telaDerrota.style.display = "flex";
}

botaoReiniciar.addEventListener("click", function(){

    telaDerrota.style.display = "none";
    Centro("GENIUS");

    rodada = 0;
    pontos = 0;

    sequencia = [];
    jogador = [];

    atualizarPainel();

    iniciarJogo();
});

botaoVoltar.addEventListener("click", function(){

    telaDerrota.style.display = "none";
    Centro("GENIUS");

    rodada = 0;
    pontos = 0;

    sequencia = [];
    jogador = [];

    atualizarPainel();

    botaoIniciar.innerText = "Iniciar Jogo";
});

function atualizarPainel(){
    rodadaSpan.innerText = rodada;
    pontosSpan.innerText = pontos;
}