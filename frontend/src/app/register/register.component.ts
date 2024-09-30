import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  

  // Object for user registration
  user = {
    Name: '',
    LastName: '',
    Email: '',
    Password: '',
    About: '',
    Mobile: '',
    Adresse: '',
  }

  Image: any; // Image file to upload

  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {}

  // Method to handle file selection for the image
  select(e: any) {
    this.Image = e.target.files[0];
  }

  // Registration method
  register() {
    let fd = new FormData();
    

    // Appending data to FormData object
    fd.append('Name', this.user.Name);
    fd.append('LastName', this.user.LastName);
    fd.append('Email', this.user.Email);
    fd.append('Password', this.user.Password);
    fd.append('About', this.user.About); 
    fd.append('Mobile', this.user.Mobile);
    fd.append('Adresse', this.user.Adresse);
    fd.append('Image', this.Image);

    
      this.userservice.register(fd)
      .subscribe(
        (res) => {
          console.log('User registered successfully');
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error('Error during user registration:', err);
        }
      );
    
  }
}
