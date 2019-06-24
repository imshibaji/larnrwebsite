import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { MatTabsModule } from '@angular/material/tabs';

import { NgModule, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { VideosComponent } from './videos/videos.component';
import { NewsComponent } from './news/news.component';
import { JobsComponent } from './jobs/jobs.component';
import { CatagoryComponent } from './catagory/catagory.component';
import { ArticlesComponent } from './articles/articles.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
import { MatButtonModule, MatSelectModule } from '@angular/material';


const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'catagory', component: CatagoryComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'jobs', component: JobsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'banners', component: BannerComponent }
  ]}
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    VideosComponent,
    NewsComponent,
    JobsComponent,
    CatagoryComponent,
    ArticlesComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    RichTextEditorAllModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ]
})
export class AdminModule { }
