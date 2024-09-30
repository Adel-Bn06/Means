import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Objet générique pour l'utilisateur
  user = {
    Email: '',
    Password: ''
  }

  isAuthor: boolean = true;  // Déterminer si c'est un auteur ou un client

  constructor(private userservice: UserService, private router: Router) { 
    console.log('userservice:', userservice);
  }

  ngOnInit(): void {}

  token: any;

 

  login(){
    console.log('Attempting to login with:', this.user);
    this.userservice.login(this.user)
    .subscribe(
        (res) => {
            console.log('Login successful:', res);
            this.token = res;
            if(this.token && this.token.myToken) {
                localStorage.setItem('token', this.token.myToken);
                this.router.navigate(['/user', this.userservice.getUserFromToken()._id]);
            } else {
                console.error('No token found in the response');
            }
        },
        (err) => {
            console.error('Login error:', err);
        }
    );
}

}
