import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  constructor(private token: TokenStorageService, private router: Router) {}

  logOut() {
    this.token.signOut();
    this.router.navigateByUrl("/login")
    // window.location.reload();
  }

  ngOnInit(): void {}
}
