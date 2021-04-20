import { ErrorService } from './../../error/error.service';
import { Component, OnInit } from '@angular/core';
import { AuditTypeService } from '../audit-type.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  types = [];

  constructor(
    private auditTypeService: AuditTypeService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.auditTypeService.readAll()
      .then((result) => this.types = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
