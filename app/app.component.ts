import {Component} from 'angular2/core';
import {RouteConfig,ROUTER_DIRECTIVES} from 'angular2/router'

import {NavBarComponent} from './shared/navbar.component';
import {HomeComponent} from './home.component';
import {UsersComponent} from './users/users.component';
import {BitstampTransactionsComponent} from './bitstamp/bitstamp-transactions.component';
import {UserFormComponent} from './users/user-form.component';
import {PostsComponent} from './posts/posts.component';
import {NotFoundComponent} from './not-found.component';
import {BloggerComponent} from './blogger/blogger.component';

@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent},
    {path: '/users', name: 'Users', component: UsersComponent},
    {path: '/users/:id', name: 'EditUser', component: UserFormComponent},
    {path: '/users/new', name: 'NewUser', component: UserFormComponent},
    {path: '/posts', name: 'Posts', component: PostsComponent},
    {path: '/blogger-posts', name: 'BloggerPosts', component: BloggerComponent},
    {path: '/transactions', name: 'Transactions', component: BitstampTransactionsComponent},
    {path: '/not-found', name: 'NotFound', component: NotFoundComponent },
    {path: '/*other', name: 'Other', redirectTo: ['Home']},
])
@Component({
    selector: 'real-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [NavBarComponent,ROUTER_DIRECTIVES,UserFormComponent,BitstampTransactionsComponent,BloggerComponent]
})
export class AppComponent { }