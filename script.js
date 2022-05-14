
let currentColor = 'black'; //variável que define a cor atual

let screen = document.querySelector('#tela'); //seleciona a tela do canvas. Porém, para desenhar nele, precisa-se selecionar um contexto que está DENTRO dele
let ctx = screen.getContext('2d'); //pegando o contexto 2d para desenho


let canDraw = false; //verifica modo desenho

//Preciso necessariamente saber onde é a posição ANTERIOR do mouse. Logo, antes de executar a function mouseMove, a function mouseDown é executada. E é nela que eu pego o meu valor anterior do movimento do mouse
let mouseX = 0; //posição anterior
let mouseY = 0; //posição anterior

/////////////////////////////////////////////////////////////////////////////////EVENTS/////////////////////////////////////////////////////////////////////////////////////////////////
//laço de repetição pegando os elementos que definem a minha cor e adicionando o listener para ouvir o click
document.querySelectorAll('.colorArea .color').forEach(item => {
item.addEventListener('click', colorClickEvent);
});

//Preciso criar eventos para monitorar só oq acontece dentro da minha tela (var screen)
screen.addEventListener('mousedown', mouseDownEvent); //monitora o click pressionado do mouse
screen.addEventListener('mousemove',mouseMoveEvent); //monitora o movimento do mouse
screen.addEventListener('mouseup',mouseUpEvent); //monitora o parar de pressionar o mouse


document.querySelector('.clear').addEventListener('click', clearScreen); //ao clicar, executa função clearScreen


///////////////////////////////////////////////////////////////////////////////FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////
//roda a função ao clicar em alguma cor (passando e)
function colorClickEvent(e){
//1 verificar cor clicada e pegar a cor informada no data-color do html
let color = e.target.getAttribute('data-color');
console.log("cor clicada:", color);
//atribuir cor à variável
currentColor = color;
//retirar a classe de ativa da antiga cor
document.querySelector('.color.active').classList.remove('active');
//adicionar classe de ativa na nova cor clicada
e.target.classList.add('active');
}


//ativar o modo desenho ao clicar no mouse
function mouseDownEvent(e){
  canDraw = true;
        //o evento e.pageX /Y captura a posição do mouse na tela(inteira, ponto 0 é nas bordas da janela), logo, preciso compensar este valor de pxs no meu canvas (somente onde vou desenhar)
        //a lógica é: o tamanho da página - tam do canvas para obter o valor correto da posição do mouse para desenhar no canvas
         mouseX = e.pageX - screen.offsetLeft; //offsetLeft = qual é a distância do elemento para o fim da página para esquerda 
         mouseY = e.pageY - screen.offsetTop; //offsetLeft = qual é a distância do elemento para o fim da página para o topo  
};


//passo o e de (event) para ele capturar o meu evento como parâmetro. Meu evento é o de saber a posição do mouse
function mouseMoveEvent(e){

    if(canDraw){
        draw(e.pageX, e.pageY);

    }


};

//desativar o modo desenho
function mouseUpEvent(){
 canDraw= false;

};

//funcao que faz o desenho
function draw(x,y){
    let pointX = x - screen.offsetLeft; //calculando a posição ATUAL em que eu tenho que desenhar
    let pointY = y - screen.offsetTop; //posição ATUAL

    //desenhar

//usar contexto
    ctx.beginPath(); //iniciando processo de desenho
    ctx.lineWidth = 5; //largura da linha
    ctx.lineJoin = "round" //linha com bordas arredondadas (bolinhas)
    ctx.moveTo(mouseX, mouseY); //move até a posição 
    ctx.lineTo(pointX,pointY); //faz uma linha na posição
    ctx.closePath(); //finalizando processo de desenho
    ctx.strokeStyle = currentColor; //colorindo a linha desenhada
    ctx.stroke(); //finalizando processo

    //salvar posição atual no mouse X, para ter a info que ele tinha ANTES e a onde ele tá agora (cointinuidade)
    mouseX = pointX;
    mouseY = pointY;
};

//função que limpa tela

function clearScreen () {

    //1 - setar a posição geral (set transform) vai zerar o cursor e o processo de desenho
    ctx.setTransform(1,0,0,1,0,0); //estudar documentação do contexto p/ entender o que essa função faz

    //2 - limpar tudo 
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height); //limpa tudo de 0 até a largura total do canvas

}