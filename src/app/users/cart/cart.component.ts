import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  public data : any = [];

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.httpService.buildUrl('cart')
    .get()
    .subscribe({
      next: data => {
        this.data = data;

      },
      error: error => {
        console.log(error);
        this.data = [];
      }
    })
  }

  removeFromCart(item) {
    this.httpService.buildUrl('cart/item/'+item._id)
    .delete()
    .subscribe({
      next: data => {
        this.getData();
        alert("Produto removido do carrinho!");
      },
      error: error => {
        console.log(error);
        alert("Ops, ocorreu um erro! Por favor tente novamente.");
      }
    })
  }
}
