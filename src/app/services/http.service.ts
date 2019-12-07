import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImageResponse} from '../dto/ImageResponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  sendToRecognize(imageFile: any): Observable<ImageResponse> {
    console.log(imageFile);
    const formData = new FormData();
    formData.append('img', imageFile);
    return this.httpClient.post<ImageResponse>(environment.backend_root + '/recognize', formData);
  }

}
