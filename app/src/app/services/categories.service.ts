import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from '../@core/services/connection.service';
import { Observable } from 'rxjs';



@Injectable()
export class CategoryService {

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
  getAllCategory() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/categories/getAllCategory', { headers: this.options });
  }

  addCategory(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/categories/addCategory', data, { headers: this.options });
  }
  changeCategoryStatus(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/categories/changeCategoryStatus', data, { headers: this.options });
  }
  updateCategory(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/categories/updateCategory', data, { headers: this.options });
  }
  deleteCategory(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/categories/deleteCategory', data, { headers: this.options });
  }


}
