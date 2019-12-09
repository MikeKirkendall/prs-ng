import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';
import { BaseComponent } from 'src/app/feature/base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  menuItems: MenuItem[] = [];
  id: number = 0;

  constructor(protected systemSvc: SystemService) {
    super(systemSvc)

   }

  ngOnInit() {
    if(this.systemSvc.loggedInUser !=null){
      this.id = this.systemSvc.loggedInUser.id;
    }
    this.menuItems = [
      new MenuItem("User", "/users/list", "User List"),
      new MenuItem("Vendor", "/vendors/list", "Vendors List"),
      new MenuItem("Product", "/products/list", "Products List"),
      new MenuItem("Request", "/requests/list", "Request List"),
      new MenuItem("Review", "/requests/review/"+this.id, "Line-Item List"),
      new MenuItem( "Login", "/users/login", "Login")
    ]
  };



}
