import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OsebaService {
    private _url = "http://localhost:8080/ords/rtv/fizicne_osebe?state=123456789";

    constructor(private _http: Http) { }

    getOsebe() {
        return this._http.get(this._url).map(res => res.json());
    }

    getOseba(osebaId){
        return this._http.get(this.getOsebaUrl(osebaId))
            .map(res=>res.json());
    }

    private getOsebaUrl(id){
        return this._url+"/"+id;
    }
}