import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    // Initial value after 0ms delay, 120 secs interval after that
    return timer(0, 120000).pipe(
      concatMap(() => this.http.get<string[]>(environment.jobsAPI))
    );
  }
}
