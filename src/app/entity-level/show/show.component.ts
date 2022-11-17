import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { EntityLevelService } from './../entity-level.service';
import { Component, OnInit, Input } from '@angular/core';
import { EntityLevel } from './../../models/entity-level';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  @Input() entityLevel: EntityLevel;

  loading: boolean = false;
  display: boolean = false;

  constructor(
    private entityLevelService: EntityLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  showDialog() {
    this.display = true;
  }

  generateSlug(event: any) {
    const name: string = event.target.value;

    this.entityLevel.slug = name
      .replace(/\s/g, '_')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  update(): void {
    this.entityLevelService
      .update(this.entityLevel.id, this.entityLevel)
      .then(() => {
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }
}
