import { inject } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard = () => {
  const currentUserService = inject(AuthService);
  const router = inject(Router);

  if (currentUserService.isSignedIn()) {
    return true;
  }

  router.navigate(['/auth/login']);

  return false;
};
