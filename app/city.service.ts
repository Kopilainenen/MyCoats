import {Injectable} from '@angular/core';
import {setQueryParams} from './lib/helpers';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {RestService, ApiQueryParams} from './lib/RestService';

export interface City {
  PROPERTY_ADDRESS_VALUE: string;
  PROPERTY_EMAIL_VALUE: string;
  CODE: string;
  NAME: string;
  PREVIEW_PICTURE: any[];
  PROPERTY_INFLECTED_VALUE: string;
  ID?: string;
  ACTIVE?: 'Y' | 'N';
}

@Injectable()
export class CityService extends RestService {
  // @ts-ignore
  // @ts-ignore
  city: City = {
    PROPERTY_EMAIL_VALUE: null,
    PROPERTY_ADDRESS_VALUE: null,
    CODE: null,
    PREVIEW_PICTURE: null,
    NAME: 'Россия',
    PROPERTY_INFLECTED_VALUE: 'России'
  };

  private apiUrl = `${environment.apiUrl}shop/Cities/`;
  PROPERTY_NAME_VALUE: null;
  PROPERTY_INFLECTED_VALUE: null;


  constructor(private http: HttpClient) {
    super();
  }

  public get(params?: ApiQueryParams): Promise<City[] | any> {
    const apiUrl = setQueryParams(this.apiUrl, params);
    return this.http.get<City[]>(apiUrl, {withCredentials: true})
      .toPromise()
      .catch(this.handleError);
  }
}
