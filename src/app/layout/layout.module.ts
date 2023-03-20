import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserModule } from '../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [NavbarComponent, AsideComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    OverlayPanelModule,
    AvatarGroupModule,
    DividerModule,
    AuthModule,
    UserModule,
  ],
  exports: [NavbarComponent, AsideComponent, FooterComponent],
})
export class LayoutModule {}
