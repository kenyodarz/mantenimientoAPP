import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* PrimeNG */
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const myModule = [
  ToastModule,
  MessagesModule,
  MessageModule,
  TableModule,
  PanelModule,
  MenubarModule,
  InputTextModule,
  ButtonModule,
  DialogModule,
  DropdownModule,
  ConfirmDialogModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
})
export class PrimengModule {}
