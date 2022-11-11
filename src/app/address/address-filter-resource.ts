import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class AddressFilter {
  page: number = 0;
  rows: number = 10;

  city: string;
  district: string;
  street: string;

  createdAt: Date;
}

export const getFilterParams = (filter: AddressFilter): HttpParams => {
  let params = new HttpParams();
  params = params.append('page', filter.page.toString());
  params = params.append('size', filter.rows.toString());

  if (filter.city) {
    params = params.append('city', filter.city);
  }

  if (filter.district) {
    params = params.append('district', filter.district);
  }

  if (filter.street) {
    params = params.append('street', filter.street);
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
