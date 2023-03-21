import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { ComplianceLevel } from './../../models/compliance-level';
import { ComplianceLevelService } from './../compliance-level.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() complianceLevels = [];

  loading: boolean = false;
  display: boolean = false;
  complianceLevel = new ComplianceLevel();

  constructor(
    private complianceLevelService: ComplianceLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  showDialog() {
    this.display = true;
  }

  generateSlug(event: any) {
    const name: string = event.target.value;

    this.complianceLevel.slug = name
      .replace(/\s/g, '_')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  create(form: NgForm): void {
    this.loading = true;

    this.complianceLevelService
      .create(this.complianceLevel)
      .then((result) => {
        this.complianceLevels.push(result);
        this.display = false;
        form.reset();
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }
}
