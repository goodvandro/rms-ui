import { Entity } from '../models/entity';
import { Group } from '../models/group';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class UserFilter {
  page: number = 0;
  rows?: number = 10;
  sortField: string;
  sortOrder: string;

  name: string;
  email: string;

  createdAt: Date[];
  group: Group;
  entity: Entity;
}

export const getFilterParams = (filter: UserFilter): HttpParams => {
  let params = new HttpParams();

  params = params.append('page', filter.page.toString());
  params = params.append('size', filter.rows.toString());
  params = params.append('sortField', filter.sortField);
  params = params.append('sortOrder', filter.sortOrder);

  if (filter.name) {
    params = params.append('name', filter.name);
  }

  if (filter.email) {
    params = params.append('email', filter.email);
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

  if (filter.group) {
    params = params.append('group', filter.group.id.toString());
  }

  if (filter.entity) {
    params = params.append('entity', filter.entity.id.toString());
  }

  return params;
};
