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
import { DeleteIngredientItemPageComponent } from './delete-ingredient-item-page.component';
import { DeleteRecipeItemPageComponent } from './delete-recipe-item-page.component';
import { VeganRecipeListComponent } from './vegan-recipe-list.component';
import { VegetarianRecipeListComponent } from './vegetarian-recipe-list.component';
import { MeatRecipeListComponent } from './meat-recipe-list.component';
import { SideListComponent } from './side-list.component';
import { SaladListComponent } from './salad-list.component';
import { SoupListComponent } from './soup-list.component'
import { GrainRecipeListComponent } from './grain-recipe-list.component';
import { MeatIngredientListComponent } from './meat-ingredient-list.component';
import { VegetableIngredientListComponent } from './vegetable-ingredient-list.component';

const routes: Routes = [
  { path:'recipes', component: RecipeListPageComponent },
  { path:'recipes/:recipe_ID', component: ShowRecipeItemPageComponent },
  { path:'vegan-recipes', component: VeganRecipeListComponent },
  { path:'vegetarian-recipes', component: VegetarianRecipeListComponent },
  { path:'meat-recipes', component: MeatRecipeListComponent },
  { path:'sides', component: SideListComponent },
  { path:'salads', component: SaladListComponent }, 
  { path:'soups', component: SoupListComponent },
  { path:'grain-recipes', component: GrainRecipeListComponent },
  { path:'update-recipe/:recipe_ID', component: UpdateRecipeItemPageComponent },
  { path:'delete-recipe/:recipe_ID', component: DeleteRecipeItemPageComponent },
  { path:'update-ingredient/:ingredient_ID', component: UpdateIngredientItemPageComponent },
  { path:'delete-ingredient/:ingredient_ID', component: DeleteIngredientItemPageComponent },
  { path:'ingredients', component: IngredientListPageComponent },
  { path:'meat', component: MeatIngredientListComponent },
  { path:'vegetables', component: VegetableIngredientListComponent },
  { path:'ingredients/:ingredient_ID', component: ShowIngredientItemPageComponent },
  { path:'add-recipe', component: AddRecipeItemPageComponent },
  { path:'add-ingredient', component: AddIngredientItemPageComponent },
  { path:'', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
