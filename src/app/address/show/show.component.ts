import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { ErrorService } from './../../error/error.service';
import { AddressService } from './../address.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  address = new Address();
  id = this.route.snapshot.params.id;

  constructor(
    private userService: AddressService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getById(this.id);
  }

  getById(id: number): void {
    this.userService.getById(id)
      .then((result) => this.address = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(): void {
    this.loading = true;

    this.userService.update(this.id, this.address)
      .then((result) => {
        this.address = result;
        this.toastr.success('Endereço salvo!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
