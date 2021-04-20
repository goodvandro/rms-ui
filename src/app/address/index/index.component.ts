import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { AddressFilter, AddressService } from './../address.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  filter = new AddressFilter();
  totalRecords: number = 0;
  addresses = [];

  constructor(
    private addressService: AddressService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(page = 0): void {
    this.filter.page = page;

    this.addressService.read(this.filter)
      .then((result) => this.addresses = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.read(page);
  }
}