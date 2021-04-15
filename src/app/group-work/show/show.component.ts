import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { ErrorService } from './../../error/error.service';
import { GroupWork } from './../../models/group-work';
import { UserService } from './../../user/user.service';
import { GroupWorkService } from './../group-work.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  groupWork = new GroupWork();
  id = this.route.snapshot.params.id;
  users = [];

  constructor(
    private groupService: GroupWorkService,
    private userService: UserService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dropdownUsers();
    this.getById(this.id);
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

  getById(id: number): void {
    this.groupService.getById(id)
      .then((result) => this.groupWork = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(): void {
    this.loading = true;

    this.groupService.update(this.id, this.groupWork)
      .then((result) => {
        this.groupWork = result;
        this.toastr.success('Grupo salvo!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
