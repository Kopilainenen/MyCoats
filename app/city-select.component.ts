import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { COOKIE_DOMAIN, COOKIE_PATH } from './lib/helpers';
import { City, CityService } from './city.service';
import UIkit from './lib/uikit';

@Component({
  selector: 'city-select',
  templateUrl: '../templates/city-select.component.html',
  styleUrls: ['../styles/components/city-select.component.less']
})
export class CitySelectComponent implements OnInit, AfterViewInit {
  cities: City[] = [];
  modalUI: any;
  @ViewChild('modal', { static: false }) modalRef: ElementRef;

  constructor(
    public cityService: CityService,
    private cookie: CookieService,
  ) {}

  public ngOnInit() {
    this.getCities();
  }

  public ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    const modal = <HTMLElement>this.modalRef.nativeElement;
    this.modalUI = UIkit.modal(modal);
  }

  public async getCities() {
    try {
      this.cities = await this.cityService.get();
      const current = this.cookie.get('city');
      if (current) {
        this.cityService.city = this.cities.find((c) => c.CODE === current);
      }
    } catch (e) {}
  }

  public changeCurrentCity(code: string) {
    this.cityService.city = this.cities.find((c) => c.CODE === code);
    this.cookie.put('city', code, {
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        path: COOKIE_PATH,
        domain: COOKIE_DOMAIN
      }
    );

    if (typeof window !== 'undefined') this.modalUI.hide();
  }
}
