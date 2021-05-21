import { Component, OnInit } from '@angular/core';
import { ErrorService } from './../../error/error.service';
import { ComplianceLevelService } from './../compliance-level.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  complianceLevels = [];

  constructor(
    private complianceLevelService: ComplianceLevelService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.complianceLevelService.readAll()
      .then((result) => this.complianceLevels = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
