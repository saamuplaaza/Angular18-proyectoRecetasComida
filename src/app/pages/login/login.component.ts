import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService)
  router = inject(Router)

  constructor() {
    effect(() => {
      if (this.auth.$isLoggedIn()) {
        this.router.navigate(["landing"])
      } else {
        this.router.navigate(["login"])
      }
    })
  }

  login() {
    if (this.auth.$isLoggedIn()) return
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
