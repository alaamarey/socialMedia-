import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { finalize, Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  signupForm: WritableSignal<FormGroup> = signal<FormGroup>(new FormGroup({}));
  loading: WritableSignal<boolean> = signal<boolean>(false);
  signUp$: WritableSignal<Subscription> = signal<Subscription>(new Subscription());
  errorMsg: WritableSignal<string> = signal<string>('')

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.signupForm.set(
      this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
        rePassword: ['', Validators.required],
        dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)]],
        gender: ['', Validators.required]
      }, { validator: this.confirmPassword }))
  }


  // try seperate function  in a file
  confirmPassword(group: AbstractControl): any {
    const rePasswordErrors = group.get('rePassword')?.errors || {};
    if (group.get('password')?.value === group.get('rePassword')?.value) return null;
    group.get('rePassword')?.setErrors({ ...rePasswordErrors, mismatch: true })
    return { mismatch: true };
  }


  submitForm() {
    if (this.signupForm()?.valid) {
      console.log(this.signupForm());
      this.signUp$().unsubscribe();

      this.loading.set(true);
      this.signUp$.set(
        this.usersService.signUp(this.signupForm()?.value).pipe(
          finalize(() => this.loading.set(false))).subscribe({
            next: (
              response => {
                if (response.message === 'success') {
                  console.log(response);
                  this.router.navigate(['login']);
                }
        
              }),
            error: (error => {
              this.errorMsg.set(error.error.error); 
            })  
          }))
    } else {
      this.signupForm().markAllAsTouched(); 
    }
  }
}
