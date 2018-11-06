import { Component, OnInit } from '@angular/core';
import { LazyLoadingScriptService }  from "./services/lazy-loading-script.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lazy-loading-scripts';
  status = '';

  constructor(private lazyLoadingScriptService: LazyLoadingScriptService) {}

  ngOnInit() {
      this.lazyLoadingScriptService.load('filepicker').then(data => {
            console.log('script loaded ', data);
        }).catch(error => console.log(error));
  }
}
