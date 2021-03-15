import { Component, OnInit } from '@angular/core';
import { RecipeCRUDService,  Recipe } from './recipeCRUD.service'

@Component({
    selector: 'soup-list',
    templateUrl: './soup-list.component.html',
    styleUrls: ['./soup-list.component.css']
})

export class SoupListComponent implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeCRUD: RecipeCRUDService,
    ) {}

    ngOnInit() {
        this.getAllSoups();
    }

    getAllSoups() {
        this.recipeCRUD.getSoups()
            .subscribe(data => { this.recipes = data});
    }
}