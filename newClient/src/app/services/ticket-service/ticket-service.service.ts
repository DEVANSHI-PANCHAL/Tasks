import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket-model/ticket.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  selectedTicket: Ticket;
  Tickets: Ticket[];
  baseURL = 'http://localhost:8080/tickets';
  constructor(private http: HttpClient) { }
  getTicketList() {
    return this.http.get(this.baseURL);
  }
  createTicket(Ticket: Ticket) {

    return this.http.post(this.baseURL, Ticket);
  }

  putTicket(Ticket: Ticket) {
    return this.http.patch(this.baseURL + `/${Ticket._id}`, Ticket);
  }

  deleteTicket(element:Ticket) {

    return this.http.post('http://localhost:8080/tickets/delete', element);
  }
}
