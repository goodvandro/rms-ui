import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupWork } from 'src/app/models/group-work';
import { ErrorService } from './../../error/error.service';
import { GroupWorkService } from './../group-work.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;
  groupWork = new GroupWork();

  constructor(
    private groupWorkService: GroupWorkService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.groupWorkService.create(this.groupWork)
      .then((result) => {
        this.router.navigate(['/group/show', result.id]);
        this.toastr.success('Grupo de trabalho adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
