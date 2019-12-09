import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title: string = "Request List";
  requests: Request[] = [];
  jr: JsonResponse;
  id: number=0;


  constructor(private requestSvc: RequestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id =parms ['id']);
    this.requestSvc.reviewList(this.id).subscribe(jresp => {
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