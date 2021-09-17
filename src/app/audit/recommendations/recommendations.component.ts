import { Component, OnInit, Input } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  @Input() recommendations: Recommendation[] = [];
  display: boolean = false;

  recommendation = new Recommendation();

  constructor() { }

  ngOnInit(): void {
  }

  showDialog(data: Recommendation) {
    this.recommendation = data;
    this.display = true;
  }
}
