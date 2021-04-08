import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/error/error.service';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  loading: boolean = false;
  user = new User();
  id = this.route.snapshot.params.id;

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getById(this.id);
  }

  getById(id: number): void {
    this.userService.getById(id)
      .then((result) => this.user = result)
      .catch((error) => this.errorService.handle(error));
  }

  update(id: number): void {
    this.loading = true;

    this.userService.update(id, this.user)
      .then((result) => {
        this.user = result;
        this.toastr.success('Utilizador salvo!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
