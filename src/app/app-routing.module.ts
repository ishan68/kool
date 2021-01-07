//Import Ng Module 
import { NgModule } from '@angular/core';


//Import Routes and RouterModule for route features
import { Routes, RouterModule } from '@angular/router';


/**
 * Here we will import the components
 * which are routes.
 */

 //Import Homepage Component
import { HomepageComponent } from './components/pages/homepage/homepage.component'; 
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CakeComponent } from './components/pages/cake/cake.component';
import { AuthGuard } from './helpers/auth.guard';
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
import { CakeBuilderComponent } from './components/pages/cake-builder/cake-builder.component';
import { BlogsComponent } from './components/pages/blogs/blogs.component';
import { EnquirySuccessComponent } from './components/pages/enquiry-success/enquiry-success.component';
import { DisclaimerComponent } from './components/pages/disclaimer/disclaimer.component';
import { OffersComponent } from './components/pages/offers/offers.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { SearchComponent } from './components/pages/search/search.component';


const routes: Routes = [

  //Home Page
  {path: '', component: HomepageComponent},

  //Login Page
  {path: 'login', component: LoginComponent},

  //Register Page
  {path: 'register', component: RegisterComponent},

  //Cake Detail Page
  {path: 'cake', component: CakeComponent},

  //My account page
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},

  //Categories page
  {path: 'categories', component: CategoriesComponent},

  //Cakes page 
  {path:'cakes',component: CakesComponent},

   //Cakes page 
  //  {path:'categories/:category',component: CakesComponent},

  //Cakes page 
  {path:'search',component: SearchComponent},

  //Cart Page
  {path: 'cart', component: CartComponent},

  //Checkout Page
  {path: 'checkout', component: CheckoutComponent},

  //Privacy page
  {path: 'privacy', component: PrivacyComponent},

  //FAQ Page
  {path: 'faq', component: FaqComponent},

  //Refund Page
  {path: 'refund', component: RefundComponent},

  //GDPRS
  {path: 'gdprs', component: GdprsComponent},

  //Sales
  {path: 'sales', component: SalesComponent},

  //Come soon
  {path: 'come-soon', component: ComesoonComponent},

  //Contact page
  {path: 'contact', component: ContactComponent},

  //Order success page
  {path: 'order-success/:id', component: OrderSuccessComponent},

  //Cake builder form
  {path: 'cake-builder', component: CakeBuilderComponent},

  //Blog page
  {path: 'blogs', component: BlogsComponent},

  //Offer page
  {path:'offers', component: OffersComponent},

  //Enquiry submit
  {path: 'enquiry-success', component: EnquirySuccessComponent},

  {path: 'disclaimer', component: DisclaimerComponent},

  //About Us
  {path: 'about-us', component: AboutUsComponent},


  //Other wise redirect to home
  {path: '**', redirectTo: ''}




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
