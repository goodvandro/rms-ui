import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from 'src/app/error/error.service';
import { AuditFilter, AuditService } from '../audit.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  filter = new AuditFilter();
  totalRecords: number = 0;
  audits = [];

  constructor(
    private groupService: AuditService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.audits = this.groupService.JSON();
  }

  read(page = 0): void {
    this.filter.page = page;

    this.groupService.read(this.filter)
      .then((result) => {
        this.audits = result.content;
        this.totalRecords = result.totalRecords;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.read(page);
  }
}
