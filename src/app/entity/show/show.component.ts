import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntityService } from '../entity.service';
import { AddressService } from './../../address/address.service';
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
    private addressService: AddressService,
    private entityLevelService: EntityLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dropdownAddresses();
    this.dropdownLevels();
  }

  dropdownLevels(): void {
    this.levels = this.entityLevelService.JSON()
      .map((level) => ({ value: level.id, label: level.name }))
  }

  dropdownAddresses(): void {
    this.addresses = this.addressService.JSON()
      .map((address) => ({ value: address.id, label: address.name }))
  }


  getById(id: number): void {
    this.entityService.getById(id)
      .then((result) => this.entity = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(id: number): void {
    this.loading = true;

    this.entityService.update(id, this.entity)
      .then((result) => {
        this.entity = result;
        this.toastr.success('Entidade adicionada!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
