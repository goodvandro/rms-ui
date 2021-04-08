import { ErrorService } from './../../error/error.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserFilter, UserService } from '../user.service';
import { LazyLoadEvent } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  loading: boolean = true;
  filter = new UserFilter();
  totalRecords: number = 0;
  users = [];

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.users = this.read();
    // this.read();
  }

  // read(page = 0): void {
  //   this.filter.page = page;

  //   this.userService.read(this.filter)
  //     .then((result) => {
  //       this.users = result.content;
  //       this.totalRecords = result.totalRecords;
  //     })
  //     .catch((error) => this.errorService.handle(error))
  //     .finally(() => this.loading = false);
  // }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.read(page);
  }

  read(page: number = 0) {
    return [
      {
        id: 1,
        username: 'root@igf.gov.st',
        password: '000000',
        passwordConfirm: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
        userCreatedId: 1,
        userUpdatedId: 1,
        person: {
          id: 1,
          name: 'Root',
          surname: 'System',
          contact: '+000 000 0000',
          address: 'Virtual Address',
          bi: '000000',
          createdAt: new Date(),
          updatedAt: new Date(),
          userCreatedId: 1,
          userUpdatedId: 1,
        }
      },

      {
        id: 1,
        username: 'ana@igf.gov.st',
        password: '123456',
        passwordConfirm: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        userCreatedId: 1,
        userUpdatedId: 1,
        person: {
          id: 1,
          name: 'Ana',
          surname: 'Maria',
          contact: '+239 990 9089',
          address: 'Vila Maria',
          bi: '123456',
          createdAt: new Date(),
          updatedAt: new Date(),
          userCreatedId: 1,
          userUpdatedId: 1,
        }
      },

      {
        id: 1,
        username: 'pedro@igf.gov.st',
        password: '123455',
        passwordConfirm: '123455',
        createdAt: new Date(),
        updatedAt: new Date(),
        userCreatedId: 1,
        userUpdatedId: 1,
        person: {
          id: 1,
          name: 'Pedro',
          surname: 'Gonçalves',
          contact: '+239 990 9089',
          address: 'Bairro 3 de fevereiro',
          bi: '123455',
          createdAt: new Date(),
          updatedAt: new Date(),
          userCreatedId: 1,
          userUpdatedId: 1,
        }
      }
    ]
  }
}
