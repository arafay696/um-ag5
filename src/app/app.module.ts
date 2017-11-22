import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {TitleComponent} from './title/title.component';

import {CommonService} from './common.service';
import {AppRoutingModule} from './/app-routing.module';
import {SidebarComponent} from './sidebar/sidebar.component';

import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewUserComponent} from './new-user/new-user.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
    declarations: [
        AppComponent,
        TitleComponent,
        SidebarComponent,
        UsersComponent,
        DashboardComponent,
        NewUserComponent,
        UserUpdateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [CommonService],
    bootstrap: [AppComponent, SidebarComponent]
})

export class AppModule {
}
