import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {


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
          name:['',Validators.required],
          username:['',Validators.required],
          passwordConfirm:['',Validators.required],
          address:['',Validators.required],
      });
  }

  // convenience getter for easy access to form fields

  onSubmit() {
    if(this.loginForm.status=='VALID'){
      if(this.loginForm.value['passwordConfirm']==this.loginForm.value['Password']){

        const Request={
          "name": this.loginForm.value.name,
          "username": this.loginForm.value.username,
          "email": this.loginForm.value.Email,
          "password": this.loginForm.value.Password,
          "address": this.loginForm.value.address,
          "money": 0,
          "donations": [],
          "projectOfInterest": [],
          "chats": []
        }
        this.userService.createUser(Request).then((resolve)=>{
          alert('Usuario Creado con exito')
          const login={
            "email": this.loginForm.value.Email,
            "password": this.loginForm.value.Password,
            "IsEntrepreneur":false
          }
          this.authService.login(login).then((logged)=>{
            localStorage.setItem('userType','contributor')
            this.router.navigate(['ideas/proyectos'])
          })
              })
      }
    }
    else{
      alert('Por favor diligencia correctamente el formulario de registro')
    }



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

          this.router.navigate(['ideas/proyectos'])
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
