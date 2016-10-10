import {Component, OnInit} from 'angular2/core';

import {PostService} from './post.service';
import {UserService} from './user.service';
import {SpinnerComponent} from './spinner.component';
import {CapitalizePipe} from "./capitalizePipe";
import {PaginationComponent} from "./pagination.component";

@Component({
    templateUrl: 'app/posts.component.html',
    styles: [`
         .posts li { cursor: default; }
         .posts li:hover { background: #cddc39; } 
         .list-group-item.active, 
         .list-group-item.active:hover, 
         .list-group-item.active:focus { 
             background-color: #4caf50;
             border-color: #ecf0f1; 
             color: #2c3e50;
         }
     `],

    providers: [PostService, UserService],
    directives: [SpinnerComponent, PaginationComponent],
    pipes: [CapitalizePipe]
})
export class PostsComponent implements OnInit {

    posts = [];
    pagedPosts = [];
    users = [];
    postsLoading;
    commentsLoading;
    selectedPost;
    pageSizeFromSettings = 10;

    constructor(
        private _postService: PostService,
        private _userService: UserService)
    { }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();

        this._postService.getPosts()
            .subscribe(
            posts => this.posts = posts,
            null,
            () => {
                this.postsLoading = false;
            }
            );
    }


    private loadUsers() {
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    private loadPosts(filter?) {
        this.postsLoading = true;
        this._postService.getPosts(filter)
            .subscribe(
            posts => {
                this.posts = posts,
                    this.pagedPosts = this.getPostsInPage(1)
            },
            null,
            () => {
                this.postsLoading = false;
            }
            );
    }

    onPageChanged(page) {
        this.pagedPosts = this.getPostsInPage(page);
    }

    private getPostsInPage(page) {
        var result = [];
        var start = (page - 1) * this.pageSizeFromSettings;
        var end = Math.min(start + this.pageSizeFromSettings, this.posts.length);

        for (var i = start; i < end; i++)
            result.push(this.posts[i]);

        return result;
    }

    reloadPosts(filter) {
        this.selectedPost = null;
        this.loadPosts(filter);
    }

    select(post) {
        this.selectedPost = post;

        this.commentsLoading = true;
        this._postService.getComments(post.id)
            .subscribe(
            comments => this.selectedPost.comments = comments,
            null,
            () => {
                this.commentsLoading = false;
            }
            );
    }

}   