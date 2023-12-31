import { Termo } from './dominio/termo';
import { Cor } from './dominio/termo';
import "./css/styles.css";

class TelaTermo {
  pnlTeclado: HTMLButtonElement;
  btnEnter: HTMLButtonElement;
  btnR: HTMLButtonElement;
  txtF: HTMLDivElement;
  divTxt: HTMLDivElement;
  palavraChutada: string = "";

  termo: Termo;
  indiceLinha: number = 0;
  indiceColuna: number = 0;

  constructor() {
    this.termo = new Termo();
    this.registrarElementos();
    this.registrarEventos();
    this.txtF.hidden = true;
  }

  registrarElementos(){
    this.pnlTeclado = document.querySelector(".grid-teclado") as HTMLButtonElement;
    this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement;
    this.btnR = document.getElementById('btnRecomecar') as HTMLButtonElement;
    this.txtF = document.getElementById('textoFinalizacao') as HTMLDivElement;
    this.divTxt = document.getElementById("textoFinalizacao") as HTMLDivElement;
  }

  registrarEventos(){
    this.pnlTeclado.childNodes.forEach(tecla => {
      tecla.addEventListener('click', (sender) => this.capturarTecla(sender as MouseEvent));
    });
    this.btnR.addEventListener('click', () => this.recomecarJogo());
  }

  atualizarLinha(): HTMLDivElement{
    return document.getElementById(`linha${this.indiceLinha}`) as HTMLDivElement;
  }

  recomecarJogo(){
    this.termo = new Termo();
    this.indiceLinha = 0;
    this.indiceColuna = 0;
    this.palavraChutada = "";
    this.txtF.hidden = true;
    this.habilitarTextoFinal();

    let btn = this.pnlTeclado.childNodes as NodeListOf<HTMLButtonElement>;
    btn.forEach(tecla => {
      tecla.disabled = false;
    });

    this.recomecarQuadro();
    this.recomecarTeclado();
  }

  recomecarQuadro(): void{
    let pnlTermo = document.getElementById("pnlTermo") as HTMLDivElement;
    for(let i = 0; i < pnlTermo.children.length; i++){
      const linha = pnlTermo.children.item(i) as HTMLDivElement;
      for(let j = 0; j < linha.children.length; j++){
        const coluna = linha.children.item(j) as HTMLDivElement;
        coluna.textContent = "";
        coluna.style.backgroundColor = "#c09f7dbe";
      }
    }
  }

  recomecarTeclado(): void{
    let teclado = document.getElementById("pnlTeclado") as HTMLDivElement;
    for(let i = 0; i < teclado.children.length; i++){
      const btn = teclado.children.item(i) as HTMLButtonElement;
      btn.style.backgroundColor = "#fcebd9be";
    }
  }

  habilitarTextoFinal(){
    const txt = document.getElementById("txtFinal") as HTMLSpanElement;

    if(txt){
      this.divTxt.removeChild(txt);
    }
  }

  capturarTecla(sender: MouseEvent){
    let btn = sender.target as HTMLButtonElement;

    if(btn.textContent != 'Enter' && this.indiceColuna != 5){
      btn.style.backgroundColor = "#36322ed2";
    }

    let txtTecla: string = btn.textContent as string;
    //console.log(txtTecla);
    this.adicionarTextoAoQuadro(txtTecla);
  }

  desabilitarTeclado(){
    let btn = this.pnlTeclado.childNodes as NodeListOf<HTMLButtonElement>;
    btn.forEach(tecla => {
      tecla.disabled = true;
    });
    this.txtF.hidden = false;
  }

  criarSpan(txtFinal: string, acertou: boolean){
    const novoTexto = document.createElement('span');
    novoTexto.id = "txtFinal";  
    novoTexto.textContent = txtFinal;

    if(acertou){
      novoTexto.classList.add("msgAcertou")
    }
    else{
      novoTexto.classList.add("msgErrou")
    }

    this.divTxt.appendChild(novoTexto);
  }

  verificarAcerto(estaCorreto: boolean){
    let txtFinal: string = "";
    let corFinal: string = "";
    
    this.habilitarTextoFinal();

    if(estaCorreto){
      txtFinal = "Parabens você acertou!";
      this.desabilitarTeclado();
      this.criarSpan(txtFinal, true);
    }
    else if (estaCorreto == false && this.indiceLinha == 4) {
      txtFinal = "Infelizmente você perdeu. A palavra sorteada era: " + this.termo.palavraSorteada;
      this.desabilitarTeclado();
      this.criarSpan(txtFinal, false);
    }
  }

  adicionarTextoAoQuadro(txtTecla: string){
    let linha = this.atualizarLinha();
    let coluna = linha.children as HTMLCollection;

    if(txtTecla != 'Enter' && this.indiceColuna != 5){
      coluna[this.indiceColuna].textContent = txtTecla;
      this.palavraChutada += txtTecla;
      this.indiceColuna++;
    }
    else if(txtTecla == 'Enter'){
      const arrayCor = this.termo.verificadorDePalavra(this.palavraChutada);
      this.alterarCorQuadro(arrayCor, coluna);
      
      this.indiceLinha++;
      this.indiceColuna = 0;
      this.palavraChutada = "";
    }
  }

  alterarCorQuadro(arrayCor: Cor[], coluna: HTMLCollection){
    for(let i = 0; i < 5; i++){
      const quadro = coluna[i] as HTMLDivElement;

      if(arrayCor[i] == Cor.verde){
        quadro.style.backgroundColor = "#012401";
      }
      else if(arrayCor[i] == Cor.amarelo){
        quadro.style.backgroundColor = "#969900";
      }
      else{
        quadro.style.backgroundColor = "#160d0198";
      }
    }
    this.verificarAcerto(this.termo.verificarAcertou(this.palavraChutada));
  }
    
}


window.addEventListener('load', () => new TelaTermo()); 