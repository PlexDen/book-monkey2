import { addProviders, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: BookMonkey', () => {
  beforeEach(() => {
    addProviders([AppComponent]);
  });

  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));
});