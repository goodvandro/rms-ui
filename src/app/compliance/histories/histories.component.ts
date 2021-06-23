import { ComplianceHistoric } from './../../models/compliance-historic';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss']
})
export class HistoriesComponent implements OnInit {
  @Input() histories: ComplianceHistoric[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
