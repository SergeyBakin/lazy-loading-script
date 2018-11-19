import { Component, OnInit } from '@angular/core';
import { LazyLoadingScriptService }  from "./services/lazy-loading-script.service";
import { catchError }  from "rxjs/operators";
import { of } from 'rxjs';
import { IMetaDataScript }  from "./models/script-loading";
import { scriptOne }  from "./data/script-loading-data";

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
      // this.lazyLoadingScriptService.load('filepicker').then(data => {
      //       console.log('script loaded ', data);
      //   }).catch(error => console.log(error));
  }

  onClickAddScript() {
      this.lazyLoadingScriptService.loadOne(scriptOne)
        .pipe(
            catchError( err => {
                console.log('err_loading_script', err);
                return of({loaded: false});
            })
        )
        .subscribe( resScript => {
          console.log('resScript',resScript);
          this.status = resScript.loaded ? 'Loaded' : 'Fail';
        });
  }
}
