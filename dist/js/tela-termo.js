import { Termo } from './termo.js';
import { Cor } from './termo.js';
class TelaTermo {
    constructor() {
        this.palavraChutada = "";
        this.indiceLinha = 0;
        this.indiceColuna = 0;
        this.termo = new Termo();
        this.registrarElementos();
        this.registrarEventos();
        this.txtF.hidden = true;
    }
    registrarElementos() {
        this.pnlTeclado = document.querySelector(".grid-teclado");
        this.btnEnter = document.getElementById('btnEnter');
        this.btnR = document.getElementById('btnRecomecar');
        this.txtF = document.getElementById('textoFinalizacao');
        this.divTxt = document.getElementById("textoFinalizacao");
    }
    registrarEventos() {
        this.pnlTeclado.childNodes.forEach(tecla => {
            tecla.addEventListener('click', (sender) => this.capturarTecla(sender));
        });
        this.btnR.addEventListener('click', () => this.recomecarJogo());
    }
    atualizarLinha() {
        return document.getElementById(`linha${this.indiceLinha}`);
    }
    recomecarJogo() {
        this.termo = new Termo();
        this.indiceLinha = 0;
        this.indiceColuna = 0;
        this.palavraChutada = "";
        this.txtF.hidden = true;
        this.habilitarTextoFinal();
        let btn = this.pnlTeclado.childNodes;
        btn.forEach(tecla => {
            tecla.disabled = false;
        });
        let pnlTermo = document.getElementById("pnlTermo");
        for (let i = 0; i < pnlTermo.children.length; i++) {
            const linha = pnlTermo.children.item(i);
            for (let j = 0; j < linha.children.length; j++) {
                const coluna = linha.children.item(j);
                coluna.textContent = "";
                coluna.style.backgroundColor = "#c09f7dbe";
            }
        }
    }
    habilitarTextoFinal() {
        const txt = document.getElementById("txtFinal");
        if (txt) {
            this.divTxt.removeChild(txt);
        }
    }
    capturarTecla(sender) {
        let btn = sender.target;
        let txtTecla = btn.textContent;
        //console.log(txtTecla);
        this.adicionarTextoAoQuadro(txtTecla);
    }
    desabilitarTeclado() {
        let btn = this.pnlTeclado.childNodes;
        btn.forEach(tecla => {
            tecla.disabled = true;
        });
        this.txtF.hidden = false;
    }
    criarSpan(txtFinal, corFinal) {
        const novoTexto = document.createElement('span');
        novoTexto.id = "txtFinal";
        novoTexto.textContent = txtFinal;
        novoTexto.style.fontWeight = "bold";
        novoTexto.style.color = corFinal;
        this.divTxt.appendChild(novoTexto);
    }
    verificarAcerto(estaCorreto) {
        let txtFinal = "";
        let corFinal = "";
        this.habilitarTextoFinal();
        if (estaCorreto) {
            txtFinal = "Parabens você acertou!";
            corFinal = "#012401";
            this.desabilitarTeclado();
            this.criarSpan(txtFinal, corFinal);
        }
        else if (estaCorreto == false && this.indiceLinha == 4) {
            txtFinal = "Infelizmente você perdeu!";
            corFinal = "red";
            this.desabilitarTeclado();
            this.criarSpan(txtFinal, corFinal);
        }
    }
    adicionarTextoAoQuadro(txtTecla) {
        let linha = this.atualizarLinha();
        let coluna = linha.children;
        if (txtTecla != 'Enter' && this.indiceColuna != 5) {
            coluna[this.indiceColuna].textContent = txtTecla;
            this.palavraChutada += txtTecla;
            this.indiceColuna++;
        }
        else if (txtTecla == 'Enter') {
            const arrayCor = this.termo.verificadorDePalavra(this.palavraChutada);
            this.alterarCorQuadro(arrayCor, coluna);
            this.indiceLinha++;
            this.indiceColuna = 0;
            this.palavraChutada = "";
        }
    }
    alterarCorQuadro(arrayCor, coluna) {
        for (let i = 0; i < 5; i++) {
            const quadro = coluna[i];
            if (arrayCor[i] == Cor.verde) {
                quadro.style.backgroundColor = "#012401";
            }
            else if (arrayCor[i] == Cor.amarelo) {
                quadro.style.backgroundColor = "#969900";
            }
            else {
                quadro.style.backgroundColor = "#160d0198";
            }
        }
        this.verificarAcerto(this.termo.verificarAcertou(this.palavraChutada));
    }
}
window.addEventListener('load', () => new TelaTermo());
//# sourceMappingURL=tela-termo.js.map