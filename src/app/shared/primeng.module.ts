import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* PrimeNG */
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

const myModule = [ToastModule, MessagesModule, MessageModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
})
export class PrimengModule {}
