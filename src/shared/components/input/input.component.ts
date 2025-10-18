import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  control: InputSignal<any> = input.required<any>();

  id: InputSignal<string> = input<string>('');

  label: InputSignal<string> = input<string>('');

  type: InputSignal<string | null > = input<string  |null>(null);

  showPassword: WritableSignal<boolean> = signal<boolean>(false);
  


}
