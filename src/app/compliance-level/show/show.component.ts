import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { ComplianceLevel } from './../../models/compliance-level';
import { ComplianceLevelService } from './../compliance-level.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  @Input() complianceLevel: ComplianceLevel;

  loading: boolean = false;
  display: boolean = false;

  constructor(
    private complianceLevelService: ComplianceLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  update(): void {
    this.complianceLevelService.update(this.complianceLevel.id, this.complianceLevel)
      .then(() => {
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
