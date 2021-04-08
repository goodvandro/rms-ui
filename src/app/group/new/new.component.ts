import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;
  group = new Group();

  constructor(
    private userService: GroupService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.userService.create(this.group)
      .then((result) => {
        this.router.navigate(['/group/show', result.id]);
        this.toastr.success('Grupo adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
