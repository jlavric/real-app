import {Component, OnInit} from 'angular2/core';

import {PostService} from './post.service';
import {UserService} from './user.service';
import {SpinnerComponent} from './spinner.component';
import {CapitalizePipe} from "./capitalizePipe";

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
    directives: [SpinnerComponent],
    pipes: [CapitalizePipe]
})
export class PostsComponent implements OnInit {

    posts = [];
    users = [];
    postsLoading;
    commentsLoading;
    selectedPost;

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


    private loadUsers(){
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    private loadPosts(filter?){
        this.postsLoading = true;
        this._postService.getPosts(filter)
                .subscribe(
                    posts => this.posts = posts,
                    null,
                    () => {
                        this.postsLoading = false;
                    }
                );
    }

    reloadPosts(filter){
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