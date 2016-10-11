import {Component, OnInit} from 'angular2/core';
import {FormBuilder,ControlGroup,Validators} from 'angular2/common';

import {BasicValidators} from '../shared/basicValidators';
import {UserService} from './user.service';
import {User} from './user';

import {CanDeactivate, Router, RouteParams} from 'angular2/router';



@Component({
    templateUrl: 'app/users/user-form.component.html',
    providers: [UserService]
})
export class UserFormComponent implements OnInit, CanDeactivate{
    form: ControlGroup;
    title: string;
    user = new User();

    constructor(
        fb: FormBuilder,
        private _router: Router, 
        private _routeParams: RouteParams, 
        private _service: UserService
        ) { 
        
        this.form = fb.group({
            name: ['',Validators.required],
            email: ['', BasicValidators.email],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }   

    ngOnInit(){
        var id = this._routeParams.get("id");

        this.title = id ? "Edit User" : "New User";

        if (!id)
            return;

        this._service.getUser(id)
            .subscribe(
                user => this.user = user,
                response => {
                    if (response.status == 404) {
                        this._router.navigate(['NotFound']);
                    }
                });    
    }

    routerCanDeactivate(){
        if (this.form.dirty)
            return confirm("Really? Non saved data?!?");
    }

   save(){
        var result;

        if (this.user.id)
            result = this._service.updateUser(this.user);
        else
            result = this._service.addUser(this.user);

        result
            .subscribe(x=> {
                //mogoče je to že implementirano
                //this.form.markAsPristine();
                
                this._router.navigate(['Users']);
            })
    }
}