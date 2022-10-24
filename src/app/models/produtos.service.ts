import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Products } from './produto.service';

const API = environment.apiUrl;
const PRODUCTS = API + '/produtos';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  constructor(private httpClient: HttpClient) {}
  selectAll(pagina: number = 0, limiteDeLinhas: number = 5, ordenacaoPelaColuna: string = '', ordenacaoAscOuDesc: string = '') {
    return this.httpClient.get<{ content: Products[], totalElements: number, pageable: any, sort: any}>(PRODUCTS+ '/paginado?page=' + pagina + '&size=' + limiteDeLinhas + '&sort=' + ordenacaoPelaColuna + ',' + ordenacaoAscOuDesc);
  }
  postObj(obj: Products) {
    return this.httpClient.post<Products>(PRODUCTS, obj);
  }
  selectById(id: string) {
    return this.httpClient.get<Products>(PRODUCTS + '/' + id);
  }

  insert(transacao: Products) {
    return this.httpClient.post<Products>(PRODUCTS, transacao);
  }
  update(transacao: Products) {
    return this.httpClient.put<Products>(
      PRODUCTS + '/' + transacao.id,
      transacao
    );
  }
  isertOrUpdate(transacao: Products) {
    if (transacao && transacao.id) {
      return this.update(transacao);
    } else {
      return this.insert(transacao);
    }
  }
  delete(transacao: Products) {
    return this.httpClient.delete<Products>(PRODUCTS + '/' + transacao.id );
  }
}
