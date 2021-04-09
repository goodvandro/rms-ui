import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/error/error.service';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { AddressService } from './../../address/address.service';
import { Address } from './../../models/address';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  loading: boolean = false;
  user = new User();
  id = this.route.snapshot.params.id;
  addresses = [];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dropdownAddresses();
    this.getById(this.id);
  }

  dropdownAddresses(): void {
    this.addressService.readAll()
      .then(result => this.addresses = result.map((address: Address) => ({
        value: address.id,
        label: `${address.street}, ${address.city}, ${address.district}`
      })))
      .catch((error) => this.errorService.handle(error))
  }

  getById(id: number): void {
    this.userService.getById(id)
      .then((result) => this.user = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(): void {
    this.loading = true;

    this.userService.update(this.id, this.user)
      .then((result) => {
        this.user = result;
        this.toastr.success('Utilizador salvo!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
