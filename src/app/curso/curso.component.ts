import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICurso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //vetor
  vetor: ICurso[] = [];

  //objeto da classe curso
  curso?: ICurso;

  constructor(
    private cursoService: CursoService,
  ) { }

  ngOnInit(): void {
    //ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }

  //cadastrar
  cadastro() {
    this.cursoService.cadastrarCurso(this.curso).subscribe(
      (res: ICurso[]) => {

        //adicionando dados ao vetor
        this.vetor = res;

        //limpar os atributos
        this.curso!.nomeCurso = '';
        this.curso!.valorCurso = 0;

        //atualizar a listagem
        this.selecao();

      }
    )
  }

  //selecionar
  selecao() {
    this.cursoService.obterCursos().subscribe(
      (res: ICurso[]) => {
        this.vetor = res;
        console.log(this.vetor)
      }
    )
  }

  //alterar
  alterar(){
    this.cursoService.atualizarCurso(this.curso).subscribe(
      (res) => {
        //atualizar vetor
        this.vetor = res;

        //limpar os atributos
        this.curso!.nomeCurso = '';
        this.curso!.valorCurso = 0;

        //atualizar a listagem
        this.selecao();

      }
    )
  }

  //deletar
  remover() {
    this.cursoService.removerCurso(this.curso).subscribe(
      (res: ICurso[]) => {
        this.vetor = res;

        this.curso!.nomeCurso = '';
        this.curso!.valorCurso = 0;
      }
    )
  }

  //selecionar curso específico
  selecionarCurso(c: ICurso){
    this.curso!.idCurso = c.idCurso;
    this.curso!.nomeCurso = c.nomeCurso;
    this.curso!.valorCurso = c.valorCurso;
  }
  
}
