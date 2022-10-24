import { User } from './user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const API = environment.apiUrl;
const RECURSO = API + '/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  selectAll() {
    return this.httpClient.get<{ items: User[]; count: number }>(
      RECURSO + '/listar'
    );
  }
  selectById(id: string) {
    return this.httpClient.get<User>(RECURSO + '/' + id);
  }
  validUser(username: string, password: string) {
    console.log(username + ' ' + password);
    console.log('validando usuario');

    return this.httpClient
      .get<User>(RECURSO + `/${username}&&${password}`)
      .subscribe();
  }
  insert(user: User) {
    return this.httpClient.post<User>(RECURSO, user);
  }

  update(user: User) {
    return this.httpClient.put<User>(RECURSO + '/' + user.id, user);
  }
  isertOrUpdate(user: User) {
    if (user && user.id) {
      return this.update(user);
    } else {
      return this.insert(user);
    }
  }
  delete(id: number) {
    return this.httpClient.delete<User>(RECURSO + '/' + id);
  }
}
