import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { AuditService } from '../audit.service';
import { AuditFilter } from '../audit.filter.resource';
import { ErrorService } from '../../error/error.service';

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

  constructor(
    private groupService: AuditService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    this.loading = true;
    this.filter.page = page;

    this.groupService
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
    this.filter.sortField = event.sortField || 'id'; // Campo de ordenação (padrão: id)
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

  deleteAudit(id: number): void {
    this.groupService
      .deleteAudit(id)
      .then(() => {
        this.read();
      })
      .catch((error) => this.errorService.handle(error));
  }
}
