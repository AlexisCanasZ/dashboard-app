import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private urlAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBI2daLu2Pe11IZxSgEJBEmMqTVoPgcjOk';
  private userToken: string;

  constructor( private http: HttpClient ) { }

  login( usuario: UsuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.urlAuth}signInWithPassword?key=${this.apiKey}`, authData)
      .pipe(
        map(resp => {
          // this.guardarToken(resp['idToken']);
          return resp;
        })
      );

  }

  logout(){
    localStorage.removeItem('token');
  }

}
