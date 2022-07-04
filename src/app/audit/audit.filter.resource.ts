import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import { Entity } from '../models/entity';
import { AuditStatus } from '../models/audit-status';
import { AuditType } from '../models/audit-type';
import { GroupWork } from '../models/group-work';

export class AuditFilter {
  page: number = 0;
  rows: number = 10;

  number: string;
  processCode: string;
  description: string;

  year: string;

  type: AuditType;
  status: AuditStatus;
  entityAudited: Entity;
  groupWork: GroupWork;

  createdAt: Date[];
  updatedAt: Date[];
  dispatchedAt: Date[];
  reportedAt: Date[];
}

export const getFilterParams = (filter: AuditFilter): HttpParams => {
  let params: HttpParams = new HttpParams();

  params = params.append('page', filter.page.toString());
  params = params.append('size', filter.rows.toString());

  if (filter.processCode)
    params = params.append('processCode', filter.processCode);

  if (filter.description)
    params = params.append('description', filter.description);

  if (filter.number)
    params = params.append('number', filter.number);

  if (filter.year)
    params = params.append('year', filter.year);

  if (filter.type) {
    params = params.append('typeId', String(filter.type.id));
  }

  if (filter.status) {
    params = params.append('statusId', String(filter.status.id));
  }

  if (filter.entityAudited) {
    params = params.append('entityAuditedId', String(filter.entityAudited.id));
  }

  if (filter.groupWork) {
    params = params.append('groupWorkId', String(filter.groupWork.id));
  }

  if (filter.createdAt) {
    if (!!filter.createdAt[0])
      params = params.append('createdAtFrom', moment(filter.createdAt[0])
        .format('YYYY-MM-DD'));
    if (!!filter.createdAt[1])
      params = params.append('createdAtTo', moment(filter.createdAt[1])
        .format('YYYY-MM-DD'));
  }

  if (filter.updatedAt) {
    if (!!filter.updatedAt[0])
      params = params.append('updatedAtFrom', moment(filter.updatedAt[0])
        .format('YYYY-MM-DD'));
    if (!!filter.updatedAt[1])
      params = params.append('updatedAtTo', moment(filter.updatedAt[1])
        .format('YYYY-MM-DD'));
  }

  if (filter.dispatchedAt) {
    if (!!filter.dispatchedAt[0])
      params = params.append('dispatchedAtFrom', moment(filter.dispatchedAt[0])
        .format('YYYY-MM-DD'));
    if (!!filter.dispatchedAt[1])
      params = params.append('dispatchedAtTo', moment(filter.dispatchedAt[1])
        .format('YYYY-MM-DD'));
  }

  if (filter.reportedAt) {
    if (!!filter.reportedAt[0])
      params = params.append('reportedAtFrom', moment(filter.reportedAt[0])
        .format('YYYY-MM-DD'));
    if (!!filter.reportedAt[1])
      params = params.append('reportedAtTo', moment(filter.reportedAt[1])
        .format('YYYY-MM-DD'));
  }

  return params;
}
