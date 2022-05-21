import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService:AuthService
    ) {
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) {
           // this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            userType:['',Validators.required]
        });

    }

    // convenience getter for easy access to form fields

    onSubmit() {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
    }
}
