import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { EntityService } from './../entity.service';
import { EntityFilter } from './../entity-filter-resource';
import { Component, OnInit } from '@angular/core';
import { UserSession } from '../../models/user';
import { AuthService } from '../../auth/auth.service';
import { Entity } from '../../models/entity';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean;
  filter = new EntityFilter();
  totalRecords: number = 0;
  entities = [];
  userSession: UserSession;

  constructor(
    private entityService: EntityService,
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

    this.entityService
      .read(this.filter)
      .then((result) => {
        this.entities = result.content;
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

  setFilter(newFilter: EntityFilter): void {
    this.filter = newFilter;
    this.read();
  }

  delete(id: number): void {
    this.entityService
      .delete(id)
      .then(() => {
        this.read();
      })
      .catch((error) => this.errorService.handle(error));
  }

  confirmDelete(entity: Entity) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a entidade <strong>${entity.initial}</strong>?`,
      key: 'customConfirmDialog',
      accept: () => {
        this.delete(entity.id);
      },
    });
  }

  get isAdmin(): boolean {
    return this.userSession?.group.slug === 'admin';
  }
}
