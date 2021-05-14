import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { UserFilter, UserService } from '../user.service';
import { ErrorService } from './../../error/error.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  loading: boolean;
  filter = new UserFilter();
  totalRecords: number = 0;
  users = [];

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    this.loading = true;
    this.filter.page = page;

    this.userService.read(this.filter)
      .then((result) => {
        this.users = result.content;
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
