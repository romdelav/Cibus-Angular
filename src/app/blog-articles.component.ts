import { Component, OnInit } from '@angular/core';
import { ArticleCRUDService,  Article } from './articleCRUD.service'

@Component({
    selector: 'blog-articles',
    templateUrl: './blog-articles.component.html',
    styleUrls: ['./blog-articles.component.css']
})

export class BlogArticlesComponent implements OnInit {

    articles: Article[];

    constructor(
        private articleCRUD: ArticleCRUDService,
    ) {}

    ngOnInit() {
        this.getAllArticles();
    }

    getAllArticles() {
        this.articleCRUD.getArticles()
            .subscribe(data => { this.articles = data});
    }
}