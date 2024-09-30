import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {
  article: any = {
    Title: '',
    Content: '',
    Description: ''
  };
 
  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  formSubmitted: boolean = false;

  constructor(private userservice: UserService, private router: Router, private data: DataService) { }

  ngOnInit(): void { }

  select(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.image = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.image);
    }
  }



  create(): void {
    this.formSubmitted = true;
    if (!this.article.Title || !this.article.Description || !this.article.Content) {
      console.error('Please fill out all required fields.');
      return; // Stop if required fields are missing
    }

    let fd = new FormData();
    fd.append('Title', this.article.Title);
    fd.append('Content', this.article.Content);
    fd.append('Description', this.article.Description);
    if (this.image) {
      fd.append('Image', this.image);
    };
    if(this.userservice.getUserFromToken().isAuthor){
    fd.append('idAuthor', this.userservice.getUserFromToken()._id);
  };
    this.data.create(fd)
      .subscribe(
        (res) => {
          this.router.navigate(['/home']);
        },
        (err) => {
          console.error('Error during creation:', err);
        }
      );
  }
}
