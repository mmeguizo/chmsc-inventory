import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../@core/services/connection.service';



@Injectable()
export class RoomsService {

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
  getAllRoom() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/rooms/getAllRoom', { headers: this.options });
  }

  addRoom(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/rooms/addRoom', data, { headers: this.options });
  }
  changeRoomStatus(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/rooms/changeRoomStatus', data, { headers: this.options });
  }
  updateRoom(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/rooms/updateRoom', data, { headers: this.options });
  }
  deleteRoom(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/rooms/deleteRoom', data, { headers: this.options });
  }


}
