import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../@core/services/connection.service';



@Injectable()
export class InventoryService {

  options;
  //public domain = "http://localhost:3000";
  public domain
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private connection: ConnectionService,
  ) {

    this.domain = this.connection.domain

  }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new HttpHeaders({
      'Content-Type': 'application/json', // Format set to JSON
      'authorization': this.authService.authToken // Attach token
    });
  }



  // Function to get all blogs from the database
  getAllInventory() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/rooms/getAllInventory', { headers: this.options });
  }

  addInventory(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/rooms/addInventory', data, { headers: this.options });
  }
  changeInventoryStatus(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/rooms/changeInventoryStatus', data, { headers: this.options });
  }
  updateInventory(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/rooms/updateInventory', data, { headers: this.options });
  }
  deleteInventory(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/rooms/deleteInventory', data, { headers: this.options });
  }


}
