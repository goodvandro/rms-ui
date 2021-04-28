import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/error/error.service';
import { Entity } from 'src/app/models/entity';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { AddressService } from './../../address/address.service';
import { EntityService } from './../../entity/entity.service';
import { GroupService } from './../../group/group.service';
import { Address } from './../../models/address';
import { Group } from './../../models/group';

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
  groups = [];
  entities = [];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private groupService: GroupService,
    private entityService: EntityService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dropdownEntities();
    this.dropdownAddresses();
    this.dropdownGroups();
    this.getById(this.id);
  }

  dropdownGroups(): void {
    this.groupService.readAll()
      .then(result => this.groups = result.map((group: Group) => ({
        value: group,
        label: group.name
      })))
      .catch((error) => this.errorService.handle(error))
  }

  dropdownAddresses(): void {
    this.addressService.readAll()
      .then(result => this.addresses = result.map((address: Address) => ({
        value: address.id,
        label: `${address.street}, ${address.city}, ${address.district}`
      })))
      .catch((error) => this.errorService.handle(error))
  }

  dropdownEntities() {
    this.entityService.readAll()
      .then((result) => this.entities = result.map((entity: Entity) => ({
        value: entity.id,
        label: entity.name
      })))
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
