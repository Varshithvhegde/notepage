import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectionComponent } from './redirection/redirection.component';
import { HomeComponent } from './home/home.component';
import { ContentResolver } from './ContentService/contentresolver.service';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  {path : '', redirectTo : generateRandomRouteId(), pathMatch:'full', resolve: { content: ContentResolver },},
  {path : ':id', component:HomeComponent, pathMatch:'full',resolve: { content: ContentResolver },},
  {path : 'login/:id',component : PasswordComponent,pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
function generateRandomRouteId(): string | undefined {
  const length = 10;
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

