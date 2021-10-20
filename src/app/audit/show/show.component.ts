import { AuditStatusHistory } from './../../models/audit-status-history';
import { AuditHistoryService } from './../../audit-history/audit-history.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimeIcons } from 'primeng/api';
import { AuditStatus } from 'src/app/models/audit-status';
import { AuditType } from 'src/app/models/audit-type';
import { Entity } from 'src/app/models/entity';
import { GroupWork } from 'src/app/models/group-work';
import { AuditService } from './../audit.service';
import { AuditStatusService } from './../../audit-status/audit-status.service';
import { AuditTypeService } from './../../audit-type/audit-type.service';
import { EntityService } from './../../entity/entity.service';
import { ErrorService } from './../../error/error.service';
import { GroupWorkService } from './../../group-work/group-work.service';
import { Audit } from './../../models/audit';

type StatusHistory = {
  status: string;
  date: Date;
}

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  audit = new Audit();
  id = this.route.snapshot.params.id;

  types = [];
  entities = [];
  statuses = [];
  groupsWork = [];

  years = [
    { value: '018', label: '2018' },
    { value: '019', label: '2019' },
    { value: '020', label: '2020' },
    { value: '021', label: '2021' }
  ];

  auditStatusHistories: StatusHistory[];

  constructor(
    private auditService: AuditService,
    private auditTypeService: AuditTypeService,
    private auditStatusService: AuditStatusService,
    private entityService: EntityService,
    private groupWorkService: GroupWorkService,
    private auditHistoryService: AuditHistoryService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.auditStatusHistories = [
      { status: 'Fechado', date: null },
      { status: 'Concluído', date: null },
      { status: 'Relatório enviado', date: null },
      { status: 'Homologação', date: null },
      { status: 'Realizado', date: null },
      { status: 'Registo', date: null }
    ];

    this.dropdownEntities();
    this.dropdownTypes();
    this.dropdownStatuses();
    this.dropdownGroupsWork();
    this.getById();
    this.getHistoryStatusByAuditId();
  }

  dropdownEntities() {
    this.entityService.readAll()
      .then((result) => this.entities = result.map((entity: Entity) => ({
        value: entity.id,
        label: entity.name
      })))
  }

  dropdownTypes() {
    this.auditTypeService.readAll()
      .then((result) => this.types = result.map((type: AuditType) => ({
        value: type.id,
        label: type.name
      })))
  }

  dropdownStatuses() {
    this.auditStatusService.readAll()
      .then((result) => {
        this.statuses = result.map((status: AuditStatus) => ({
          value: status.id,
          label: status.name
        }));
      });
  }

  async dropdownGroupsWork() {
    const result_1 = await this.groupWorkService.readAll();
    return this.groupsWork = result_1.map((group: GroupWork) => ({
      value: group.id,
      label: group.name
    }));
  }

  getById(): void {
    this.auditService.getById(this.id)
      .then((result) => this.audit = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(): void {
    this.loading = true;
    delete this.audit.processCode;
    this.auditService.update(this.id, this.audit)
      .then((result) => {
        this.audit = result;
        this.toastr.success('Auditoria salva!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  getHistoryStatusByAuditId(): void {
    this.auditHistoryService.getByAuditId(this.id)
      .then((result) => {
        let histories: StatusHistory[];

        histories = result.map((history) => ({
          status: history.auditStatusHistoryType.name,
          date: history.date,
        }))

        this.auditStatusHistories.forEach((auditStatusHistory, i) => {
          histories.forEach((statusHistory, y) => {
            if (auditStatusHistory.status === statusHistory.status) {
              this.auditStatusHistories[i].date = histories[y].date;
            }
          })
        })

        console.log(this.auditStatusHistories)
      })
  }
}
