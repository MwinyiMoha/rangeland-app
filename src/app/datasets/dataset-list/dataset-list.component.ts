import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IDataset } from 'src/app/shared/models';
import { DatasetsService } from 'src/app/shared/services/datasets.service';

@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss']
})
export class DatasetListComponent implements OnInit {
  datasets$: Observable<IDataset[]>;

  constructor(private datasets: DatasetsService) {
    this.datasets$ = this.datasets.getDatasets();
  }

  ngOnInit(): void { }

}
