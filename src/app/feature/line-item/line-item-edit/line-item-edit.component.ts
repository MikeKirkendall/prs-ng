import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})

export class LineItemEditComponent implements OnInit {

  title: string = 'Line Item Edit';
  lineitem: LineItem = new LineItem();
  products: Product[] = [];
  request: Request;
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
    this.lineitemSvc.get(this.id).subscribe(jr => {
      this.lineitem = jr.data as LineItem
    });


  }

  delete()  { 
    this.lineitemSvc.delete(this.id).subscribe(jr => {
      console.log("user delete jr:",jr);
      if (jr.errors != null) {
        console.log("Error deleting user: "+jr.errors);
      }
      this.router.navigateByUrl("requests/lineitems"+this.id);
    })
  }

  save(): void {
    this.lineitemSvc.save(this.lineitem).subscribe(jr => {
      this.router.navigateByUrl("/requests/lines/"+this.lineitem.request.id);
    });
  }
}

