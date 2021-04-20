import { Address } from './../../models/address';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entity } from 'src/app/models/entity';
import { AddressService } from './../../address/address.service';
import { EntityLevelService } from './../../entity-level/entity-level.service';
import { ErrorService } from './../../error/error.service';
import { EntityService } from './../entity.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;

  entity = new Entity();

  addresses = [];
  levels = [];

  constructor(
    private entityService: EntityService,
    private addressService: AddressService,
    private entityLevelService: EntityLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
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
    this.addressService.readAll()
      .then(result => this.addresses = result.map((element: Address) => ({
        value: element,
        label: `${element.street}, ${element.city}, ${element.district}`
      })))
      .catch((error) => this.errorService.handle(error))
  }

  create(): void {
    this.entityService.create(this.entity)
      .then((result) => {
        this.router.navigate(['/entity/show', result.id]);
        this.toastr.success('Grupo adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
