import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { GroupWorkFilter, GroupWorkService } from './../group-work.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  filter = new GroupWorkFilter();
  totalRecords: number = 0;
  groupWorks = [];

  constructor(
    private groupService: GroupWorkService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(page = 0): void {
    this.filter.page = page;

    this.groupService.read(this.filter)
      .then((result) => this.groupWorks = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.read(page);
  }
}
