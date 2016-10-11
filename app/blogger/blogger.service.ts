import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BloggerService {
    private _baseUrl = "https://www.googleapis.com/blogger/v3/blogs/9064912799560123969";

    private key = "AIzaSyB7VqRAkJj0zBg-sk09ZBL2ORGPv7G1tYQ";

    constructor(private _http: Http) { }

    getPosts() {
        return this._http.get(this._baseUrl+"/posts?key="+this.key).
            map(res => res.json());
    }

    getPost(postId) {
        return this._http.get(this._baseUrl+"/posts/"+postId+"?key="+this.key).
            map(res => res.json());
    }

}