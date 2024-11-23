import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export let authenticatedGuard: CanMatchFn = (route, segments) => {
  return true;
};
