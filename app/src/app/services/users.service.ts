import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  options;
  public domain = "http://localhost:3000";

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

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
    return this.http.get('/users/getAllUser', { headers: this.options });
    //return this.http.get(this.domain + '/users/getAllUser', { headers: this.options });
  }


  // // Function to get the blog using the id
  // getSingleBlog(id) {
  //   this.createAuthenticationHeaders(); // Create headers
  //   return this.http.get('/blogs/singleBlog/' + id, { headers: this.options });
  // }

  // // Function to edit/update blog post
  // editBlog(blog) {
  //   this.createAuthenticationHeaders(); // Create headers
  //   return this.http.put('/blogs/updateBlog/', blog, { headers: this.options });
  // }

  // // Function to delete a blog
  // deleteBlog(id) {
  //   this.createAuthenticationHeaders(); // Create headers
  //   return this.http.delete('/blogs/deleteBlog/' + id, { headers: this.options });
  // }

  // // Function to like a blog post
  // likeBlog(id) {
  //   const blogData = { id: id };
  //   return this.http.put('/blogs/likeBlog/', blogData, { headers: this.options });
  // }

  // // Function to dislike a blog post
  // dislikeBlog(id) {
  //   const blogData = { id: id };
  //   return this.http.put('/blogs/dislikeBlog/', blogData, { headers: this.options });
  // }

  // // Function to post a comment on a blog post
  // postComment(id, comment) {
  //   this.createAuthenticationHeaders(); // Create headers
  //   // Create blogData to pass to backend
  //   const blogData = {
  //     id: id,
  //     comment: comment
  //   }
  //   return this.http.post('/blogs/comment', blogData, { headers: this.options });

  // }

}
