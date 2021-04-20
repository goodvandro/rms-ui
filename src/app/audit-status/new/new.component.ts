import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { AuditStatus } from './../../models/audit-status';
import { AuditStatusService } from './../audit-status.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Input() types = [];

  loading: boolean = false;
  display: boolean = false;
  auditStatus = new AuditStatus();

  constructor(
    private auditStatusService: AuditStatusService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  create(): void {
    this.auditStatusService.create(this.auditStatus)
      .then((result) => {
        this.types.push(result);
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
