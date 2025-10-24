import { Component, ElementRef, inject, OnInit, Renderer2, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite, Modal } from 'flowbite';
import { UsersService } from '../../../auth/services/users.service';
import { User } from './models/userres.interface';

@Component({
  selector: 'navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  private readonly usersService = inject(UsersService);
  private readonly renderer = inject(Renderer2);


  private modal: WritableSignal<Modal | null> = signal<Modal | null>(null);
  userData: WritableSignal<User> = signal<User>({} as User);
  imageSrc: WritableSignal<string | ArrayBuffer | null> = signal<string | ArrayBuffer | null>(null);
  updatePhoto: WritableSignal<File | string> = signal<File | string>('');
  mode: Signal<ElementRef | undefined> = viewChild('mode');


  private uplaodPhotoModal: Signal<ElementRef | undefined> = viewChild<ElementRef | undefined>('uploadPhoto');


  ngOnInit(): void {
    initFlowbite();
    this.getLoggedUserData();
    this.applyInitialTheme();
  }

  ngAfterViewInit() {
    if (this.uplaodPhotoModal()) {
      this.modal.set(new Modal(this.uplaodPhotoModal()?.nativeElement));
    }
  }

  changePhoto(inputElement: HTMLInputElement): void {
    this.updatePhoto.set(inputElement.files ? inputElement.files[0] : ' ')

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc.set(reader.result)
    }
    reader.readAsDataURL(this.updatePhoto() as File)
  }


  uploadUserPhoto(e: SubmitEvent) {
    e.preventDefault();
    const upload = (e.submitter as HTMLButtonElement).value;
    const decline = (e.submitter as HTMLButtonElement).value;

    if (decline === 'decline') {
      this.closeModal();
    }


    else if (upload === 'upload') {
      const formData = new FormData();
      formData.append('photo', this.updatePhoto());

      if (this.updatePhoto()) {
        console.log(this.updatePhoto());
        this.usersService.uploadProfilePhote(formData).subscribe(response => {
          if (response.message === 'success') {
            // template اعدل علي 
            this.getLoggedUserData();
            this.closeModal();
            console.log(response);
          }
        })
      }
      else {
        this.closeModal()
      }


    }
  }









  getLoggedUserData(): void {
    this.usersService.getLoggedUserData().subscribe(response => {
      if (response.message === 'success') {
        this.userData.set(response.user);
        this.imageSrc.set(this.userData().photo);
        console.log(response);
      }
    })
  }

  closeModal() {
    this.modal()?.hide()
  }

  openModal() {
    this.modal()?.show();
  }

  signOut(): void {
    this.usersService.signOut();
  }



  changeMode() {
    //  هضيف القمر
    if (this.mode()?.nativeElement.title === 'light') {
      this.changeClasses('dark', 'fa-sun', 'fa-moon');
      this.renderer.addClass(document.documentElement, 'dark');
    }
    //  هضيف الشمس 
    else {
      this.changeClasses('light', 'fa-moon', 'fa-sun')
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }

  private changeClasses(changedToClass: string, sunClass: string, moonClass: string) {
    this.renderer.setAttribute(this.mode()?.nativeElement, 'title', changedToClass);
    this.renderer.removeClass(this.mode()?.nativeElement, sunClass);
    this.renderer.addClass(this.mode()?.nativeElement, moonClass);
    localStorage.setItem('theme', changedToClass);
    localStorage.setItem('logo', moonClass);
  }

  private applyInitialTheme(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');

    const isDark =
      storedTheme === 'dark' && localStorage.getItem('logo') === 'fa-moon' ||
      (!storedTheme && prefersDark);

    if (isDark) {
      this.renderer.addClass(document.documentElement, 'dark');
      this.renderer.addClass(this.mode()?.nativeElement, 'fa-moon');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
      this.renderer.addClass(this.mode()?.nativeElement, 'fa-sun');

    }
  }
}
