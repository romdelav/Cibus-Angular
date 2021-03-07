import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListPageComponent } from './recipe-list-page.component';
import { IngredientListPageComponent } from './ingredient-list-page.component';
import { ShowRecipeItemPageComponent } from './show-recipe-item-page.component';
import { ShowIngredientItemPageComponent } from './show-ingredient-item-page.component';
import { AddRecipeItemPageComponent } from './add-recipe-item-page.component';
import { AddIngredientItemPageComponent } from './add-Ingredient-item-page.component';
import { UpdateRecipeItemPageComponent } from './update-recipe-item-page.component';
import { UpdateIngredientItemPageComponent } from './update-ingredient-item-page.component';
import { HomePageComponent } from './home-page.component';


const routes: Routes = [
  { path:'recipes', component: RecipeListPageComponent },
  { path:'recipes/:recipe_ID', component: ShowRecipeItemPageComponent },
  { path:'update-recipe/:recipe_ID', component: UpdateRecipeItemPageComponent },
  { path:'update-ingredient/:ingredient_ID', component: UpdateIngredientItemPageComponent },
  { path:'ingredients', component: IngredientListPageComponent },
  { path:'ingredients/:ingredient_ID', component: ShowIngredientItemPageComponent},
  { path:'add-recipe', component: AddRecipeItemPageComponent },
  { path:'add-ingredient', component: AddIngredientItemPageComponent },
  { path:'', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }