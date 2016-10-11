import {Component, Input, Output, EventEmitter, OnChanges} from 'angular2/core';

@Component({
    selector: 'pagination',
    templateUrl: 'app/pagination.component.html'
})
export class PaginationComponent implements OnChanges {

    currentPage;
    pages: any[];

    @Input() items = [];

    @Input('page-size') pageSize;
    @Output('page-changed') pageChanged = new EventEmitter();

    constructor() { }

    next() {
        if (this.currentPage == this.pages.length)
            return;

        this.currentPage++;
        this.pageChanged.emit(this.currentPage);
    }

    previous() {

        if (this.currentPage == 1)
            return;

        this.currentPage--;
        this.pageChanged.emit(this.currentPage);

    }

    changePage(page) {

        this.currentPage = page;
        this.pageChanged.emit(this.currentPage);

    }

    ngOnChanges() {

        this.currentPage = 1;
        var pagesCount = Math.ceil(this.items.length / this.pageSize); //mogoče je tole bolj prav
       // var pagesCount = this.items.length / this.pageSize;
        this.pages = [];
        for (var i = 1; i <= pagesCount; i++)
            this.pages.push(i);

    }

}