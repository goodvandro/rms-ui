import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuditService } from '../audit.service';
import { AuditStatusService } from './../../audit-status/audit-status.service';
import { AuditTypeService } from './../../audit-type/audit-type.service';
import { EntityService } from './../../entity/entity.service';
import { ErrorService } from './../../error/error.service';
import { Audit } from './../../models/audit';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
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

  getById(id: number): void {
    this.auditService.getById(id)
      .then((result) => this.audit = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(id: number): void {
    this.loading = true;

    this.auditService.update(id, this.audit)
      .then((result) => {
        this.audit = result;
        this.toastr.success('Auditoria salva!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
