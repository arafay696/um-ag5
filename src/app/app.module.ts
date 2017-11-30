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

import {UserUpdateComponent} from './user-update/user-update.component';
import {ToggleMenuDirective} from './toggle-menu.directive';
import {HeaderComponent} from './header/header.component';

import {ProjectsComponent} from './projects/projects.component';
import {NewProjectComponent} from './new-project/new-project.component';

import {NgDatepickerModule} from 'ng2-datepicker';
import {DatePipe} from '@angular/common';
import { EditProjectComponent } from './edit-project/edit-project.component';

@NgModule({
    declarations: [
        AppComponent,
        TitleComponent,
        SidebarComponent,
        UsersComponent,
        DashboardComponent,
        NewUserComponent,
        UserUpdateComponent,
        ToggleMenuDirective,
        HeaderComponent,
        ProjectsComponent,
        NewProjectComponent,
        EditProjectComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgDatepickerModule
    ],
    providers: [CommonService, DatePipe],
    bootstrap: [AppComponent, SidebarComponent, HeaderComponent]
})

export class AppModule {
}
