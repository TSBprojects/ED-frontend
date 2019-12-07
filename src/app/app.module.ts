import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule, MatSnackBarModule} from '@angular/material';
import {ImageUploadModule} from 'ng2-imageupload';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ImageUploadModule,
    MatSnackBarModule,
    MatProgressBarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
