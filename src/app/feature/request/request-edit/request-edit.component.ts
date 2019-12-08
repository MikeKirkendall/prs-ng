import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = 'Request Edit';
  request: Request = new Request();
  id: number = 0;
  users: User[] = [];

  constructor(private requestSvc: RequestService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location,
              private userSvc: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms ['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
  
    
    this.userSvc.list().subscribe (jr => {
      this.users = jr.data as User[];
      console.log(": ", this.users);
    }); 
  }

  save(): void {
    this.requestSvc.save(this.request).subscribe(jr => {
      console.log("edited request...");
      console.log(this.request);
      this.router.navigateByUrl("/requests/list");
    });
    
  }
  update(): void {
    this.requestSvc.save(this.request).subscribe(jr => {
      console.log("edited request...");
      console.log(this.request);
      this.router.navigateByUrl("/requests/list");
    });
    
  }




  backClicked() {
    this.loc.back();
  }
  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }
}