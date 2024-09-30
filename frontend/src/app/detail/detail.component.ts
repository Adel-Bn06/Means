import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
id: any;
articles : any ;
  constructor(private act : ActivatedRoute,private data :DataService) { }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id')
    this.data.getbyid(this.id)
    .subscribe(
      (res)=>{
        this.articles = res;
      }
    )
  }

}
