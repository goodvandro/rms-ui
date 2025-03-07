import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AuditService } from '../audit.service';
import { AuditFilter } from '../audit.filter.resource';
import { ErrorService } from '../../error/error.service';
import { UserSession } from '../../models/user';
import { AuthService } from '../../auth/auth.service';
import { Audit } from '../../models/audit';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean;
  visibleSidebarFilter: boolean = false;
  filter: AuditFilter = new AuditFilter();
  totalRecords: number = 0;
  audits = [];
  userSession: UserSession;

  constructor(
    private auditService: AuditService,
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

    this.auditService
      .read(this.filter)
      .then((result) => {
        this.audits = result.content;
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

  clearFilter(form: NgForm) {
    form.reset();
  }

  setFilter(newFilter: AuditFilter): void {
    this.filter = newFilter;
    this.read();
  }

  delete(id: number): void {
    this.auditService
      .delete(id)
      .then(() => {
        this.read();
      })
      .catch((error) => this.errorService.handle(error));
  }

  confirmDelete(audit: Audit) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a auditoria <strong>${audit.processCode}</strong>?`,
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
