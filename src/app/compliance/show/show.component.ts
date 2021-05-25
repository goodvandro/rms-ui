import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/error/error.service';
import { Compliance } from 'src/app/models/compliance';
import { ComplianceLevelService } from './../../compliance-level/compliance-level.service';
import { ComplianceLevel } from './../../models/compliance-level';
import { ComplianceService } from './../compliance.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  levels = [];
  compliance = new Compliance();
  id = this.route.snapshot.params.id;

  constructor(
    private complianceService: ComplianceService,
    private complianceLevelService: ComplianceLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dropdownLevels();
    this.getById();
  }

  dropdownLevels(): void {
    this.complianceLevelService.readAll()
      .then(result => this.levels = result.map((level: ComplianceLevel) => ({
        value: level.id,
        label: level.name
      })))
      .catch((error) => this.errorService.handle(error))
  }

  getById(): void {
    this.complianceService.getById(this.id)
      .then((result) => this.compliance = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(): void {
    this.loading = true;
    delete this.compliance.recommendation.audit.processCode;

    this.complianceService.update(this.id, this.compliance)
      .then((result) => {
        this.compliance = result;
        this.toastr.success('Informações salvas com sucesso!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
