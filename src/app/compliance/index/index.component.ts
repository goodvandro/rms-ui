import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ComplianceService } from './../compliance.service';
import { ComplianceFilter } from './../compliance-filter-resource';
import { Compliance } from '../../models/compliance';
import { AuthService } from '../../auth/auth.service';
import { UserSession } from '../../models/user';
import { ErrorService } from '../../error/error.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean;
  filter = new ComplianceFilter();
  totalRecords: number = 0;
  compliances = [];
  userSession: UserSession;

  constructor(
    private complianceService: ComplianceService,
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

    this.complianceService
      .read(this.filter)
      .then((result) => {
        this.compliances = result.content;
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

  setFilter(newFilter: ComplianceFilter): void {
    this.filter = newFilter;
    this.read();
  }

  delete(id: number): void {
    this.complianceService
      .delete(id)
      .then(() => {
        this.read();
      })
      .catch((error) => this.errorService.handle(error));
  }

  get isAdmin(): boolean {
    return this.userSession?.group.slug === 'admin';
  }

  confirmDelete(compliance: Compliance) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o cumprimento?`,
      key: 'customConfirmDialog',
      accept: () => {
        this.delete(compliance.id);
      },
    });
  }
}
