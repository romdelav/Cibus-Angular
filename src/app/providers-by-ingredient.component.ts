import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientCRUDService, Ingredient } from './ingredientCRUD.service';
import { ProviderCRUDService, Provider } from './providerCRUD.service';

@Component({
    selector: 'providers-by-ingredient',
    templateUrl: './providers-by-ingredient.component.html',
    styleUrls: ['./providers-by-ingredient.component.css']
})

export class ProvidersByIngredientComponent implements OnInit {
    
    user_ID: number;
    providers: Provider[];
    ingredient_ID: number;
    ingredient: Ingredient;

    constructor(
        private providerCRUD: ProviderCRUDService,
        private ingredientCRUD: IngredientCRUDService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.ingredient_ID = this.route.snapshot.params['ingredient_ID']
        this.getProvidersByIng();
        this.getIngredientByID();

    }

    getProvidersByIng() {
       this.providerCRUD.getProvidersByIngredient(this.ingredient_ID)
            .subscribe(data => { this.providers = data });  
    }

    getIngredientByID() {
        this.ingredientCRUD.getIngredient(this.ingredient_ID)
            .subscribe(data => this.ingredient = data)
    }
}
