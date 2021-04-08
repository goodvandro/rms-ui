import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from '../group.service';
import { ErrorService } from './../../error/error.service';
import { Group } from './../../models/group';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  group = new Group();
  id = this.route.snapshot.params.id;

  constructor(
    private userService: GroupService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.getById(this.id);
  }

  getById(id: number): void {
    this.userService.getById(id)
      .then((result) => this.group = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(id: number): void {
    this.loading = true;

    this.userService.update(id, this.group)
      .then((result) => {
        this.group = result;
        this.toastr.success('Grupo salvo!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
