import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from './front.component';
import { MatCheckboxModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule } from '@angular/material';

import { AboutComponent } from './about/about.component';
import { TopicsComponent } from './topics/topics.component';
import { BusinessComponent } from './business/business.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'business', component: BusinessComponent },
      { path: 'contact', component: ContactComponent }
    ]
  }
];

@NgModule({
  declarations: [
    FrontComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    TopicsComponent,
    BusinessComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
  ]
})
export class FrontModule { }
