import { Group } from './../../models/group';
import { GroupService } from './../../group/group.service';
import { Address } from './../../models/address';
import { AddressService } from './../../address/address.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { ErrorService } from './../../error/error.service';
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

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private groupService: GroupService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dropdownAddresses();
    this.dropdownGroups();
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

  loadDefaultGroup(groups: Group[]) {
    groups.forEach((element) => {
      if (element.slug === 'default') {
        this.user.groups.push(element);
      }
    })
  }

  create(): void {
    this.user.username = this.user.person.email;
    this.userService.create(this.user)
      .then((result) => {
        this.router.navigate(['/user/index', result.id]);
        this.toastr.success('Utilizador adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
