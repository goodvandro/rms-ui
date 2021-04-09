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
  loading: boolean = true;
  filter = new UserFilter();
  totalRecords: number = 0;
  users = [];

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(page = 0): void {
    this.filter.page = page;

    this.userService.read(this.filter)
      .then((result) => this.users = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.read(page);
  }
}
