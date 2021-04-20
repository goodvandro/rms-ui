import { AuditStatusService } from './../../audit-status/audit-status.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuditService } from '../audit.service';
import { AuditTypeService } from './../../audit-type/audit-type.service';
import { EntityService } from './../../entity/entity.service';
import { ErrorService } from './../../error/error.service';
import { Audit } from './../../models/audit';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;
  audit = new Audit();

  types = [];
  entities = [];
  statuses = [];
  years = [
    { value: 2018, label: '2018' },
    { value: 2019, label: '2019' },
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' }
  ];

  constructor(
    private auditService: AuditService,
    private auditTypeService: AuditTypeService,
    private auditStatusService: AuditStatusService,
    private entityService: EntityService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dropdownEntities();
    this.dropdownTypes();
    this.dropdownStatuses();
  }

  dropdownEntities(): void {
    this.entities = this.entityService.JSON()
      .map((entity) => ({ value: entity, label: entity.name }))
  }

  dropdownTypes(): void {
    this.types = this.auditTypeService.JSON()
      .map((type) => ({ value: type, label: type.name }))
  }

  dropdownStatuses(): void {
    this.statuses = this.auditStatusService.JSON()
      .map((status) => ({ value: status, label: status.name }))
  }

  create(): void {
    this.auditService.create(this.audit)
      .then((result) => {
        this.router.navigate(['/audit/show', result.id]);
        this.toastr.success('Grupo adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
