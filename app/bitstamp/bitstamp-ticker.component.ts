import {Component, OnInit} from 'angular2/core';
import {BitstampService} from './bitstamp.service';

@Component({
    selector: 'bitstamp-ticker',
    template: `
    <span class="glyphicon glyphicon-usd navbar-text">{{ticker.last}} {{ticker.low}}/{{ticker.high}}</span>
    `
    ,
    providers: [BitstampService]
})
export class BitstampTicker implements OnInit {

    ticker = [];
    
    constructor(private _service: BitstampService) { }

    ngOnInit() { 
        this._service.getTicker().
            subscribe(
                ticker => this.ticker=ticker,
                null,
                () => {
                    console.log(this.ticker);
                }
                );
    }
}