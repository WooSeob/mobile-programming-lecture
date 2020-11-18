import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root',
})
export class Loc8rDataService {
  constructor(private http: HttpClient) {}

  // private apiBaseUrl = 'http://localhost:3000/api';
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
    return this.http
      .post(url, formData)
      .toPromise()
      .then((Response) => Response as any)
      .catch(this.handlerError);
  }

  private handlerError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
