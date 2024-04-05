import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  guess(guess : any) {
    return this.http.post('http://127.0.0.1:3000/api/guess/', { guess });
  }
}
