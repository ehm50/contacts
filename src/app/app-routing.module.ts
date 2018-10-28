import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactEntryComponent } from './contact-entry/contact-entry.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: "", redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ContactListComponent },
  { path: 'details', component: ContactDetailsComponent },
  { path: 'entry', component: ContactEntryComponent },
  { path: 'new/:flag', component: ContactEntryComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
