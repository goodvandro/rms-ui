import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorService } from '../../error/error.service';
import { GroupFilter, GroupService } from '../group.service';
import { UserSession } from '../../models/user';
import { AuthService } from '../../auth/auth.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean;
  filter = new GroupFilter();
  totalRecords: number = 0;
  groups = [];
  userSession: UserSession;

  constructor(
    private groupService: GroupService,
    private errorService: ErrorService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (!this.authService.isAccessTokenInvalid()) {
      this.userSession = this.authService.jwtPayload.user;
    }
  }

  read(page = 0): void {
    this.loading = true;
    
    this.filter.page = page;

    this.groupService
      .read(this.filter)
      .then((result) => {
        this.groups = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = (event.first ?? 0) / (event.rows ?? 1);
    this.filter.sortField = event.sortField || 'id';
    this.filter.sortOrder = event.sortOrder === -1 ? 'asc' : 'desc';
    this.filter.rows = event.rows;
    this.read(page);
  }

  setFilter(newFilter: GroupFilter): void {
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

  confirmDelete(group: Group) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a auditoria <strong>${group.name}</strong>?`,
      key: 'customConfirmDialog',
      accept: () => {
        this.delete(group.id);
      },
    });
  }

  get isAdmin(): boolean {
    return this.userSession?.group.slug === 'admin';
  }
}
