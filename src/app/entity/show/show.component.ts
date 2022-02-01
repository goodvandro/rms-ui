// import { Address } from './../../models/address';
import { EntityLevel } from './../../models/entity-level';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntityService } from '../entity.service';
// import { AddressService } from './../../address/address.service';
import { EntityLevelService } from './../../entity-level/entity-level.service';
import { ErrorService } from './../../error/error.service';
import { Entity } from './../../models/entity';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  entity = new Entity();
  id = this.route.snapshot.params.id;

  addresses = [];
  levels = [];

  constructor(
    private entityService: EntityService,
    // private addressService: AddressService,
    private entityLevelService: EntityLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.dropdownAddresses();
    this.dropdownLevels();
    this.getById(this.id);
  }

  dropdownLevels(): void {
    this.entityLevelService.readAll()
      .then(result => this.levels = result.map((level: EntityLevel) => ({
        value: level,
        label: level.name
      })))
      .catch((error) => this.errorService.handle(error))
  }

  // dropdownAddresses(): void {
  //   this.addressService.readAll()
  //     .then(result => this.addresses = result.map((element: Address) => ({
  //       value: element,
  //       label: `${element.street}, ${element.city}, ${element.district}`
  //     })))
  //     .catch((error) => this.errorService.handle(error))
  // }

  getById(id: number): void {
    this.entityService.getById(id)
      .then((result) => this.entity = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(): void {
    this.loading = true;

    this.entityService.update(this.id, this.entity)
      .then((result) => {
        this.entity = result;
        this.toastr.success('Entidade adicionada!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
