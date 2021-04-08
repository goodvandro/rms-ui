import { LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityFilter, ActivityService } from '../activity.service';
import { AuthService } from './../../auth/auth.service';
import { ErrorService } from './../../error/error.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  filter = new ActivityFilter();
  totalRecords: number = 0;
  activities = [];

  constructor(
    private userService: ActivityService,
    private errorService: ErrorService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.activities = this.userService.activitiesJSON()
  }

  read(page = 0): void {
    this.filter.page = page;

    this.userService.read(this.filter)
      .then((result) => {
        this.activities = result.content;
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
