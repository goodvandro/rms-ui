import { Component, Input, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { ErrorService } from './../../error/error.service';
import { Address } from './../../models/address';

@Component({
  selector: 'app-fast-new',
  templateUrl: './fast-new.component.html',
  styleUrls: ['./fast-new.component.scss']
})
export class FastNewComponent implements OnInit {
  @Input() addresses = [];

  loading: boolean = false;
  display: boolean = false;
  address = new Address();
  cities = [];

  constructor(
    private addressService: AddressService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    // this.cities = this.addressService.getCities().map((city) => ({
    //   name: city.city,
    //   code: city.city
    // }))
  }

  showDialog() {
    this.display = true;
  }

  create(): void {
    this.addressService.create(this.address)
      .then((result) => {
        const address = {
          value: result,
          label: `${result.street}, ${result.city}, ${result.district}`
        }
        this.addresses.push(address);
        this.display = false;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
