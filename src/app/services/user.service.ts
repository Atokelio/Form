import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>('assets/user.json');
  }
}
