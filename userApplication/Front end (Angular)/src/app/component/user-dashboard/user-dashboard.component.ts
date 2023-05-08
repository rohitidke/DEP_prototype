import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import * as Highcharts from 'highcharts';
// import HC_more from "highcharts/highcharts-more";
// HC_more(Highcharts);
import * as Highcharts from 'highcharts/highmaps';
import * as worldMap from "@highcharts/map-collection/custom/world.geo.json";
// import * as germanyMap from '@highcharts/map-collection/countries/de/de-all.geo.json';
import * as germanyMap from 'src/assets/germany.json';

import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  // Highcharts = Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  showClusters = false
  updateFlag = false
  showError = false
  oneToOneFlag = false
  loading = false
  chartConstructor = 'mapChart';
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];

  linechart: any = {
    series: [
      {
        data: [7, 1, 8, 2, 5, 3],
      },
    ],
    chart: {
      type: 'line',
    },
    title: {
      text: 'linechart',
    },
  };


  constructor(private route: Router, private searchService: SearchService) { }

  bubblechart: any = {
    chart: {
      type: 'packedbubble'
    },
    series: null,
    plotOptions: {
      packedbubble: {
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: true,
          parentNodeLimit: true
        }
      }
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>Title:</b> {point.name}<br><b>Relevance score:</b> {point.value}<br><b>Content:</b> {point.content}'
    },
    title: {
      text: 'Search Result Clusters',
    },
  };

  callPostSearchResultsAPI(searchStr: any) {
    this.loading = true
    this.showClusters = false;
    this.showError = false;
    this.searchService.postSearchResults(searchStr)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.showClusters = false;
          this.showError = true;
          this.loading = false
        }
        else {
          this.loading = false
          this.showClusters = true;
          this.showError = false;
          this.bubblechart.series = data
          console.log(this.bubblechart)
          this.updateFlag = true;
          this.oneToOneFlag = true;
        }
      });
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }

  chartOptions: Highcharts.Options = {
    chart: {
      map: germanyMap
    },
    title: {
      text: 'Germany Index'
    },
    subtitle: {
      text:
        'Dummy data'
    },
    accessibility: {
      typeDescription: 'Map of Germany.'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      tickPixelInterval: 100
    },
    series: [
      {
        name: 'Random data',
        type: 'map',
        dataLabels: {
          enabled: true,
          format: '{point.properties.postal-code}'
        },
        keys: ['hasc', 'value'],
        joinBy: 'hasc',
        data:  [
          ['DE.SH', 728],
          ['DE.BE', 710],
          ['DE.MV', 963],
          ['DE.HB', 541],
          ['DE.HH', 622],
          ['DE.RP', 866],
          ['DE.SL', 398],
          ['DE.BY', 785],
          ['DE.SN', 223],
          ['DE.ST', 605],
          ['DE.NW', 237],
          ['DE.BW', 157],
          ['DE.HE', 134],
          ['DE.NI', 136],
          ['DE.TH', 704],
          ['DE.', 361]
      ],
      }
    ]
  };

}
