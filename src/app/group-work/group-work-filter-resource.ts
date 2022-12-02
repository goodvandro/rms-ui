import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class GroupWorkFilter {
  page: number = 0;
  rows: number = 15;

  sortField: string;
  sortOrder: number;

  name: string;

  createdAt: Date[];
}

export const getFilterParams = (filter: GroupWorkFilter): HttpParams => {
  let params = new HttpParams();

  params = params.append('page', filter.page.toString());
  params = params.append('size', filter.rows.toString());

  if (filter.sortField) {
    params = params.append('sortField', filter.sortField);
    params = params.append('sortOrder', filter.sortOrder.toString());
  }

  if (filter.name) {
    params = params.append('name', filter.name);
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
