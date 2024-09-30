import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importer le router pour rediriger après envoi

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private http: HttpClient, private router: Router) { }

  contacter(form: any) {
    if (form.valid) {
      this.onSubmit(form);
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  onSubmit(form: any) {
    this.http.post<{ message: string }>('http://localhost:3000/api/contact', form.value)
      .subscribe(
        response => {
          console.log(response.message); // Afficher le message de succès
          form.reset();

       
        },
        error => {
          console.error('Erreur lors de l\'envoi du message', error);
        }
      );
  }
}
