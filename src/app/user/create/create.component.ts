import { Address } from './../../models/address';
import { AddressService } from './../../address/address.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { ErrorService } from './../../error/error.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  loading: boolean = false;
  user = new User();
  addresses = [];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dropdownAddresses();
  }

  dropdownAddresses(): void {
    this.addressService.readAll()
      .then(result => this.addresses = result.map((address: Address) => ({
        value: address.id,
        label: `${address.street}, ${address.city}, ${address.district}`
      })))
      .catch((error) => this.errorService.handle(error))
  }

  create(): void {
    this.user.username = this.user.person.email;
    this.userService.create(this.user)
      .then((result) => {
        this.router.navigate(['/user/index', result.id]);
        this.toastr.success('Utilizador adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
