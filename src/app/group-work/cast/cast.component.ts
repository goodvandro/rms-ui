import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {
  @Input() users = [];

  constructor() { }

  ngOnInit(): void {
  }

  async remove(id: number) {
    if (this.users.length > 1) {
      this.users.splice(
        this.users.findIndex((item) => item.id === id),
        1
      )
    }
  }
}
