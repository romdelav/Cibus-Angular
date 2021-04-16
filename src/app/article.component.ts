import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleCRUDService, Article } from './articleCRUD.service';

@Component({
    selector: 'article-page',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
    
    article_ID: number;
    article: Article;

    constructor(
        private articleCRUD: ArticleCRUDService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.article_ID = this.route.snapshot.params['article_ID']
        this.getArticleByID();
    }

    getArticleByID() {
        this.articleCRUD.getArticle(this.article_ID)
        .subscribe(data => { this.article = data });
    }

}
