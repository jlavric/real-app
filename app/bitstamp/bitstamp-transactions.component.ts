import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';

import {BitstampService} from './bitstamp.service';

@Component({
    templateUrl: 'app/bitstamp/bitstamp-transactions.component.html',
    providers: [BitstampService],
    directives: [RouterLink]
})
export class BitstampTransactionsComponent implements OnInit {

    transactions: any[];
    
    constructor(private _service: BitstampService) {

    }

    ngOnInit() {
        this._service.getTransactions()
            .subscribe(transactions => this.transactions = transactions);
    }
}