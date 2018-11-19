import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { IMetaDataScript } from '../models/script-loading';
import { scriptsPrivate }  from "../data/script-loading-data";

@Injectable({
  providedIn: 'root'
})
export class LazyLoadingScriptService {

  private scripts: Array<IMetaDataScript> = [];
  private scriptsPrivate: any = scriptsPrivate;

  constructor() { }

  public loadMany(): Observable<IMetaDataScript> {
      return new Observable<IMetaDataScript>((observer: Observer<IMetaDataScript>) => {

      });
  }

  public loadOne(script: IMetaDataScript): Observable<IMetaDataScript> {
      return new Observable<IMetaDataScript>((observer: Observer<IMetaDataScript>) => {
          const existingScript = this.scripts.find(s => s.name === script.name);

          // Complete if already loaded
          if (existingScript && existingScript.loaded) {
            observer.next(existingScript);
            observer.complete();
          } else {
            // Add the script to the store
            this.scripts = [...this.scripts, script];

            // Load the script
            const scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.src = script.src;

            if ( (<any>scriptElement).readyState ) {
                // For IE browsers
                (<any>scriptElement).onreadystatechange = () => {
                    if ( (<any>scriptElement).readyState === "loaded" || (<any>scriptElement).readyState === "complete") {
                        (<any>scriptElement).onreadystatechange = null;
                        script.loaded = true;
                        observer.next(script);
                        observer.complete();
                    }
                };
            } else {
                // Others browsers
                scriptElement.onload = () => {
                    script.loaded = true;
                    observer.next(script);
                    observer.complete();
                };
            }

            scriptElement.onerror = (error: any) => {
              observer.error('Couldn\'t load script ' + script.src);
            };

            document.getElementsByTagName('body')[0].appendChild(scriptElement);
          }
      });
  }

  // loading scripts from internal references, or other words private scripts
  public load(...scriptsArr: string[]) {
    const promises: any[] = [];
    scriptsArr.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  private loadScript(name: string) {
    return new Promise((resolve, reject) => {
        //resolve if already loaded
        if (this.scriptsPrivate[name].loaded) {
            resolve({script: name, loaded: true, status: 'Already Loaded'});
        } else {
            //load script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.scriptsPrivate[name].src;
            if ( (<any>script).readyState ) {
                //IE
                (<any>script).onreadystatechange = () => {
                    if ( (<any>script).readyState === "loaded" || (<any>script).readyState === "complete") {
                        (<any>script).onreadystatechange = null;
                        this.scriptsPrivate[name].loaded = true;
                        resolve({script: name, loaded: true, status: 'Loaded'});
                    }
                };
            } else {
                //Others
                script.onload = () => {
                    this.scriptsPrivate[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                };
            }
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    });
  }
}
