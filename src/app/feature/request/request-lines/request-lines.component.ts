import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { JsonResponse } from 'src/app/model/json-response';
import { BaseComponent } from '../../base/base.component';
import { LineItemService } from 'src/app/service/line-item.service'
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';


@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent extends BaseComponent implements OnInit {
  title: string = "Request Lines";
  request: Request = new Request();
  lines: LineItem[] = [];
  jr: JsonResponse;
  id: number = 0;


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
    this.route.params.subscribe(parms => this.id = parms['id']);
    console.log('request lines component...  request id = ' + this.id);

    this.reloadData();

  }

  reloadData():void {this.requestSvc.get(this.id).subscribe(jr => {
    this.request = jr.data as Request;
  });

  this.lineitemSvc.linesForRequest(this.id).subscribe(jresp => {
    console.log(jresp);
    this.jr = jresp;
    this.lines = this.jr.data as LineItem[];
  });

  }

  delete(id: number): void{
    this.lineitemSvc.delete(id).subscribe(jresp => {
      console.log("deleted line successfully");
      this.reloadData();
    });

  }

  submitForReview(): void {
    this.requestSvc.submitReview(this.request).subscribe(jr => {
      this.router.navigateByUrl("requests/list");

    });  
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