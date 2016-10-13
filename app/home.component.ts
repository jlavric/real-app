import {Component,OnInit} from 'angular2/core';

@Component({
    
    template: `
        <h1>Home</h1> 
            <input type="text" [value]="title" (input)="title = $event.target.value" />
            Preview: {{title}}
            `

})
export class HomeComponent  {
    
}