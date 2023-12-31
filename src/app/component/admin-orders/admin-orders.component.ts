import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

    pageNumber: number = 1;
    adminOrders: Order[] = [];
    categories: any;

    constructor(public service: OrderService) { }
    ngOnInit(): void {
        this.loadData();
    }
    loadData() {
        this.service.getAdminOrders()
            .subscribe(response => {
                this.adminOrders = response.map((data) => {
                    return {
                        id: data.payload.doc.id,
                        ...data.payload.doc.data() as Order
                    }
                });

            })
    }
    getCategory(categoryId: string) {
        let _itemIndex = this.categories.findIndex((x: { id: string; }) => x.id === categoryId);
        return _itemIndex > -1 ? this.categories[_itemIndex].name : "";
    }
}
