import { EntityLevel } from './../../models/entity-level';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { EntityLevelService } from './../entity-level.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Input() entityLevels = [];

  loading: boolean = false;
  display: boolean = false;
  entityLevel = new EntityLevel();

  constructor(
    private entityLevelService: EntityLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  create(form: NgForm): void {
    this.entityLevelService.create(this.entityLevel)
      .then((result) => {
        this.entityLevels.push(result);
        this.display = false;
        form.reset();
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
