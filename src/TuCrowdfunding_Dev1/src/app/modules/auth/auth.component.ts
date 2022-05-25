import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';


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
        private authService:AuthService,
        private SocialauthService: SocialAuthService,
        private userService:UserService,
        private router:Router

    ) {
        // redirect to home if already logged in
        //if (this.authenticationService.currentUserValue) {
           // this.router.navigate(['/']);
        //}
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            Email: ['', Validators.required],
            Password: ['', Validators.required],
            IsEntrepreneur:['',Validators.required]
        });
    }

    // convenience getter for easy access to form fields

    onSubmit() {
      this.authService.login(this.loginForm.value).then((resolve)=>{

        if(this.loginForm.value['IsEntrepreneur']=='true'){


          localStorage.setItem('userType','entrepreneur')
        }
        else{
          localStorage.setItem('userType','contributor')

        }
        this.router.navigate(['ideas/proyectos'])
      },
      (reject)=>{


      })


    }
    signInHandler(): void {
      localStorage.setItem('userType','contributor')
      this.SocialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {

        const createUser={
          "name": data.name,
          "username": data.email,
          "email": data.email,
          "password": data.id,
          "money": 0,
          "donations": [
          ],
          "projectOfInterest": [
          ],
          "chats": [
          ]
        }
        const login={
          "email":data.email,
          "password":data.id,
          "userType":false
        }

          this.authService.login(login).then((response)=>{


          },
          (reject)=>{

            this.userService.createUser(createUser).then((resolve=>{
              this.authService.login(login)
            }))

          })
          .catch((failed)=>{


          })




      });
    }
}
