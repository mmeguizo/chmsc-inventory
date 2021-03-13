import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../@core/services/connection.service';



@Injectable()
export class UserService {

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
  getAllUser() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/users/getAllUser', { headers: this.options });
  }


  addUser(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/users/addUser', data, { headers: this.options });
  }
  changeStatus(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/users/changeStatus', data, { headers: this.options });
  }
  updateUser(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/users/updateUser', data, { headers: this.options });
  }
  deleteUser(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/users/deleteUser', data, { headers: this.options });
  }


}
