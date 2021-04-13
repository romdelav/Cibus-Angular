import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientCRUDService, Ingredient } from './ingredientCRUD.service';

@Component({
    selector: 'ingredients-by-provider',
    templateUrl: './ingredients-by-provider.component.html',
    styleUrls: ['./ingredients-by-provider.component.css']
})

export class IngredientsByProviderComponent implements OnInit {
    
    User_ID: number;
    ingredients: Ingredient[];

    constructor(
        private ingredientCRUD: IngredientCRUDService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.User_ID = this.route.snapshot.params['user_ID']
        this.getIngredientsByProv();
    }

    getIngredientsByProv() {
       this.ingredientCRUD.getIngredientsByProvider(this.User_ID)
            .subscribe(data => { this.ingredients = data });  
    }
}
