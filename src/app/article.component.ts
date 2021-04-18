import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleCRUDService, Article } from './articleCRUD.service';
import { CommentCRUDService } from './commentCRUD.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'article-page',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css'],
})

export class ArticleComponent implements OnInit {
    
    article_ID: number;
    article: Article;
    form: FormGroup;

    constructor(
        private articleCRUD: ArticleCRUDService,
        private commentCRUD: CommentCRUDService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.article_ID = this.route.snapshot.params['article_ID']
        this.getArticleByID();

        this.form = new FormGroup({
            Username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[\.a-zA-Z0-9,!? ]*$')
            ])),
            Text: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[\.a-zA-Z0-9,!? ]*$')
            ]))
        });
    }

    getArticleByID() {
        this.articleCRUD.getArticle(this.article_ID)
        .subscribe(data => { this.article = data });
    }
    
    onSubmit(newComment) {
        this.commentCRUD.addComment(this.article_ID, newComment)
          .subscribe()

    }
    
}
