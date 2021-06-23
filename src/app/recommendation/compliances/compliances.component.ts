import { Component, OnInit, Input } from '@angular/core';
import { Compliance } from 'src/app/models/compliance';

@Component({
  selector: 'app-compliances',
  templateUrl: './compliances.component.html',
  styleUrls: ['./compliances.component.scss']
})
export class CompliancesComponent implements OnInit {
  @Input() compliances: Compliance[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
