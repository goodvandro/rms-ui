import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { ErrorService } from './../../error/error.service';
import { AuditType } from './../../models/audit-type';
import { AuditTypeService } from './../audit-type.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Input() types = [];

  loading: boolean = false;
  display: boolean = false;
  auditType = new AuditType();

  constructor(
    private auditTypeService: AuditTypeService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  create(): void {
    this.auditTypeService.create(this.auditType)
      .then((result) => {
        this.types.push(result);
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
