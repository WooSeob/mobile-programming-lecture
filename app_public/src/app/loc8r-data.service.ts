import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Loc8rDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // private apiBaseUrl = 'http://localhost:9999/api';
  private apiBaseUrl = 'https://loc8rv3.herokuapp.com/api';

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 200000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;

    // let headers = new Headers({ 'Content-Type': 'text/html' });
    // let options = new RequestOptions({ headers: headers });

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Location[])
      .catch(this.handlerError);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Location)
      .catch(this.handlerError);
  }

  public addReviewByLocationId(
    locationId: string,
    formData: Review
  ): Promise<Review> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('loc8r-token')}`,
      }),
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then((Response) => Response as any)
      .catch(this.handlerError);
  }

  private handlerError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response as AuthResponse)
      .catch(this.handlerError);
  }
}
