import { User } from './../../models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-work-by-audit',
  templateUrl: './group-work-by-audit.component.html',
  styleUrls: ['./group-work-by-audit.component.scss']
})
export class GroupWorkByAuditComponent implements OnInit {
  @Input() groupWorkUsers: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
