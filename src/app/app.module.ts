import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SpinnerComponent } from './shared/pages/spinner/spinner.component';
import {LoadingInterceptor} from "./core/http/loading.interceptor";
import {CoreModule} from "./core/core.module";
import {FeatureModule} from "./feature/feature.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FeatureModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
