import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  modalHeader: string = '';
  pageNumber: number = 1;
  searchTerm: string;

  product = new Product();

  productForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    price: new FormControl(0, Validators.required),
    category: new FormControl(null, Validators.required),
    imageUrl: new FormControl(null, Validators.required)
  });

  constructor(private _productService: ProductService, private _categoryService: CategoryService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  addProduct() {
    this.modalHeader = 'Add Product';
    this.product = new Product();
    this.productForm.reset();
  }
  editProduct(_product: Product) {
    this.modalHeader = 'Edit Product';
    this.product = _product;
  }
  deleteProduct(id: any) {
    this._productService.delete(id)
      .then((response) => {
        this.toastr.success('Product deleted successfully...!');
      })
      .catch((error: Response) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }
  saveProduct() {
    if (this.product.id) {
      this._productService.update(this.product.id, this.product)
        .then((response) => {
          this.toastr.success('Product updated successfully...!');
        })
        .catch((error: any) => {
          this.toastr.error('Un-handled exception occured...!');
        });
    }
    else {
      this._productService.create(this.product)
        .then((response) => {
          this.toastr.success('Product added successfully...!');
        })
        .catch((error: any) => {
          this.toastr.error('Un-handled exception occured...!');
        });
    }
    this.product = new Product();
    this.productForm.reset();
  }

  loadProducts() {
    this._productService.read(this.searchTerm)
      .subscribe(response => {
        this.products = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Product
          }
        });
      })
  }
  loadCategories() {
    this._categoryService.read()
      .subscribe(response => {
        this.categories = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Category
          }
        });
      })
  }
  getCategory(categoryId: string) {
    let _itemIndex = this.categories.findIndex(x => x.id === categoryId);
    return this.categories[_itemIndex].name;
  }
}
