import { ErrorService } from './../../error/error.service';
import { AuditStatusService } from './../audit-status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  types = [];

  constructor(
    private auditStatusService: AuditStatusService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.auditStatusService.readAll()
      .then((result) => this.types = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
