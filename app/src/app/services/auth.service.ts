import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
//map is not working if not imported
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConnectionService } from '../@core/services/connection.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //public domain = "http://localhost:3000";
  //public domain = "cryptic-anchorage-20422.herokuapp.com:3000";
  public domain
  authToken;
  user;
  options;
  fulluserloggedData: any[];



  constructor(

    private router: Router,
    public connection: ConnectionService,
    public location: Location,
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    public toasted: NbToastrService

  ) {

    this.domain = this.connection.domain;

  }

  public Notifytoast(status: NbComponentStatus, body, title, duration, position) {
    this.toasted.show(body, title, { status, duration, position });
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }




  createAuthenticationHeaders() {

    this.loadToken();
    this.options = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authToken,
    })

  }


  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }


  loadFullData() {
    let data = []
    try {
      data.push(JSON.parse(localStorage.getItem('fulluserloggedData')))
    } catch (ex) {
      console.error(ex);
    }
    return data;
  }


  registerUser(user) {
    // return this.http.post('/authentication/register', user)
    return this.http.post(this.domain + '/authentication/register', user)
  }


  checkUsername(username) {
    // return this.http.get('/authentication/checkUsername/' + username);
    return this.http.get(this.domain + '/authentication/checkUsername/' + username);
  }



  checkEmail(email) {
    // return this.http.get('/authentication/checkEmail/' + email)
    return this.http.get(this.domain + '/authentication/checkEmail/' + email)
  }

  // Function to login user
  login(user) {
    // return this.http.post('/authentication/login', user)
    return this.http.post(this.domain + '/authentication/login', user)

  }


  logout() {
    this.authToken = null;
    this.user = null;
    this.fulluserloggedData = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  CurrentlyloggedIn() {
    const token = localStorage.getItem('token');
    // this.router.navigate(['/main/dashboard']);
    return !this.jwtHelper.isTokenExpired(token)

  }



  // Function to store user's data in client local storage
  storeUserData(token, user, tokenUsername) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('tokenUsername', user.username); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    // localStorage.setItem('fulluserloggedData', JSON.stringify(data)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere


  }


  getTokenUsername() {
    return localStorage.getItem('tokenUsername');
  }


  getProfile() {

    //this.options => is not working but with {headers : this.options} is working i read it i guess in angular docs
    //'@auth0/angular-jwt'; is adding 'Bearer ' in token so i removed it manually
    this.createAuthenticationHeaders()
    //return this.http.get('/authentication/profile', { headers: this.options })
    return this.http.get(this.domain + '/authentication/profile', { headers: this.options })


  }

  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    // return this.http.get('/authentication/publicProfile/' + username, { headers: this.options });
    return this.http.get(this.domain + 'authentication/publicProfile/' + username, { headers: this.options });

  }



  public back() {
    this.location.back();
  }



}


/*





  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user) {
    // return this.http.post('/authentication/register', user)
    return this.http.post(this.domain + '/authentication/register', user)
  }


  checkUsername(username) {
    // return this.http.get('/authentication/checkUsername/' + username);
    return this.http.get(this.domain + '/authentication/checkUsername/' + username);
  }



  checkEmail(email) {
    //return this.http.get('/authentication/checkEmail/' + email)
    return this.http.get(this.domain + '/authentication/checkEmail/' + email)
  }

  // Function to login user
  login(user) {
    //  return this.http.post('/authentication/login', user)
    return this.http.post(this.domain + '/authentication/login', user)
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

  }

  CurrentlyloggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token)
  }


  // Function to store user's data in client local storage
  storeUserData(token, user, tokenUsername) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('tokenUsername', user.username); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  getTokenUsername() {
    return localStorage.getItem('tokenUsername');
  }


  getProfile() {

    //this.options => is not working but with {headers : this.options} is working i read it i guess in angular docs
    //'@auth0/angular-jwt'; is adding 'Bearer ' in token so i removed it manually
    this.createAuthenticationHeaders()
    // return this.http.get('/authentication/profile', { headers: this.options })
    return this.http.get(this.domain + '/authentication/profile', { headers: this.options })

  }

  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/publicProfile/' + username, { headers: this.options });
  }




*/
