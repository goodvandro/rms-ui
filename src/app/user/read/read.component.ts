import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { UserFilter } from '../user-filter-resource';
import { UserService } from '../user.service';
import { ErrorService } from './../../error/error.service';
import { User, UserSession } from '../../models/user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  loading: boolean;
  filter = new UserFilter();
  totalRecords: number = 0;
  users = [];
  userSession: UserSession;

  constructor(
    private userService: UserService,
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
    if (!this.loading) this.loading = true;

    this.filter.page = page;

    this.userService
      .read(this.filter)
      .then((result) => {
        this.users = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = (event.first ?? 0) / (event.rows ?? 1);
    this.filter.sortField = event.sortField || 'id';
    this.filter.sortOrder = event.sortOrder === -1 ? 'asc' : 'desc'; // 1 = ASC, -1 = DESC
    this.filter.rows = event.rows;
    this.read(page);
  }

  setFilter(newFilter: UserFilter): void {
    this.filter = newFilter;
    this.read();
  }

  deleteAudit(id: number): void {
    this.userService
      .delete(id)
      .then(() => {
        this.read();
      })
      .catch((error) => this.errorService.handle(error));
  }

  confirmDelete(user: User) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o utilizador <strong>${user.username}</strong>?`,
      key: 'customConfirmDialog',
      accept: () => {
        this.deleteAudit(user.id);
      },
    });
  }

  get isAdmin(): boolean {
    return this.userSession?.group.slug === 'admin';
  }
}
