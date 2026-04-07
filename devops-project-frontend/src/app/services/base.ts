import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/BaseResponde';

@Injectable({
  providedIn: 'root',
})
export class Base {
  http = inject(HttpClient);

  getMessage(): Observable<BaseResponse > {
    return this.http.get<BaseResponse>('/api/devops');
  }
}
