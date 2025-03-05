import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { ComplianceLevel } from '../models/compliance-level';

export class ComplianceFilter {
  page: number = 0;
  rows?: number = 10;
  sortField: string;
  sortOrder: string;

  recommendationNumber: string;
  auditProcessNumber: string;

  createdAt: Date[];

  complianceLevel: ComplianceLevel;
}
export const getFilterParams = (filter: ComplianceFilter): HttpParams => {
  let params = new HttpParams();

  params = params.append('page', filter.page.toString());
  params = params.append('size', filter.rows.toString());
  params = params.append('sortField', filter.sortField);
  params = params.append('sortOrder', filter.sortOrder);

  if (filter.recommendationNumber) {
    params = params.append(
      'recommendationNumber',
      filter.recommendationNumber.toString()
    );
  }

  if (filter.auditProcessNumber) {
    params = params.append(
      'auditProcessNumber',
      filter.auditProcessNumber.toString()
    );
  }

  if (filter.createdAt) {
    if (!!filter.createdAt[0])
      params = params.append(
        'createdAtFrom',
        moment(filter.createdAt[0]).format('YYYY-MM-DD')
      );
    if (!!filter.createdAt[1])
      params = params.append(
        'createdAtTo',
        moment(filter.createdAt[1]).format('YYYY-MM-DD')
      );
  }

  if (filter.complianceLevel) {
    params = params.append(
      'complianceLevel',
      filter.complianceLevel.id.toString()
    );
  }

  return params;
};
