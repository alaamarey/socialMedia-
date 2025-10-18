import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription, finalize } from 'rxjs';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {




  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UsersService);
  private readonly router = inject(Router);

  signInForm: WritableSignal<FormGroup> = signal<FormGroup>(new FormGroup({}));
  signIn$: WritableSignal<Subscription> = signal<Subscription>(new Subscription());
  loading: WritableSignal<boolean> = signal<boolean>(false);
  errorMsg  : WritableSignal<string> = signal<string>('')


  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.signInForm.set(this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    }))
  }



  signIn(): void {
    if (this.signInForm().valid) {
      this.signIn$().unsubscribe();
      this.loading.set(true);


      this.signIn$.set(this.userService.signIn(this.signInForm().value).pipe(
        finalize(() => this.loading.set(false))
      ).subscribe({
        next: (
          response => {
            console.log(response);
            if (response.message === 'success') {
              localStorage.setItem('token', response.token);
              this.router.navigate(['timeline'])

            }


          }

        ),
        error: (error => {
          this.errorMsg.set(error.error.error); 
        })
      })
      )






    } else {
      this.signInForm().markAllAsTouched();
    }
  }





}
