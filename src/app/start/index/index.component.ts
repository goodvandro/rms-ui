import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/error/error.service';
import { ReportService } from 'src/app/report/report.service';

type RecommendationMonthData = {
  totalRecommendations: number;
  totalRecommendationsEvaluated: number;
  totalRecommendationsCompleted: number;
  totalRecommendationsOngoing: number;
  totalRecommendationsNotCompleted: number;
  totalRecommendationsNotEvaluated: number;
}

type RecommendationYearData = {
  jan: RecommendationMonthData;
  feb: RecommendationMonthData;
  mar: RecommendationMonthData;
  apr: RecommendationMonthData;
  may: RecommendationMonthData;
  jun: RecommendationMonthData;
  jul: RecommendationMonthData;
  aug: RecommendationMonthData;
  sep: RecommendationMonthData;
  oct: RecommendationMonthData;
  nov: RecommendationMonthData;
  dec: RecommendationMonthData;
}

class BasicInfo {
  totalAudits: number = 0;
  totalRecommendations: number = 0;
  totalCompliances: number = 0;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  monthDataSet: any;
  yearDataSet: any;

  basicInfo = new BasicInfo();
  recommendationMonthData: RecommendationMonthData[] = [];
  recommendationYearData: any;

  constructor(
    private reportService: ReportService,
  ) {
  }

  ngOnInit(): void {
    this.getBasicInfo();
    this.getByCurrentMonth();
    this.getByCurrentYear();
  }

  getBasicInfo(): void {
    this.reportService.getBasicInfo()
      .then((result) => this.basicInfo = result)
  }

  getByCurrentMonth(): void {
    this.reportService.getByCurrentMonth()
      .then((result) => this.setMonthData(result))
  }

  getByCurrentYear(): void {
    this.reportService.getByCurrentYear()
      .then((result) => this.setYearData(result))
  }

  setMonthData(data: any): void {
    const {
      totalRecommendations,
      totalRecommendationsEvaluated,
      totalRecommendationsCompleted,
      totalRecommendationsOngoing,
      totalRecommendationsNotCompleted,
      totalRecommendationsNotEvaluated
    } = data;

    const datasets = [{
      data: [
        totalRecommendations,
        totalRecommendationsEvaluated,
        totalRecommendationsOngoing,
        totalRecommendationsCompleted
      ],
      backgroundColor: [
        "#039BE5",
        "#B23CFD",
        '#FFA900',
        "#00B74A"
      ],
      hoverBackgroundColor: [
        "#0277BD",
        "#AB47BC",
        '#FF9800',
        "#388E3C"
      ]
    }];

    this.monthDataSet = {
      labels: ['Observadas', 'Avaliadas', 'Em Curso', 'Cumpridas'],
      datasets
    }
  }

  setYearData(data: any): void {
    const {
      jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec
    }: RecommendationYearData = data;

    const datasets = [
      {
        label: 'Observadas',
        backgroundColor: '#039BE5',
        data: [
          jan.totalRecommendations,
          feb.totalRecommendations,
          mar.totalRecommendations,
          apr.totalRecommendations,
          may.totalRecommendations,
          jun.totalRecommendations,
          jul.totalRecommendations,
          aug.totalRecommendations,
          sep.totalRecommendations,
          oct.totalRecommendations,
          nov.totalRecommendations,
          dec.totalRecommendations,
        ]
      },
      {
        label: 'Avaliadas',
        backgroundColor: '#B23CFD',
        data: [
          jan.totalRecommendationsEvaluated,
          feb.totalRecommendationsEvaluated,
          mar.totalRecommendationsEvaluated,
          apr.totalRecommendationsEvaluated,
          may.totalRecommendationsEvaluated,
          jun.totalRecommendationsEvaluated,
          jul.totalRecommendationsEvaluated,
          aug.totalRecommendationsEvaluated,
          sep.totalRecommendationsEvaluated,
          oct.totalRecommendationsEvaluated,
          nov.totalRecommendationsEvaluated,
          dec.totalRecommendationsEvaluated,
        ]
      },
      {
        label: 'Em Curso',
        backgroundColor: '#FFA900',
        data: [
          jan.totalRecommendationsOngoing,
          feb.totalRecommendationsOngoing,
          mar.totalRecommendationsOngoing,
          apr.totalRecommendationsOngoing,
          may.totalRecommendationsOngoing,
          jun.totalRecommendationsOngoing,
          jul.totalRecommendationsOngoing,
          aug.totalRecommendationsOngoing,
          sep.totalRecommendationsOngoing,
          oct.totalRecommendationsOngoing,
          nov.totalRecommendationsOngoing,
          dec.totalRecommendationsOngoing,
        ]
      },
      {
        label: 'Cumpridas',
        backgroundColor: '#00B74A',
        data: [
          jan.totalRecommendationsCompleted,
          feb.totalRecommendationsCompleted,
          mar.totalRecommendationsCompleted,
          apr.totalRecommendationsCompleted,
          may.totalRecommendationsCompleted,
          jun.totalRecommendationsCompleted,
          jul.totalRecommendationsCompleted,
          aug.totalRecommendationsCompleted,
          sep.totalRecommendationsCompleted,
          oct.totalRecommendationsCompleted,
          nov.totalRecommendationsCompleted,
          dec.totalRecommendationsCompleted,
        ]
      }
    ];

    this.recommendationYearData = datasets;
    this.yearDataSet = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets
    }
  }
}
