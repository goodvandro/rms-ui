import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from '../../error/error.service';
import { GroupWork } from '../../models/group-work';
import { AuditFilter } from '../../audit/audit.filter.resource';
import { AuditService } from '../../audit/audit.service';

@Component({
  selector: 'app-audit-by-group-work',
  templateUrl: './audit-by-group-work.component.html',
  styleUrls: ['./audit-by-group-work.component.css'],
})
export class AuditByGroupWorkComponent implements OnInit {
  @Input() groupWork: GroupWork;
  loading: boolean;
  totalRecords: number = 0;
  filter: AuditFilter = new AuditFilter();
  audits = [];

  constructor(
    private auditService: AuditService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    this.loading = true;
    this.filter.page = page;

    console.log('groupWork', this.groupWork);
    this.filter.groupWork = this.groupWork;

    this.auditService
      .read(this.filter)
      .then((result) => {
        this.audits = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = (event.first ?? 0) / (event.rows ?? 1);
    this.filter.sortField = event.sortField || 'id';
    this.filter.sortOrder = event.sortOrder === -1 ? 'asc' : 'desc';
    this.filter.rows = event.rows;
    this.read(page);
  }
}
