import { Transacao } from './transacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
const RECURSO = API + '/transacao';

@Injectable({
  providedIn: 'root',
})
export class TransacaoService {
  constructor(private httpClient: HttpClient) {}

  selectAll(
    pagina: number = 0,
    limiteDeLinhas: number = 5,
    ordenacaoPelaColuna: string = '',
    ordenacaoAscOuDesc: string = ''
  ) {
    return this.httpClient.get<{
      content: Transacao[];
      totalElements: number;
      pageable: any;
      sort: any;
    }>(
      RECURSO +
        '/paginado?page=' +
        pagina +
        '&size=' +
        limiteDeLinhas +
        '&sort=' +
        ordenacaoPelaColuna +
        ',' +
        ordenacaoAscOuDesc
    );
  }
  selectById(id: string) {
    return this.httpClient.get<Transacao>(RECURSO + '/' + id);
  }
  insert(transacao: Transacao) {
    return this.httpClient.post<Transacao>(RECURSO + '/salvar', transacao);
  }

  update(transacao: Transacao) {
    return this.httpClient.put<Transacao>(
      RECURSO + '/' + transacao.id,
      transacao
    );
  }
  isertOrUpdate(transacao: Transacao) {
    if (transacao && transacao.id) {
      return this.update(transacao);
    } else {
      return this.insert(transacao);
    }
  }
  delete(id: number) {
    return this.httpClient.delete<Transacao>(RECURSO + '/' + id);
  }
}
