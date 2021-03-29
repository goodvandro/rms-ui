import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { ErrorHandlerModule } from './../error-handler/error-handler.module';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { LayoutModule } from './../layout/layout.module';
import { StartModule } from './../start/start.module';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ErrorHandlerModule,

    AuthModule,
    StartModule,
    UserModule
  ],
  exports: [
    LayoutModule,
  ],
  providers: [
    ErrorHandlerService,
    AuthService,
    UserService,
  ]
})
export class CoreModule { }
