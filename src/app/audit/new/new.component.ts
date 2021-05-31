import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuditStatus } from 'src/app/models/audit-status';
import { AuditType } from 'src/app/models/audit-type';
import { Entity } from 'src/app/models/entity';
import { GroupWork } from 'src/app/models/group-work';
import { AuditService } from '../audit.service';
import { AuditStatusService } from './../../audit-status/audit-status.service';
import { AuditTypeService } from './../../audit-type/audit-type.service';
import { EntityService } from './../../entity/entity.service';
import { ErrorService } from './../../error/error.service';
import { GroupWorkService } from './../../group-work/group-work.service';
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
  groupsWork = [];
  years = [
    { value: 2021, label: '2021' },
    { value: 2020, label: '2020' },
    { value: 2019, label: '2019' },
  ];

  constructor(
    private auditService: AuditService,
    private auditTypeService: AuditTypeService,
    private auditStatusService: AuditStatusService,
    private entityService: EntityService,
    private groupWorkService: GroupWorkService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dropdownEntities();
    this.dropdownTypes();
    this.dropdownStatuses();
    this.dropdownGroupsWork();
  }

  async dropdownEntities() {
    await this.entityService.readAll()
      .then((result) => this.entities = result.map((entity: Entity) => ({
        value: entity.id,
        label: entity.name
      })))
  }

  async dropdownTypes() {
    await this.auditTypeService.readAll()
      .then((result) => this.types = result.map((type: AuditType) => ({
        value: type.id,
        label: type.name
      })))
  }

  async dropdownStatuses() {
    await this.auditStatusService.readAll()
      .then((result) => {
        this.statuses = result.map((status: AuditStatus) => ({
          value: status.id,
          label: status.name
        }));
        this.loadDefaultStatus(result)
      });
  }

  async dropdownGroupsWork() {
    await this.groupWorkService.readAll()
      .then((result) => this.groupsWork = result.map((group: GroupWork) => ({
        value: group.id,
        label: group.name
      })))
  }

  loadDefaultStatus(statuses: AuditStatus[]) {
    statuses.forEach((status) => {
      if (status.slug === 'pendent') {
        this.audit.status = status;
      }
    })
  }

  create(): void {
    this.loading = true;
    delete this.audit.processCode;

    this.auditService.create(this.audit)
      .then((result) => {
        this.router.navigate(['/audit/show', result.id]);
        this.toastr.success('Grupo adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
