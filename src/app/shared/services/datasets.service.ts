import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IDataset } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DatasetsService {
  private base: string;

  constructor(private http: HttpClient) {
    const { apiUrl } = environment;
    this.base = `${apiUrl}/geodata/`;
  }

  getDatasets(): Observable<IDataset[]> {
    return this.http.get<IDataset[]>(this.base);
  }
}
