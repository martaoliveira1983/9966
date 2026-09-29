//alert("Bem-vindo ao Laboratório de Multimédia!");
const titulo= document.querySelector("#titulo");
titulo.style.fontSize="40px";
titulo.style.color="goldenrod";
titulo.style.textAlign="center";

//altera o texto do título
titulo.innerHTML="Laboratório de Multimédia - Exercicio 3";

//cria uma variável que seleciona o elemento com o id imagem
const imagem = document.querySelector("#imagem");

function rodar() {
    imagem.style.transform="rotate(90deg)";}

    let angulo = 0;

function rodar() {
    angulo += 90;
    imagem.style.transform = `rotate(${angulo}deg)`;

}

function crescer() {
    imagem.style.transform = "scale(1.2)";
}

function encolher() {
    imagem.style.transform = "scale(0.5)";
}

function mudarCor() {
    imagem.style.filter = "hue-rotate(180deg)";
}

function reiniciar() {
    imagem.style.transform = "rotate(0deg)";
    imagem.style.filter = "none";
    imagem.style.transform = "scale(1)";
}