import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupWork } from 'src/app/models/group-work';
import { ErrorService } from './../../error/error.service';
import { User } from './../../models/user';
import { UserService } from './../../user/user.service';
import { GroupWorkService } from './../group-work.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;
  groupWork = new GroupWork();
  users = [];

  constructor(
    private groupWorkService: GroupWorkService,
    private userService: UserService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dropdownUsers();
  }

  async dropdownUsers() {
    await this.userService.readAll()
      .then(async (result) => {
        this.users = await result.map((element: User) => ({
          value: element,
          label: `${element.person.name} ${element.person.surname}`
        }));
      })
      .catch((error) => this.errorService.handle(error))
  }

  create(): void {
    this.loading = true;

    this.groupWorkService.create(this.groupWork)
      .then((result) => {
        this.toastr.success('Grupo de trabalho adicionado!');
        this.router.navigate(['/group-work/index', result.id]);
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
