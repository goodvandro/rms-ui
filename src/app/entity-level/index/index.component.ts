import { Component, OnInit } from '@angular/core';
import { EntityLevelService } from '../entity-level.service';
import { ErrorService } from './../../error/error.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  entityLevels = [];

  constructor(
    private entityLevelService: EntityLevelService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.entityLevelService.readAll()
      .then((result) => this.entityLevels = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
