import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DatasetsRoutingModule } from './datasets-routing.module';
import { DatasetsComponent } from './datasets.component';
import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { DatasetDetailComponent } from './dataset-detail/dataset-detail.component';


@NgModule({
  declarations: [DatasetsComponent, DatasetListComponent, DatasetDetailComponent],
  imports: [
    SharedModule,
    DatasetsRoutingModule
  ]
})
export class DatasetsModule { }
