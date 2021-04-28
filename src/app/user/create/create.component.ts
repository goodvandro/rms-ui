import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AddressService } from './../../address/address.service';
import { EntityService } from './../../entity/entity.service';
import { ErrorService } from './../../error/error.service';
import { GroupService } from './../../group/group.service';
import { Address } from './../../models/address';
import { Entity } from './../../models/entity';
import { Group } from './../../models/group';
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
  groups = [];
  entities = [];

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private entityService: EntityService,
    private groupService: GroupService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dropdownAddresses();
    this.dropdownGroups();
    this.dropdownEntities();
  }

  async dropdownGroups() {
    await this.groupService.readAll()
      .then(async (result) => {
        this.groups = await result.map((element: Group) => ({
          value: element,
          label: element.name
        }));
        this.loadDefaultGroup(result);
      })
      .catch((error) => this.errorService.handle(error))
  }

  dropdownAddresses(): void {
    this.addressService.readAll()
      .then(result => this.addresses = result.map((element: Address) => ({
        value: element,
        label: `${element.street}, ${element.city}, ${element.district}`
      })))
      .catch((error) => this.errorService.handle(error))
  }

  dropdownEntities() {
    this.entityService.readAll()
      .then((result) =>
        this.entities = result.map(
          (entity: Entity) => ({ value: entity, label: entity.name })
        )
      )
  }

  loadDefaultGroup(groups: Group[]) {
    groups.forEach((element) => {
      if (element.slug === 'default') {
        this.user.groups.push(element);
      }
    })
  }

  create(): void {
    this.loading = true;
    this.user.username = this.user.person.email;
    this.userService.create(this.user)
      .then((result) => {
        this.router.navigate(['/user/index', result.id]);
        this.toastr.success('Utilizador adicionado!');
        this.toastr.info('Uma senha temporária foi enviada para o e-mail do utilizador!', '', {
          timeOut: 20000
        });
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
