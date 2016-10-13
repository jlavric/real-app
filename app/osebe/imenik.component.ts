import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {ImenikService} from './imenik.service';

@Component({
    templateUrl: 'app/osebe/imenik.component.html',
    providers: [ImenikService],
    directives: [RouterLink]
})
export class ImenikComponent implements OnInit {

    imenik: any[];
    
    constructor(private _service: ImenikService) {

    }

    ngOnInit() {
        this._service.getImenik()
            .subscribe(res => this.imenik = res.items);
    }

}