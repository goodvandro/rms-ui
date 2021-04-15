import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { ErrorService } from './../../error/error.service';
import { GroupService } from './../../group/group.service';
import { Group } from './../../models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @Input() userGroups = [];
  groups = [];
  user = new User();
  display: boolean = false;
  userId = this.route.snapshot.params.id;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user.id = this.userId;
  }

  async removeGroup(id: number) {
    if (this.userGroups.length > 1) {
      this.userGroups.splice(
        this.userGroups.findIndex((item) => item.id === id),
        1
      )
    }
  }
}
