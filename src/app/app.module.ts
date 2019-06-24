import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule,
         MatIconModule,
         MatSidenavModule,
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatCardModule
       } from '@angular/material';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MediaIconComponent } from './media-icon/media-icon.component';
import { EmailFieldComponent } from './email-field/email-field.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { PartiturasComponent } from './partituras/partituras.component';
import { InfoComponent } from './info/info.component';
import { UserComponent } from './user/user.component';
import { ConfigComponent } from './config/config.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'partituras', component: PartiturasComponent },
  { path: 'info', component: InfoComponent },
  // { path: 'usuarios', component: UserComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    MenuItemComponent,
    MediaIconComponent,
    EmailFieldComponent,
    SearchBarComponent,
    PageNotFoundComponent,
    HomeComponent,
    GaleriaComponent,
    PartiturasComponent,
    InfoComponent,
    UserComponent,
    ConfigComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
