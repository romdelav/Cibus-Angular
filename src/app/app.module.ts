import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IngredientCRUDService } from './ingredientCRUD.service';
import { RecipeCRUDService } from './recipeCRUD.service';
import { MeasurementCRUDService } from './MeasurementCRUD.service';
import { CategoryCRUDService } from './categoryCRUD.service';
import { RecipeListPageComponent } from './recipe-list-page.component';
import { IngredientListPageComponent } from './ingredient-list-page.component';
import { ShowRecipeItemPageComponent } from './show-recipe-item-page.component';
import { ShowIngredientItemPageComponent } from './show-ingredient-item-page.component';
import { AddRecipeItemPageComponent } from './add-recipe-item-page.component';
import { AddIngredientItemPageComponent } from './add-Ingredient-item-page.component';
import { UpdateRecipeItemPageComponent } from './update-recipe-item-page.component';
import { UpdateIngredientItemPageComponent } from './update-ingredient-item-page.component';
import { HomePageComponent } from './home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
@NgModule({
  declarations: [
    AppComponent,
    RecipeListPageComponent,
    IngredientListPageComponent,
    ShowRecipeItemPageComponent,
    ShowIngredientItemPageComponent,
    AddRecipeItemPageComponent,
    AddIngredientItemPageComponent,
    UpdateRecipeItemPageComponent,
    UpdateIngredientItemPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    IngredientCRUDService,
    RecipeCRUDService,
    MeasurementCRUDService,
    CategoryCRUDService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
