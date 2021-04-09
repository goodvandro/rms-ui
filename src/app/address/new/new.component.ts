import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { Address } from './../../models/address';
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;
  address = new Address();

  constructor(
    private userService: AddressService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.userService.create(this.address)
      .then((result) => {
        this.router.navigate(['/address/index', result.id]);
        this.toastr.success('Endereço adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
