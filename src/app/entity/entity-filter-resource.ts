import { HttpParams } from '@angular/common/http';
import { EntityLevel } from '../models/entity-level';
import * as moment from 'moment';

export class EntityFilter {
  page: number = 0;
  rows?: number = 10;
  sortField: string;
  sortOrder: string;

  name: string;
  initial: string;

  entityLevel: EntityLevel;

  createdAt: Date[];
}

export const getFilterParams = (filter: EntityFilter): HttpParams => {
  let params = new HttpParams();

  params = params.append('page', filter.page.toString());
  params = params.append('size', filter.rows.toString());
  params = params.append('sortField', filter.sortField);
  params = params.append('sortOrder', filter.sortOrder);

  if (filter.name) {
    params = params.append('name', filter.name);
  }

  if (filter.initial) {
    params = params.append('initial', filter.initial);
  }

  if (filter.entityLevel) {
    params = params.append('entityLevel', filter.entityLevel.id.toString());
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

  return params;
};
