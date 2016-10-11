import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {StringToDate} from '../shared/toDatePipe';

import {BloggerService} from './blogger.service';

@Component({
    templateUrl: 'app/blogger/blogger.component.html',
    providers: [BloggerService],
    directives: [RouterLink],
    pipes: [StringToDate]
})
export class BloggerComponent implements OnInit {

    posts= [];
    selectedPost = [];
    
    constructor(private _service: BloggerService) {

    }

    ngOnInit() {
        this._service.getPosts()
            .subscribe(posts => this.posts = posts.items);
    }

     getPost(post) {

        this._service.getPost(post.id)
            .subscribe(
            res => this.selectedPost = res);
    }
}