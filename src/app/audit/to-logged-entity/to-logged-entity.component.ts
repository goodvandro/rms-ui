import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from 'src/app/error/error.service';
import { AuditClientFilter, AuditClientService } from '../audit-client.service';

@Component({
  selector: 'app-to-logged-entity',
  templateUrl: './to-logged-entity.component.html',
  styleUrls: ['./to-logged-entity.component.scss']
})
export class ToLoggedEntityComponent implements OnInit {
  loading: boolean;
  filter = new AuditClientFilter();
  totalRecords: number = 0;
  audits = [];

  constructor(
    private groupService: AuditClientService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    this.filter.page = page;

    this.groupService.read(this.filter)
      .then((result) => {
        this.audits = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.filter.rows = event.rows;
    this.read(page);
  }
}
