import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket-model/ticket.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { TicketService } from 'src/app/services/ticket-service/ticket-service.service';
import { TicketTableComponent } from '../ticket-table/ticket-table.component';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit {
  constructor(
    public ticketservice:TicketService,
    public authService:AuthService,
    public router : Router,
   
    public dialog:MatDialog
  ) { 
    this.ticketservice.selectedTicket ={
      _id:''  , 
      description:'',
      name:authService?.user?.name, 
      createdAt:'',
      creator:authService.user._id,
      DeletedAt:'',
      updatedAt:'',
      Resolved:false,
      Date:null,


    }

    
    
   
  }

  ngOnInit(): void {
    this.authService.loggedIn();
    let table = new TicketTableComponent(this.dialog,this.ticketservice,this.authService)
    
  }
  onCreateTicketSubmit(form:NgForm){

    form.value.creator = this.authService.user._id;
    form.value.name = this.authService.user.name;
    if(form.value._id == "" || form.value._id == null){
     
    this
    .ticketservice
    .createTicket(form.value)
    .subscribe(res => {
      this.reloadCurrentRoute()
      
    })
   }
   else{
   
    this.ticketservice.putTicket(form.value).subscribe((res) => {
      this.reloadCurrentRoute()
      })
   }
  }

  reloadCurrentRoute() {
  window.location.reload()
}
  
  // onClose(){
  //   this.dialog.close();
  //   this.ticketComponent.getAllData();
  // }
  
}
