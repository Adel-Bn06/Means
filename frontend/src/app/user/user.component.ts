import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.services';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: any;
  user: any;
  articles: any;

  constructor(
    private act: ActivatedRoute,
    private userservice: UserService,
    private data: DataService
  ) {}

 
    ngOnInit(): void {
      this.id=this.act.snapshot.paramMap.get('id');
      this.userservice.getuserById(this.id)
      .subscribe(
        (res) => {
          this.user = res;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
    
  }

