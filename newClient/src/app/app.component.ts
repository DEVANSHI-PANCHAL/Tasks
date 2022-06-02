import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from './pages/ticket/ticket-dialog/ticket-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newClient';
  constructor(public dialog: MatDialog){}
  
  openDialog() {
    this.dialog.open(TicketDialogComponent);
  }
}
