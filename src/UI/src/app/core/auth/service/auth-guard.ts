import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard = () => {
  const currentUserService = inject(AuthService);
  const router = inject(Router);

  if (!currentUserService.isSignedIn) {
    return false;
  } else {
    router.navigate(['/auth/login']);
    return true;
  }
};
