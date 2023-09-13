import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  pageNumber: number = 1;

  category = new Category();
  modalHeader: string = '';

  categoryForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });
  categories: { id: string; name: string; description: string; }[];

  constructor(private _categoryService: CategoryService, private toastr: ToastrService) {

  }
  addCategory() {
    this.modalHeader = 'Add Category';
    this.category = new Category();
    this.categoryForm.reset();
  }
  editCategory(_category: Category) {
    this.modalHeader = 'Edit Category';
    this.category = _category;
  }
  deleteCategory(id: any) {
    this._categoryService.delete(id)
      .then((response) => {
        this.toastr.success('Category deleted successfully...!');
      })
      .catch((error: Response) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }
  saveCategory() {
    if (this.category.id) {
      this._categoryService.update(this.category.id, this.category)
        .then((response) => {
          this.toastr.success('Category updated successfully...!');
        })
        .catch((error: any) => {
          this.toastr.error('Un-handled exception occured...!');
        });
    }
    else {
      this._categoryService.create(this.category)
        .then((response) => {
          this.toastr.success('Category added successfully...!');
        })
        .catch((error: any) => {
          this.toastr.error('Un-handled exception occured...!');
        });
    }
    this.category = new Category();
    this.categoryForm.reset();
  }
 
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
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
}
