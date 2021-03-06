import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {NewUserComponent} from './new-user/new-user.component';
import {UserUpdateComponent} from './user-update/user-update.component';

import {ProjectsComponent} from './projects/projects.component';
import {NewProjectComponent} from './new-project/new-project.component';
import {EditProjectComponent} from './edit-project/edit-project.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user/listing', component: UsersComponent},
    {path: 'add/user', component: NewUserComponent},
    {path: 'edit/user/:id', component: UserUpdateComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'project/new', component: NewProjectComponent},
    {path: 'edit/project/:id', component: EditProjectComponent},

    // if no route found
    {path: '*', redirectTo: '/dashboard'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes), CommonModule
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
