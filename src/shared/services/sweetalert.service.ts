import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  confirm(action: string, callback: () => void) {
    Swal.fire({
      title: `Are you sure you want to ${action}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) callback();
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your file is safe 🙂', 'error');
      }
    });
  }

}
