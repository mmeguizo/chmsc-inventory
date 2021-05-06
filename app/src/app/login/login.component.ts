import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { routerTransition } from '../router.animation';
// import { AuthService } from '../@core/services/auth.service';
// import { SharedGlobalService } from '../@core/services/shared.global.service';
import { NbDialogService } from '@nebular/theme';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ConnectionService } from '../@core/services/connection.service';
import { AuthService } from '../services/auth.service';
import { TestComponent } from './modals/test/test.component';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  // animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  msg: String;
  loader = false;
  disableSubmit;
  conn;
  userID;

  messageClass;
  message;
  processing = false;
  form: FormGroup;

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 0
    });


  constructor(
    // public sgs: SharedGlobalService,
    // public authService: AuthService,
    private dialogService: NbDialogService,
    public cs: ConnectionService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToasterService,

  ) {
    // sgs.setBrowserTitle.emit('Login');
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }
  Submit() {
    const user = {
      username: this.username,
      password: this.password,
    };

  }
  // Functiont to submit form and login user
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(user).subscribe((data: any) => {

      // Check if response was a success or error
      if (!data.success) {
        // this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        // this.message = data.message; // Set error message
        //  this.toastr.error('Failed', data.message);
        this.toastr.pop('error', 'Failed', data.message);


        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting



      } else {
        // this.messageClass = 'alert alert-success'; // Set bootstrap success class
        // this.message = data.message; // Set success message
        //  this.toastr.success('Success', data.message);
        this.toastr.pop('success', 'Success', data.message);

        // Function to store user's token in client local storage
        this.authService.storeUserData(data.token, data.user, data.userToken);


        if (this.authService.CurrentlyloggedIn()) {
          console.log(this.authService.CurrentlyloggedIn());
          setTimeout(() => {
            this.router.navigate([data.role]); // Navigate to dashboard view
          }, 1000);

        } else {
          this.authService.logout()
          this.router.navigate(['login']); // Navigate to dashboard view
        }

        // After 2 seconds, redirect to dashboard page

      }
    });
  }


  showBootstrapModal() {
    // this.sgs.Modal({
    //     header: `Notice`,
    //     content: `
    //     test
    //     `,
    //     buttonName: 'close'
    //   }, { size: 'md'});
  }

  showMaterialModal() {
    this.dialogService.open(TestComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}
