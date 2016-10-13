import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {OsebaService} from './oseba.service';

@Component({
    templateUrl: 'app/osebe/osebe.component.html',
    providers: [OsebaService],
    directives: [RouterLink]
})
export class OsebeComponent implements OnInit {

    osebe: any[];
    
    constructor(private _service: OsebaService) {

    }

    ngOnInit() {
        this._service.getOsebe()
            .subscribe(res => this.osebe = res.items);
    }

}