import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    
   }

  private url = "http://127.0.0.1:3000/user/";

  

  // Enregistrement des auteurs
  register(user: any) {
    return this.http.post(this.url + 'register', user);
  }

  // Connexion des auteurs
  login(user: any) {
    return this.http.post(this.url + 'login' , user);
  }

  // Vérification si un utilisateur est connecté
  isloggedin() {
    let token = localStorage.getItem('token');
    return !!token; // Retourne true si le token existe
  }

  // Décoder le token (générique pour client et auteur)
  getUserFromToken() {
    let token = localStorage.getItem('token');
    if (token) {
      let data = JSON.parse(window.atob(token.split('.')[1]));
      return data;
    }
  }

  // Récupérer les informations d'un auteur par ID
  getuserById(id: any) {
    return this.http.get(this.url + 'getbyid/' + id);
  }

}