import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart-service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, public authService: AuthService, public _cartService: ShoppingCartService) {

  }
  logout() {
    localStorage.removeItem('displayName');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('isAdmin');

    this.router.navigateByUrl('/');
  }
}
