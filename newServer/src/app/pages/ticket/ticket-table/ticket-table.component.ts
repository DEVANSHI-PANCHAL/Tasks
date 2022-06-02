import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { TicketTableDataSource, TicketTableItem, EXAMPLE_DATA } from './ticket-table-datasource';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';
import { Ticket } from 'src/app/models/ticket-model/ticket.model';
import { TicketService } from 'src/app/services/ticket-service/ticket-service.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})


export class TicketTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TicketTableItem>;
  
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['resolved','name','description', 'createdAt','updatedAt','actions'];
  dataSource = new MatTableDataSource<Ticket>()

  constructor(public dialog: MatDialog,public ticketservice:TicketService,public authService:AuthService) {  
   
  }

  ngOnInit(): void {
   
    this.getAllData();
  }

  openDialog() {
    this.dialog.open(TicketDialogComponent);
  
}

   getAllData() {
     this.ticketservice.getTicketList().subscribe((res) => {
      
      
       this.ticketservice.Tickets = res as Ticket[];
       this.dataSource = new MatTableDataSource(this.ticketservice.Tickets);
       console.log(this.dataSource)
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;

     })
   
   }

   onEdit(editVar: Ticket){
     this.ticketservice.selectedTicket = editVar;
    
   }
   onDelete(deleteVar: Ticket){
     this.ticketservice.deleteTicket(deleteVar).subscribe((res) =>{
      
       this.getAllData()
     })
   }
  
  // onClose(){
    
  //   this.getAllData();
  //   console.log(this.getAllData())
  // }
    

  }