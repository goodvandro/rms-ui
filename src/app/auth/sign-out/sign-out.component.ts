import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/error/error.service';
import { SignOutService } from '../sign-out.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  name = 'Evandro';
  surname = 'Monteiro';
  initial = (`${this.name.charAt(0)}${this.surname.charAt(0)}`).toUpperCase();

  constructor(
    private signOutService: SignOutService,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.signOutService.signOut()
      .then(() => this.toastr.info('Adeus!'))
      .catch((error) => this.errorService.handle(error))
  }
}
