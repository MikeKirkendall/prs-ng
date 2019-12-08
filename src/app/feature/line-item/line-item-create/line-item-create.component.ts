import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute, } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';


@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = 'Line Item Create';
  lineitem: LineItem = new LineItem();
  products: Product[] = [];
  request: Request = new Request();
  id: number = 0;

  constructor(private lineitemSvc: LineItemService,
    private productSvc: ProductService,
    private route: ActivatedRoute,
    private requestSvc: RequestService,
    private router: Router) { }

  ngOnInit() {
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    
    });

    // get the line item for the id passed in from the url
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
      this.lineitem.request = this.request;
    });
  }

  save(): void {
    this.lineitemSvc.save(this.lineitem).subscribe(jr => {
      this.router.navigateByUrl("/requests/lines/" + this.id);
    });
  }
}
