import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasetDetailComponent } from './dataset-detail/dataset-detail.component';

import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { DatasetsComponent } from './datasets.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetsComponent,
    children: [
      { path: ':id', component: DatasetDetailComponent },
      { path: '', component: DatasetListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetsRoutingModule { }
