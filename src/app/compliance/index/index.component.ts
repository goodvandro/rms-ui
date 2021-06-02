import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from 'src/app/error/error.service';
import { ComplianceFilter, ComplianceService } from './../compliance.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean;
  filter = new ComplianceFilter();
  totalRecords: number = 0;
  compliances = [];

  constructor(
    private complianceService: ComplianceService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    this.filter.page = page;

    this.complianceService.read(this.filter)
      .then((result) => {
        this.compliances = result.content;
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
