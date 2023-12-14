import { Injectable, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/constant/menu';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService  {
  private _showSearch = signal(false); // signal is a helper function to create a BehaviorSubject
  private _searchItems = signal<any[]>([]);
  private _subscription = new Subscription();

  constructor(private router: Router) {
    /** Set dynamic menu */
    
  }

  get showSearch() {
    return this._showSearch();
  }

  get searchedItems() {
    return this._searchItems();
  }

  set showSearch(value: boolean) {
    this._showSearch.set(value);
  }


  public toggleSidebar() {
    this._showSearch.set(!this._showSearch());

  }

  public toggleMenu(menu: any) {
    this.showSearch = true;
    menu.expanded = !menu.expanded;
  }

  ngOnDestroy(): void {
    if(this._subscription) this._subscription.unsubscribe();
  }
}