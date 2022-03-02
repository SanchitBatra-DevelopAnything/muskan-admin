import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContainerComponent } from './container/container.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DailyreportComponent } from './dailyreport/dailyreport.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { ItemComponent } from './item/item.component';
import { SubcategoryItemComponent } from './subcategory-item/subcategory-item.component';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { RetailerNotificationComponent } from './retailer-notification/retailer-notification.component';
import { ManageWindowComponent } from './manage-window/manage-window.component';


const appRoutes : Routes = [
  {path : 'notifications' , component : NotificationsComponent , canActivate : [AuthGuardService]},
  {path : 'dailyReport' , component : DailyreportComponent  , canActivate : [AuthGuardService]},
  {path : 'categories' , component : CategoryListComponent , canActivate : [AuthGuardService]},
  {path : 'category/upload' , component : CategoryFormComponent , canActivate : [AuthGuardService]},
  {path : 'manage' , component : ManageWindowComponent , canActivate : [AuthGuardService]},
  {path: '' , component:LoginComponent , pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ItemListComponent,
    SubcategoryListComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ContainerComponent,
    CategoryItemComponent,
    ItemComponent,
    SubcategoryItemComponent,
    AddItemFormComponent,
    CategoryFormComponent,
    NotificationsComponent,
    RetailerNotificationComponent,
    ManageWindowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes,{useHash: true}),
  ],
  providers: [], //the classes for services already have provided in root.
  bootstrap: [AppComponent]
})
export class AppModule { }
