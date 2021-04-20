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

  async dropdownEntities() {
    await this.entityService.readAll()
      .then((result) =>
        this.entities = result.map(
          (entity) => ({ value: entity, label: entity.name })
        )
      )
  }

  async dropdownTypes() {
    await this.auditTypeService.readAll()
      .then((result) =>
        this.types = result.map(
          (type) => ({ value: type, label: type.name })
        )
      )
  }

  async dropdownStatuses() {
    await this.auditStatusService.readAll()
      .then((result) =>
        this.statuses = result.map(
          (status) => ({ value: status, label: status.name })
        )
      )
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
