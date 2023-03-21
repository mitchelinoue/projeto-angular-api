import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ICurso } from './curso';
 
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL
  url = "http://localhost:8080/api/php/";

   //vetor 
   vetor: ICurso[] = [];

  constructor(
    private http: HttpClient
  ) { }

  //obter todos os cursos
  obterCursos(): Observable<ICurso[]>{
    return this.http.get(this.url + "listar").pipe(
      map((res: any) => {
        this.vetor = res['cursos'];
        return this.vetor;
      })
    )
  }

  //cadastrar curso
  cadastrarCurso(c: ICurso | undefined): Observable<ICurso[]>{
    return this.http.post(this.url + 'cadastrar', {cursos:c}).pipe(map(
      (res: any) => {
        this.vetor.push(res['cursos']);
        return this.vetor;
      }
    ))
  }

  //remover curso
  removerCurso(c: ICurso | undefined):Observable<ICurso[]>{

    const params = new HttpParams().set("idCurso", c!.idCurso!.toString());

    return this.http.delete(this.url + 'excluir', {params: params}).pipe(map(
      (res) => {
        const filtro = this.vetor.filter((curso) => {
          return +curso['idCurso']! !== +c!.idCurso!;
        });
        return this.vetor = filtro;
      }))
  }

  atualizarCurso(c: ICurso | undefined): Observable<ICurso[]>{
    //executa a alteração via url
    return this.http.put(this.url+'alterar', {cursos: c})

    //percorrer o vetor para saber qual é o id do curso alterado
    .pipe(map(
      (res) => {
        const cursoAlterado = this.vetor.find(
          (item) => {
            return +item['idCurso']! === +['idcurso'];
          }
        );

        //alterar o valor do vetor local
        if(cursoAlterado){
          cursoAlterado['nomeCurso'] = c!['nomeCurso'];
          cursoAlterado['valorCurso'] = c!['valorCurso'];
        }

        return this.vetor;
      }
    ))
  }


}
