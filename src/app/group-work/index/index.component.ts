import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { GroupWorkFilter } from './../group-work-filter-resource';
import { GroupWorkService } from './../group-work.service';
import { UserSession } from '../../models/user';
import { AuthService } from '../../auth/auth.service';
import { GroupWork } from '../../models/group-work';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  filter = new GroupWorkFilter();
  totalRecords: number = 0;
  groupWorks = [];
  userSession: UserSession;

  constructor(
    private groupService: GroupWorkService,
    private errorService: ErrorService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.read();
  }

  read(): void {
    if (!this.loading) this.loading = true;
    if (!this.authService.isAccessTokenInvalid()) {
      this.userSession = this.authService.jwtPayload.user;
    }

    this.groupService
      .read(this.filter)
      .then((result) => {
        this.groupWorks = result;
        this.totalRecords = this.groupWorks.length;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  setFilter(newFilter: GroupWorkFilter): void {
    this.filter = newFilter;
    this.read();
  }

  delete(id: number): void {
    this.groupService
      .delete(id)
      .then(() => {
        this.read();
      })
      .catch((error) => this.errorService.handle(error));
  }

  confirmDelete(audit: GroupWork) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a equipa de trabalho?`,
      key: 'customConfirmDialog',
      accept: () => {
        this.delete(audit.id);
      },
    });
  }

  get isAdmin(): boolean {
    return this.userSession?.group.slug === 'admin';
  }
}
