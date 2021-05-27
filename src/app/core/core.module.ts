import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActivityModule } from '../activity/activity.module';
import { AppHttClient } from '../auth/app-http-client';
import { ActivityService } from './../activity/activity.service';
import { AddressModule } from './../address/address.module';
import { AddressService } from './../address/address.service';
import { AuditStatusModule } from './../audit-status/audit-status.module';
import { AuditStatusService } from './../audit-status/audit-status.service';
import { AuditTypeModule } from './../audit-type/audit-type.module';
import { AuditTypeService } from './../audit-type/audit-type.service';
import { AuditFileService } from './../audit/audit-file.service';
import { AuditReportService } from './../audit/audit-report.service';
import { AuditModule } from './../audit/audit.module';
import { AuditService } from './../audit/audit.service';
import { AuthModule } from './../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { ComplianceLevelModule } from './../compliance-level/compliance-level.module';
import { ComplianceLevelService } from './../compliance-level/compliance-level.service';
import { ComplianceModule } from './../compliance/compliance.module';
import { ComplianceService } from './../compliance/compliance.service';
import { EntityLevelModule } from './../entity-level/entity-level.module';
import { EntityLevelService } from './../entity-level/entity-level.service';
import { EntityModule } from './../entity/entity.module';
import { EntityService } from './../entity/entity.service';
import { ErrorModule } from './../error/error.module';
import { ErrorService } from './../error/error.service';
import { GroupWorkModule } from './../group-work/group-work.module';
import { GroupWorkService } from './../group-work/group-work.service';
import { GroupModule } from './../group/group.module';
import { GroupService } from './../group/group.service';
import { LayoutModule } from './../layout/layout.module';
import { PermissionModule } from './../permission/permission.module';
import { PermissionService } from './../permission/permission.service';
import { RecommendationCharacterModule } from './../recommendation-character/recommendation-character.module';
import { RecommendationCharacterService } from './../recommendation-character/recommendation-character.service';
import { RecommendationFileModule } from './../recommendation-file/recommendation-file.module';
import { RecommendationFileService } from './../recommendation-file/recommendation-file.service';
import { RecommendationLevelRiskModule } from './../recommendation-level-risk/recommendation-level-risk.module';
import { RecommendationLevelRiskService } from './../recommendation-level-risk/recommendation-level-risk.service';
import { RecommendationNatureModule } from './../recommendation-nature/recommendation-nature.module';
import { RecommendationNatureService } from './../recommendation-nature/recommendation-nature.service';
import { RecommendationStatusModule } from './../recommendation-status/recommendation-status.module';
import { RecommendationStatusService } from './../recommendation-status/recommendation-status.service';
import { RecommendationModule } from './../recommendation/recommendation.module';
import { RecommendationService } from './../recommendation/recommendation.service';
import { ReportModule } from './../report/report.module';
import { ReportService } from './../report/report.service';
import { SharedModule } from './../shared/shared.module';
import { StartModule } from './../start/start.module';
import { PasswordService } from './../user/password.service';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ConfirmDialogModule,
    LayoutModule,
    ErrorModule,

    SharedModule,
    AuthModule,
    StartModule,
    UserModule,
    ActivityModule,
    GroupModule,
    GroupWorkModule,
    AuditModule,
    EntityModule,
    AddressModule,
    EntityLevelModule,
    AuditStatusModule,
    AuditTypeModule,
    RecommendationModule,
    RecommendationStatusModule,
    RecommendationNatureModule,
    RecommendationLevelRiskModule,
    RecommendationFileModule,
    RecommendationCharacterModule,
    PermissionModule,
    ComplianceModule,
    ComplianceLevelModule,
    ReportModule
  ],
  exports: [
    LayoutModule,
    ConfirmDialogModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    AppHttClient,
    JwtHelperService,
    ErrorService,
    Title,
    ConfirmationService,
    AuthService,
    UserService,
    PasswordService,
    ActivityService,
    GroupService,
    GroupWorkService,
    AuditService,
    EntityService,
    AddressService,
    EntityLevelService,
    AuditStatusService,
    AuditTypeService,
    RecommendationService,
    RecommendationStatusService,
    RecommendationNatureService,
    RecommendationLevelRiskService,
    RecommendationFileService,
    RecommendationCharacterService,
    PermissionService,
    ComplianceService,
    ComplianceLevelService,
    AuditFileService,
    AuditReportService,
    ReportService
  ]
})
export class CoreModule { }
