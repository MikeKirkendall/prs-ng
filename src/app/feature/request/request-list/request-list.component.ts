import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';



@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title: string = "Request List";
  requests: Request[] = [];
  jr: JsonResponse;


  constructor(private requestSvc: RequestService) {
  }

  ngOnInit() {

    this.requestSvc.list().subscribe(jresp => {
      this.jr = jresp;
      this.requests = this.jr.data as Request[];
      console.log(this.requests)


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