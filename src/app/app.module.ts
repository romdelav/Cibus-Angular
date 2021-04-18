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
import { DeleteIngredientItemPageComponent } from './delete-ingredient-item-page.component';
import { DeleteRecipeItemPageComponent } from './delete-recipe-item-page.component';
import { HomePageComponent } from './home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { VeganRecipeListComponent } from './vegan-recipe-list.component'
import { VegetarianRecipeListComponent } from './vegetarian-recipe-list.component';
import { MeatRecipeListComponent } from './meat-recipe-list.component';
import { SideListComponent } from './side-list.component';
import { SaladListComponent } from './salad-list.component';
import { SoupListComponent } from './soup-list.component';
import { GrainRecipeListComponent } from './grain-recipe-list.component';
import { MeatIngredientListComponent } from './meat-ingredient-list.component';
import { VegetableIngredientListComponent } from './vegetable-ingredient-list.component';
import { FruitListComponent } from './fruit-list.component';
import { GrainIngredientListComponent } from './grain-ingredient-list.component';
import { ProviderCRUDService } from './providerCRUD.service';
import { ProviderListPageComponent } from './provider-list-page.component';
import { FooterComponent } from './footer.component';
import { IngredientsByProviderComponent } from './ingredients-by-provider.component';
import { ProvidersByIngredientComponent } from './providers-by-ingredient.component';
import { ArticleCRUDService } from './articleCRUD.service';
import { BlogArticlesComponent } from './blog-articles.component';
import { ArticleComponent } from './article.component';
import { CommentCRUDService } from './commentCRUD.service';

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
    DeleteIngredientItemPageComponent,
    DeleteRecipeItemPageComponent,
    HomePageComponent,
    VeganRecipeListComponent,
    VegetarianRecipeListComponent,
    MeatRecipeListComponent,
    SideListComponent, 
    SaladListComponent,
    SoupListComponent,
    GrainRecipeListComponent,
    MeatIngredientListComponent,
    VegetableIngredientListComponent,
    FruitListComponent,
    GrainIngredientListComponent,
    ProviderListPageComponent,
    FooterComponent,
    IngredientsByProviderComponent,
    ProvidersByIngredientComponent,
    BlogArticlesComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    IngredientCRUDService,
    RecipeCRUDService,
    MeasurementCRUDService,
    CategoryCRUDService,
    ProviderCRUDService,
    ArticleCRUDService,
    CommentCRUDService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
