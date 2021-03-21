export interface IDataset {
  id: string;
  name: string;
  description: string;
  data_type: string;
  band_count: number;
  download_count: number;
  preview_url: string;
  datafile_url: string;
  created?: string;
  updated?: string;
}
