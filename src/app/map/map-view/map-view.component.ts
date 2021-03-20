import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import LayerGroup from 'ol/layer/Group';
import View from 'ol/View';
import * as proj from 'ol/proj';
import { Stroke, Style } from 'ol/style';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorLayer } from 'ol/layer';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import LayerSwitcher, { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapElement!: ElementRef;

  map: Map;

  constructor() {

    // ********************** Basemaps ***************************

    const osm = new LayerTile({
      title: 'Open Street Map',
      type: 'base',
      visible: true,
      source: new SourceOSM()
    } as BaseLayerOptions);

    const watercolor = new LayerTile({
      title: 'Stamen Water Color',
      visible: true,
      source: new SourceStamen({
        layer: 'watercolor'
      })
    } as BaseLayerOptions);

    const labels = new LayerTile({
      title: 'Stamen Labels',
      visible: true,
      source: new SourceStamen({
        layer: 'terrain-labels'
      })
    } as BaseLayerOptions);

    const stamen = new LayerGroup({
      title: 'Stamen',
      type: 'base',
      visible: false,
      layers: [watercolor, labels]
    } as GroupLayerOptions);

    const baseMaps = new LayerGroup({
      title: 'Basemaps',
      layers: [stamen, osm]
    } as GroupLayerOptions);


    // ********************** Boundaries ***************************

    const boundaryStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 1
      })
    });

    const countries = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        strategy: bboxStrategy,
        url: extent => {
          return 'http://localhost:8080/geoserver/igad/ows?service=WFS&' +
            'version=1.0.0&request=GetFeature&typeName=igad:IGAD_Countries_L0&' +
            'maxFeatures=50&outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' + extent.join(',') + ',EPSG:3857';
        }
      }),
      visible: true,
      style: boundaryStyle
    });

    const states = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        strategy: bboxStrategy,
        url: extent => {
          return 'http://localhost:8080/geoserver/igad/ows?service=WFS&' +
            'version=1.0.0&request=GetFeature&typeName=igad:IGAD_Countries_L1&' +
            'maxFeatures=500&outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' + extent.join(',') + ',EPSG:3857';
        }
      }),
      visible: false,
      style: boundaryStyle
    });

    const regions = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        strategy: bboxStrategy,
        url: extent => {
          return 'http://localhost:8080/geoserver/igad/ows?service=WFS&' +
            'version=1.0.0&request=GetFeature&typeName=igad:IGAD_Countries_L2&' +
            'maxFeatures=5000&outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' + extent.join(',') + ',EPSG:3857';
        }
      }),
      visible: true,
      style: boundaryStyle
    });

    const boundaries = new LayerGroup({
      title: 'Admin Boundaries',
      layers: [countries, states, regions],
      combine: false
    } as BaseLayerOptions);


    // ********************** Map **********************************

    this.map = new Map({
      layers: [baseMaps, boundaries],
      view: new View({
        center: proj.fromLonLat([37.22, 9.38]),
        zoom: 5
      })
    });

    const layerSwitcher = new LayerSwitcher({
      reverse: true,
      groupSelectStyle: 'group'
    });

    this.map.addControl(layerSwitcher);
  }

  ngAfterViewInit(): void {
    this.map.setTarget(this.mapElement.nativeElement.id);
  }

}
