import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from 'src/app/error/error.service';
import { ComplianceClientFilter, ComplianceClientService } from './../compliance-client.service';

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrls: ['./client-index.component.scss']
})
export class ClientIndexComponent implements OnInit {
  loading: boolean;
  filter = new ComplianceClientFilter();
  totalRecords: number = 0;
  compliances = [];

  constructor(
    private complianceClientService: ComplianceClientService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    this.filter.page = page;

    this.complianceClientService.read(this.filter)
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
