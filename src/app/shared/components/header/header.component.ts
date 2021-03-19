import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = [
    { title: 'Home', fragment: '' },
    { title: 'Map', fragment: 'map' },
    { title: 'Datasets', fragment: 'datasets' }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void { }

}
