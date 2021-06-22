import { Component, OnInit, Input } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  @Input() recommendations: Recommendation[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
