import { Component } from '@angular/core';
import { TokenStorageService } from "src/app/core/services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mantenimientoAPP';
  roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  name: string;
  constructor(private tokenStorageService: TokenStorageService) {}
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.name = user.name;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
