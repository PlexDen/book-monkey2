import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BookMonkeyApp as PipesApp} from './pipes/book-monkey';
import {BookMonkeyApp as DirectivesApp} from './directives/book-monkey';

import {ActiveClassDirective} from '../../directives/active-class/active-class.directive';

@Component({
  selector: 'iteration-5',
  template: `
    <div class="ui two small ordered steps">
    <a [routerLink]="['Pipes']"
       activeClass="active"
       class="step">
      <div class="content">
        <div class="title">Pipes</div>
      </div>
    </a>
    <a [routerLink]="['Directives']"
       activeClass="active"
       class="step">
      <div class="content">
        <div class="title">Direktiven</div>
      </div>
    </a>
  </div>
  <div class="ui raised padded container segment">
    <router-outlet></router-outlet>
  </div>
  `,
  directives: [ROUTER_DIRECTIVES, ActiveClassDirective]
})
@RouteConfig([
  {path: 'pipes/...', name: 'Pipes', component: PipesApp, useAsDefault: true},
  {path: 'directives/...', name: 'Directives', component: DirectivesApp}
])
export class IterationFiveComponent { }