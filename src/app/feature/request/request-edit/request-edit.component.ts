import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { Location } from '@angular/common';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = 'Request Edit';
  request: Request = new Request();
  id: number = 0;

  constructor(private requestSvc: RequestService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location) { }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms ['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
  }

  save(): void {
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