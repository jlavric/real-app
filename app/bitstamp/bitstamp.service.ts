import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BitstampService {
    private _url = "https://www.bitstamp.net/api/v2/ticker/btcusd";
    private _url2 = "https://www.bitstamp.net/api/v2/transactions/btcusd";

    constructor(private _http: Http) { }

    getTicker() {
        return this._http.get(this._url).map(res => res.json());
    }

    getTransactions() {
        return this._http.get(this._url2).map(res => res.json());
    }
}