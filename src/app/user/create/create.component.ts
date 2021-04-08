import { UserService } from './../user.service';
import { ErrorService } from './../../error/error.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  loading: boolean = false;
  user = new User();

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.userService.create(this.user)
    .then((result) => {
      this.router.navigate(['/user/read', result.id]);
      this.toastr.success('Utilizador adicionado!')
    })
    .catch((error) => this.errorService.handle(error))
    .finally(() => this.loading = false)
  }
}
