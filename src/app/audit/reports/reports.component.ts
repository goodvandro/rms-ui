import { ToastrService } from 'ngx-toastr';
import { AuditReportService } from './../audit-report.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuditReport } from 'src/app/models/audit-report';
import { ErrorService } from 'src/app/error/error.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @Input() reports: AuditReport[] = [];

  loading: boolean = false;
  displayNew: boolean = false;
  displayEdit: boolean = false;

  report = new AuditReport();
  auditId = this.route.snapshot.params.id;

  constructor(
    private auditReportService: AuditReportService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
  }

  showNew(): void {
    this.displayNew = true;
    this.report = new AuditReport();
    this.report.audit.id = this.auditId;
  }

  showEdit(report: AuditReport): void {
    this.displayEdit = true;
    this.report = report;
  }

  create(form: NgForm): void {
    this.loading = true;
    this.auditReportService.create(this.report)
      .then((result) => {
        this.reports.push(result);
        form.reset();
        this.displayNew = false;
        this.toastr.success('Informações salvas com sucesso!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  update(): void {
    this.loading = true;
    this.auditReportService.update(this.report)
      .then(() => {
        this.displayEdit = false;
        this.toastr.success('Informações salvas com sucesso!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
