import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public categories : any = [];

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.httpService.buildUrl('product-cats')
    .get()
    .subscribe({
      next: data => {
        this.categories = data;

        this.categories.forEach(cat => {
          this.httpService.buildUrl('products/category/'+cat._id)
          .post()
          .subscribe({
            next: data => {
              cat.products = data;
            },
            error: error => {
              console.log(error);
              cat.products = [];
            }
          })
        });
      },
      error: error => {
        console.log(error);
        this.categories = [];
      }
    })
  }

  addToCart(product) {
    this.httpService.buildUrl('cart/item')
    .post({ product: product._id, amount: 1 })
    .subscribe({
      next: data => {
        alert("Produto adicionado ao carrinho!");
      },
      error: error => {
        console.log(error);
        alert("Ops, ocorreu um erro! Por favor tente novamente.");
      }
    })
  }
}
