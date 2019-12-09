import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { JsonResponse } from 'src/app/model/json-response';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItemService } from 'src/app/service/line-item.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';
import { Request } from '../../../model/request.class';


@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent extends BaseComponent implements OnInit {
  title: string = "Request Lines";
  request: Request = new Request();
  lines: LineItem[] = [];
  jr: JsonResponse;
  id: number = 0;
  loggedInId: number = 0;


  constructor(private requestSvc: RequestService,
    private lineitemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute,
    protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    // get id from url
    this.loggedInId = this.sysSvc.loggedInUser.id;
    this.route.params.subscribe(parms => this.id = parms['id']);
    console.log('request lines component...  request id = ' + this.id);

    this.reloadData();

  }

  reloadData(): void {
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });

    this.lineitemSvc.linesForRequest(this.id).subscribe(jresp => {
      console.log(jresp);
      this.jr = jresp;
      this.lines = this.jr.data as LineItem[];
    });

  }

  delete(id: number): void {
    this.lineitemSvc.delete(id).subscribe(jresp => {
      console.log("deleted line successfully");
      this.reloadData();
    });
  }

  approve(): void {
    this.requestSvc.approve(this.request).subscribe(jresp => {
      this.router.navigateByUrl("/request/review/" + this.loggedInId);

    })
  }
  reject(): void {
    this.requestSvc.reject(this.request).subscribe(jresp => {
      this.router.navigateByUrl("/request/review/" + this.loggedInId);

    })
  }

  rejectReason(): void {
    this.request.status = "Rejected";
  }

  searchCriteria: string = '';
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  sortBy(column: string): void {
    if (column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}