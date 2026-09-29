const imagem = document.querySelector('#imagem');
const titulo = document.querySelector('#titulo');
const rodar = document.querySelector('#rodar');
const crescer = document.querySelector('#crescer');
const encolher = document.querySelector('#encolher');
const mudarCor = document.querySelector('#mudarCor');
const reiniciar = document.querySelector('#reiniciar');


//definir e inacializar as variáveis
let angulo = 0;
let tamanho = 1;
let cor = 0;

function atualiza_imagem() {
    imagem.style.transform = `rotatex(${angulo/2}deg) scale(${tamanho})`;
}

rodar.addEventListener('click', ()=>{
    angulo += 90;
    atualiza_imagem();
});

//crescer o objeto
crescer.addEventListener('click', ()=>{
    tamanho += 0.2;
    atualiza_imagem();
});

encolher.addEventListener('click', ()=>{
    tamanho -= 0.2;
    atualiza_imagem();
});

mudarCor.addEventListener('click', ()=>{
    cor += 180;
    imagem.style.filter = `hue-rotate(${cor}deg)`;
});

reiniciar.addEventListener('click', ()=>{
    angulo = 0;
    tamanho = 1;
    cor = 0;
    atualiza_imagem();
});