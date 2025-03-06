import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { AuthService } from '../../auth/auth.service';
import { UserSession } from '../../models/user';
import { RecommendationService } from '../recommendation.service';
import { ErrorService } from './../../error/error.service';
import { RecommendationFilter } from './../recommendation-filter-resource';
import { Recommendation } from '../../models/recommendation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean = false;
  openFilter: boolean = false;

  filter: RecommendationFilter = new RecommendationFilter();
  totalRecords: number = 0;
  recommendations = [];
  userSession: UserSession;

  constructor(
    private recommendationService: RecommendationService,
    private errorService: ErrorService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (!this.authService.isAccessTokenInvalid()) {
      this.userSession = this.authService.jwtPayload.user;
    }
  }

  openFilterDialog(): void {
    this.openFilter = true;
  }

  read(page: number = 0): void {
    if (!this.loading) this.loading = true;

    this.filter.page = page;

    this.recommendationService
      .read(this.filter)
      .then((result) => {
        this.recommendations = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = (event.first ?? 0) / (event.rows ?? 1);
    this.filter.sortField = event.sortField || 'id';
    this.filter.sortOrder = event.sortOrder === -1 ? 'asc' : 'desc'; // 1 = ASC, -1 = DESC
    this.filter.rows = event.rows;
    this.read(page);
  }

  setFilter(newFilter: RecommendationFilter): void {
    this.filter = newFilter;
    this.read();
  }

  deleteAudit(id: number): void {
    this.recommendationService
      .delete(id)
      .then(() => {
        this.read();
      })
      .catch((error) => this.errorService.handle(error));
  }

  get isAdmin(): boolean {
    return this.userSession?.group.slug === 'admin';
  }

  confirmDelete(recommendation: Recommendation) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a recomendação <strong>${recommendation?.number}</strong>?`,
      key: 'customConfirmDialog',
      accept: () => {
        this.deleteAudit(recommendation.id);
      },
    });
  }
}
