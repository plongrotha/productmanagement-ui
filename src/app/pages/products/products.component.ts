import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  CategoryResponse,
  ProductDto,
  ProductResponse,
  ProductUpdateDto,
} from '../../models/product.model';
import { ProductServiceService } from '../../services/product-service.service';
import { find, map, Observable } from 'rxjs';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../models/employee.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [NgFor, FormsModule, CurrencyPipe, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: ProductResponse[] = [];
  private filteredProducts: ProductResponse[] = [];
  // isUpdate: boolean = false;
  isOpenModal: boolean = false;
  isDelete: boolean = false;
  selectedProduct: number = 0;
  searchProduct: number = 0;
  isSearch = true;

  CategoryList$: Observable<ApiResponse<CategoryResponse[]>> = new Observable<
    ApiResponse<CategoryResponse[]>
  >();

  cateList: CategoryResponse[] = [];
  private productService = inject(ProductServiceService);

  constructor(@Inject(PLATFORM_ID) private platfomId: Object) {
    this.getAllCategory();
  }

  productDto: ProductDto = {
    categoryId: 0,
    description: '',
    imageUrl: '',
    price: 0,
    productName: '',
    quantity: 0,
  };

  productUpdate: ProductUpdateDto = {
    categoryId: 0,
    productName: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
  };

  productObj: ProductResponse = {
    id: 0,
    productName: '',
    categoryId: 0,
    imageUrl: '',
    price: 0,
    quantity: 0,
    description: '',
  };

  ngOnInit(): void {
    this.loadProducts();
  }

  closeModal() {
    this.isOpenModal = false;
    this.resetForm();
  }
  openModal(product: ProductResponse) {
    this.selectedProduct = product.id;
    this.productUpdate = { ...product };

    this.isOpenModal = true;
    if (this.isOpenModal == true) {
      console.log(this.productUpdate);
    }
  }

  closeDeleteModal() {
    this.isDelete = false;
  }

  openDeleteModal(product: ProductResponse) {
    this.selectedProduct = product.id;
    console.log(this.selectedProduct);

    this.isDelete = true;
  }

  deleteProductByid(): void {
    const deleteProduct = this.productList.find(
      (product) => product.id === this.selectedProduct
    );

    this.productService.deleteProductById(this.selectedProduct).subscribe({
      next: () => {
        this.productList = this.productList.filter(
          (product) => product.id !== this.selectedProduct
        );
        this.isDelete = false;
        console.log('deleted proudct name : ' + deleteProduct?.productName);
      },
      error: (err) => {
        console.log('Deleting product is failed' + err);
      },
    });
  }

  // update product
  updateProduct(): void {
    this.productService
      .updatePrudctById(this.selectedProduct, this.productUpdate)
      .subscribe({
        next: () => {
          const findProductIndex = this.productList.findIndex(
            (product) => product.id === this.selectedProduct
          );

          if (findProductIndex != -1) {
            this.productList[findProductIndex] = {
              ...this.productList[findProductIndex],
              ...this.productUpdate,
            };
          }
          this.closeModal();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // reset form
  resetForm(): void {
    this.productUpdate = {
      categoryId: 0,
      productName: '',
      imageUrl: '',
      price: 0,
      quantity: 0,
      description: '',
    };
  }

  // get all the categories
  getAllCategory(): void {
    this.productService.getAllCategories().subscribe({
      next: (res) => {
        this.cateList = res.payload;

        if (isPlatformBrowser(this.platfomId)) {
          try {
            localStorage.setItem('categories', JSON.stringify(this.cateList));
            const saved = localStorage.getItem('categories');
            console.log('Verification - Categories retrieved:', saved);
          } catch (err) {
            console.log(err);
          }
        }
        console.log(this.cateList);
      },
      error: (err) => {},
    });
  }

  // get all the products
  loadProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(map((res) => res.payload))
      .subscribe({
        next: (res) => {
          this.productList = res;
          // this.productList = res.filter((product) => product.quantity > 0);
        },
        error: (err) => {
          console.error('Failed to load products', err);
        },
      });
  }

  // add new product
  addProduct(): void {
    const productDto = {
      categoryId: this.productObj.categoryId,
      description: this.productObj.description,
      imageUrl: this.productObj.imageUrl,
      price: this.productObj.price,
      productName: this.productObj.productName,
      quantity: this.productObj.quantity,
    };
    this.productService.createProduct(productDto).subscribe({
      next: (res) => {
        const newProduct = res.payload;
        this.loadProducts();
        this.productObj = {
          id: 0,
          productName: '',
          categoryId: 0,
          imageUrl: '',
          price: 0,
          quantity: 0,
          description: '',
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearchInput(): void {
    if (!this.searchProduct || this.searchProduct === 0) {
      this.filteredProducts = this.productList;
      this.isSearch = true;
    }
  }

  searchProductById(): void {
    if (!this.searchProduct || this.searchProduct <= 0) {
      return;
    }

    const productFound = this.productList.find((pro) => {
      pro.id === this.searchProduct;
    });

    if (productFound) {
      this.filteredProducts = [productFound];
      this.isSearch = false;
      return;
    } else {
      this.productService.getProductById(this.searchProduct).subscribe({
        next: (res) => {
          if (res.payload) {
            this.filteredProducts = [res.payload];
            this.isSearch = false;
            console.log('product found from backend: ', res.payload);
          } else {
            this.filteredProducts = [];
            this.isSearch = false;
          }
        },
        error: () => {
          this.filteredProducts = [];
          this.isSearch = false;
          console.log('Product not found with ID: ' + this.searchProduct);
        },
      });
    }
  }
}
