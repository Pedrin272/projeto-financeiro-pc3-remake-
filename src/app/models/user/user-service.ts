import { User } from './user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
const RECURSO = API + '/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  selectAll() {
    return this.httpClient.get<{ items: User[]; count: number }>(RECURSO);
  }
  selectById(id: string) {
    return this.httpClient.get<User>(RECURSO + '/' + id);
  }
  validUser(user: User) {
    return this.httpClient.post<User>(RECURSO , user.name + user.password)  ;
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
