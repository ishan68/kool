import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//Import bootstrap for angular
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Import Owl Carousel
import {  OwlModule } from 'ngx-owl-carousel';
 


// Import the library
// import { NgxImageZoomModule } from 'ngx-image-zoom';

//Import Interceptors 
import {ErrorInterceptor} from './helpers/error.interceptor'
import {JwtInterceptor} from './helpers/jwt.interceptors'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { SliderComponent } from './components/common/slider/slider.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CakeComponent } from './components/pages/cake/cake.component';

//Import forms module and reactive forms module for form handling
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/pages/account/account.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { CakesComponent } from './components/pages/cakes/cakes.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { RefundComponent } from './components/pages/refund/refund.component';
import { GdprsComponent } from './components/pages/gdprs/gdprs.component';
import { SalesComponent } from './components/pages/sales/sales.component';
import { ComesoonComponent } from './components/pages/comesoon/comesoon.component';
import { OrderSuccessComponent } from './components/pages/order-success/order-success.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LineItemComponent } from './components/common/line-item/line-item.component';
// import { Header2Component } from './components/header2/header2.component';
import { CakeBuilderComponent } from './components/pages/cake-builder/cake-builder.component';
import { BlogsComponent } from './components/pages/blogs/blogs.component';
import { EnquirySuccessComponent } from './components/pages/enquiry-success/enquiry-success.component';
import { DisclaimerComponent } from './components/pages/disclaimer/disclaimer.component';
import { TrustPilotReviewsComponent } from './components/common/trust-pilot-reviews/trust-pilot-reviews.component';
import { OffersComponent } from './components/pages/offers/offers.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { CarouselComponent } from './components/common/carousel/carousel.component';
import { CallComponent } from './components/common/call/call.component';
import { NewsletterComponent } from './components/common/newsletter/newsletter.component';
import { Header2Component } from './components/common/header2/header2.component';
import { SearchComponent } from './components/pages/search/search.component';
import { WhatsappComponent } from './components/common/whatsapp/whatsapp.component';
import { ModalComponent } from './components/common/modal/modal.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    SliderComponent,
    LoginComponent,
    RegisterComponent,
    CakeComponent,
    AccountComponent,
    CategoriesComponent,
    CakesComponent,
    CartComponent,
    CheckoutComponent,
    PrivacyComponent,
    FaqComponent,
    RefundComponent,
    GdprsComponent,
    SalesComponent,
    ComesoonComponent,
    OrderSuccessComponent,
    ContactComponent,
    LineItemComponent,
    // Header2Component,
    CakeBuilderComponent,
    BlogsComponent,
    EnquirySuccessComponent,
    DisclaimerComponent,
    TrustPilotReviewsComponent,
    OffersComponent,
    AboutUsComponent,
    CarouselComponent,
    CallComponent,
    NewsletterComponent,
    Header2Component,
    SearchComponent,
    WhatsappComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    NgbModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
