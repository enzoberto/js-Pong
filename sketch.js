//multiplayer
let multiplayer=false

//funcoes da bolinha
let xBolinha=300
let yBolinha=200
let dBolinha=15
let rBolinha=dBolinha/2

//funcoes raquete
let xRaquete=0  //posicao horizontal raquete
let yRaquete=175  //posicao vertical raquete
let hRaquete=12  //escada horizontal raquete
let vRaquete=60  //escala vertical raquete
let rRaquete=50  //roundness raquete
let pRaquete=0
//let lRaquete=  //length raquete

//funcoes raquete 2
let xRaquete2=588
let yRaquete2=175
let hRaquete2=12
let vRaquete2=60
let rRaquete2=50
let pRaquete2=0

let spdRaquete2=0
let chanceDeErrar=0

//velocidade da raquete
let spdRaquete=7

//velocidade da bolinha
let hspBolinha=6
let vspBolinha=6
let quicadas=0

let colidiu=false

//sons do jogo

let raquetadasfx
let pontosfx
let trilhamsc

function preload() {
  raquetadasfx=loadSound("raquetada.mp3")
  pontosfx=loadSound("ponto.mp3")
  trilhamsc=loadSound("trilha.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilhamsc.loop()
}

function draw() {
  background("black");
  fill(100)
  noStroke()
  rect(295,0,10,400,0)
  fill(255)
  noStroke()
  //colisaoRaquete()
  mostraPontos()
  //atualizaPontos()
  mostraBolinha()
  movimentaBolinha()
  colisaoBolinha()
  mostraRaquete1(xRaquete, yRaquete, "cyan")
  mostraRaquete1(xRaquete2, yRaquete2, "red")
  movimentacaoRaquete1()
  movimentacaoRaquete2()
  acelerarBolinha()
  colisaoLibary(xRaquete,yRaquete,hRaquete,vRaquete)
  colisaoLibary(xRaquete2,yRaquete2,hRaquete2,vRaquete2)
  bgRect()
  activateMultiplayer()
  bolinhaNaoFicaPresa()
   

//  console.log("hsp="+hspBolinha)
//  console.log("vsp="+vspBolinha)
//  console.log("quic"+quicadas)
  console.log("miss="+chanceDeErrar)
  //console.log("")
  
}

function activateMultiplayer() {
  if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW))
    {
      multiplayer=true
      chanceDeErrar=0
    }
}
function acelerarBolinha() {
  if (quicadas>=10 && hspBolinha*Math.sign(hspBolinha)<12)
    {
      hspBolinha+=Math.sign(hspBolinha)
      vspBolinha+=Math.sign(vspBolinha)
      quicadas=0
    }
}
function bgRect(){
  noFill()
  stroke(100)
  strokeWeight(3)
  rect(0,0,600,400)
}

function mostraBolinha() {
    fill("white")
    circle(xBolinha,yBolinha,dBolinha)
}

function movimentaBolinha() {
  xBolinha+=hspBolinha
  yBolinha+=vspBolinha
}

function colisaoBolinha() {
  
  if (yBolinha+rBolinha>height || yBolinha-rBolinha<0)
    {
      vspBolinha*=-1
      quicadas+=1
    }
    if (xBolinha+rBolinha>width || xBolinha-rBolinha<0)
    {
      hspBolinha*=-1
      quicadas+=1
    }
}

function colisaoRaquete(){
  if (xBolinha-rBolinha<xRaquete+hRaquete && yBolinha-rBolinha<yRaquete+vRaquete && yBolinha+rBolinha>yRaquete)
    {
      hspBolinha*=-1
      vspBolinha*=-1
    }
}

function mostraRaquete1(x,y,cor) {
    fill(cor)
    rect(x,y,hRaquete,vRaquete,rRaquete)
}

function mostraRaquete2() {
    fill("red")
    rect(xRaquete2,yRaquete2,hRaquete2,vRaquete2,rRaquete2)
}

function movimentacaoRaquete1() { 
  if (keyIsDown(87) && yRaquete>0) 
  {
    yRaquete-=spdRaquete
  }
  
    if (keyIsDown(83) && yRaquete<height-vRaquete) 
  {
    yRaquete+=spdRaquete
  }
  
    if (keyIsDown(82))
      {
        hspBolinha=Math.sign(hspBolinha)*6
        vspBolinha=Math.sign(vspBolinha)*6
      }
}

function movimentacaoRaquete2(){
  if (!multiplayer)
    {
      spdRaquete2=yBolinha-yRaquete2-vRaquete2/2-30
      yRaquete2+=spdRaquete2 + chanceDeErrar
      calculaChanceDeErrar()
    } else
      {
          if (keyIsDown(UP_ARROW) && yRaquete2>0) 
          {
            yRaquete2-=spdRaquete
          }

            if (keyIsDown(DOWN_ARROW) && yRaquete2<height-vRaquete) 
          {
            yRaquete2+=spdRaquete
          }
      }
      
  
}

function calculaChanceDeErrar() {
    if (pRaquete2>pRaquete)
      {
        chanceDeErrar+=1
        if (chanceDeErrar>=64)
        {
          chanceDeErrar=65
        }
      }else
          {
            chanceDeErrar-=1
            if (chanceDeErrar<=35)
            {
              chanceDeErrar=35
            }
          }
}
  
function colisaoLibary(x,y,h,v,) {
    colidiu=collideRectCircle(x,y,h,v, xBolinha, yBolinha, rBolinha);
  if (colidiu) 
  {
    hspBolinha*=-1
    raquetadasfx.play()
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha-rBolinha<0)
    {
      xBolinha=23
      pontoRaquete2()
    } else if (xBolinha+rBolinha>width)
      {
        xBolinha=width-23
        pontoRaquete1()
      }
}

function mostraPontos() {
  noStroke()
  fill(50)
  textStyle(BOLD)
  textAlign(CENTER,CENTER)
  textFont("MERRIWEATHER")
  textSize(175)
  text(pRaquete,150,200)
  text(pRaquete2,450,200)
}

/*function atualizaPontos() {
  if (xBolinha>590 && !colidiu)
    {
      pRaquete+=1
      pontosfx.play()
    }
  
  if (xBolinha<8 && !colidiu)
    {
      pRaquete2+=1
      pontosfx.play()
    }
}*/

function pontoRaquete1() {
  pRaquete+=1
  pontosfx.play()
}

function pontoRaquete2() {
  pRaquete2+=1
  pontosfx.play()
}