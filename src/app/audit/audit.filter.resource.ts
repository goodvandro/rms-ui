import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';

export class AuditFilter {
  page: number = 0;
  rows: number = 10;

  processCode: string;
  number: string;
  year: string;
  description: string;
  entityAuditedId: number;
  createdAt: Date[];
  dispatchedAt: Date[];
  statusId: number;
}

export const getFilterParams = (filter: AuditFilter): HttpParams => {
  let params = new HttpParams();

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

  if (filter.createdAt) {
    if (filter.createdAt[0])
      params = params.append('createdAtStart', moment(filter.createdAt[0])
        .format('YYYY-MM-DD'));

    if (filter.createdAt[1])
      params = params.append('createdAtEnd', moment(filter.createdAt[1])
        .format('YYYY-MM-DD'));
  }

  if (filter.dispatchedAt) {
    if (filter.dispatchedAt[0])
      params = params.append('dispatchedAtStart', moment(filter.dispatchedAt[0])
        .format('YYYY-MM-DD'));

    if (filter.dispatchedAt[1])
      params = params.append('dispatchedAtEnd', moment(filter.dispatchedAt[1])
        .format('YYYY-MM-DD'));
  }

  return params;
}
