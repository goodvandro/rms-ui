import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { PermissionFilter, PermissionService } from './../permission.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  filter = new PermissionFilter();
  totalRecords: number = 0;
  permissions = [];

  constructor(
    private permissionService: PermissionService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(page = 0): void {
    this.filter.page = page;

    this.permissionService.read(this.filter)
      .then((result) => this.permissions = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.read(page);
  }
}
