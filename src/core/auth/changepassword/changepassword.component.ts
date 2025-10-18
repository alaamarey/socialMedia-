import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent  implements OnInit {



  private readonly usersService = inject(UsersService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);


  loading: WritableSignal<boolean> = signal<boolean>(false); 
  changePass$  :WritableSignal<Subscription> = signal<Subscription>(new Subscription); 
  changePassForm: WritableSignal<FormGroup> = signal<FormGroup>(new FormGroup({}));



  ngOnInit(): void {
    this.initForm() ; 
  }


  initForm(): void {

    this.changePassForm.set(this.fb.group({
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      newPassword: [null, [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    }))
  }


  changePassword(): void {
    if (this.changePassForm().valid) {
      this.changePass$().unsubscribe(); 
      this.loading.set(true); 

      this.changePass$.set(this.usersService.changePassword(this.changePassForm().value).pipe(
      finalize( ()=> this.loading.set(false))
      ).subscribe(response => {
        if (response.message === 'success') {
          localStorage.setItem('token', response.token);
          this.router.navigate(['login']); 
        }
        console.log(response);
      })  )


    }
  }


}
