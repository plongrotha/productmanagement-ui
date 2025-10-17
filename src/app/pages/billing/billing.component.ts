import { Component, inject } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductResponse } from '../../models/product.model';
import { map } from 'rxjs';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order.service';
import {
  OrderItemRequest,
  OrderItemResponse,
  CartItem,
  OrderRequest,
  OrderResponse,
} from '../../models/order.model';

@Component({
  selector: 'app-billing',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent {
  productList: ProductResponse[] = [];
  cartItems: CartItem[] = [];
  isOrderPlaced: boolean = false;
  lastOrderDetails: OrderResponse | null = null;

  private productService = inject(ProductServiceService);
  private orderService = inject(OrderService);

  constructor() {
    this.loadProducts();
  }

  addOrderItem(product: ProductResponse): void {
    // Check if product already exists in cart
    const existingItem = this.cartItems.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      // Increment quantity if product already in cart
      existingItem.quantity += 1;
      if (existingItem.quantity === 0) {
      }
      existingItem.totalPrice =
        existingItem.quantity * existingItem.pricePerUnit;
    } else {
      // Add new item to cart
      const newCartItem: CartItem = {
        orderItemId: this.cartItems.length + 1,
        productId: product.id,
        productName: product.productName,
        imageUrl: product.imageUrl,
        quantity: 1,
        pricePerUnit: product.price,
        totalPrice: product.price,
      };
      this.cartItems.push(newCartItem);
    }
  }

  removeOrderItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      item.totalPrice = item.quantity * item.pricePerUnit;
    } else if (newQuantity === 0) {
      // Remove item if quantity reaches 0
      const index = this.cartItems.findIndex(
        (i) => i.orderItemId === item.orderItemId
      );
      if (index > -1) {
        this.removeOrderItem(index);
      }
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  getShipping(): number {
    // Free shipping for orders over $50, otherwise $5
    return this.getSubtotal() > 50 ? 0 : 5;
  }

  getTaxes(): number {
    // 10% tax rate
    return this.getSubtotal() * 0.1;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShipping() + this.getTaxes();
  }

  loadProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(map((res) => res.payload))
      .subscribe({
        next: (res) => {
          this.productList = res;
        },
        error: (err) => {
          console.error('Failed to load products', err);
        },
      });
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      return;
    }

    // Transform cart items to order request format
    const orderRequest: OrderRequest = {
      orderItems: this.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    // Call your order service to place the order
    this.orderService.createOrder(orderRequest).subscribe({
      next: (response) => {
        // Store order details
        this.lastOrderDetails = response.payload;
        this.isOrderPlaced = true;

        // Clear cart
        this.cartItems = [];

        // Show success message
      },
      error: (err) => {
        console.error('Failed to place order', err);
      },
    });
  }

  continueShopping(): void {
    this.isOrderPlaced = false;
    this.lastOrderDetails = null;
  }

  getProductImage(productId: number): string {
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId
    );
    if (cartItem?.imageUrl) {
      return cartItem.imageUrl;
    }

    const product = this.productList.find((p) => p.id === productId);
    return product?.imageUrl || 'https://via.placeholder.com/80';
  }
}
