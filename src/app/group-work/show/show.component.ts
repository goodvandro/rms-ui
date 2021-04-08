import { GroupWork } from './../../models/group-work';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { GroupWorkService } from './../group-work.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  groupWork = new GroupWork();
  id = this.route.snapshot.params.id;

  constructor(
    private userService: GroupWorkService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.getById(this.id);
  }

  getById(id: number): void {
    this.userService.getById(id)
      .then((result) => this.groupWork = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(id: number): void {
    this.loading = true;

    this.userService.update(id, this.groupWork)
      .then((result) => {
        this.groupWork = result;
        this.toastr.success('Grupo salvo!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
