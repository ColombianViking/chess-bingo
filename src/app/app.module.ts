import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BingoBoardComponent } from './bingo-board/bingo-board.component';
import { ExplanationsComponent } from './explanations/explanations.component';

@NgModule({
  declarations: [
    AppComponent,
    BingoBoardComponent,
    ExplanationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
