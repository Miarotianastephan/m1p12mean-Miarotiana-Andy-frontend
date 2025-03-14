import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  private _visible = new BehaviorSubject<boolean>(false);
  visible$ = this._visible.asObservable();

  toggle(): void {
    const currentState = this._visible.getValue();
    this._visible.next(!currentState);
  }
}
