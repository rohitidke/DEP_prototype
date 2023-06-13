import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  showdata = false
  geojson: any = [];
  allcountrydata: any = {}
  chartConstructor = 'mapChart';
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
  @ViewChild('nameInput')
  nameInput!: ElementRef;
  country: any = ""
  countryJson: any = {}
  chartOptions!: Highcharts.Options;


  constructor(private route: Router, private searchService: SearchService) { }
  ngOnInit(): void {
  }

  getDataFromDEP() {
    this.showClusters = false;
    this.country = this.nameInput.nativeElement.value
    let countryid = "0"
    if (this.country=='germany')
    {
      countryid = "14"
    }
    else if (this.country=='czech')
    {
      countryid = "15"
    }
    else if (this.country=='austria')
    {
      countryid = "16"
    }

    this.searchService.getSearchResults(countryid)
      .subscribe((data: any) => {
        this.geojson = data;
        
        // this.geojson.push(data);
        console.log(this.geojson)
        this.countryJson = this.geojson[0]['DepartmentGeometry']
        this.showClusters = true;
        this.updateFlag = true;
        this.updatechart();
      });
  }

  fetchCountryData() {
    this.showClusters = false;
    this.country = this.nameInput.nativeElement.value
    const inputJson = {
      "application": "harran_university",
      "table": "employeeapp_departments"
    }

    this.searchService.fetchData(inputJson)
      .subscribe((data: any) => {
        this.allcountrydata = data;
        console.log(this.allcountrydata)
        this.showdata = true
      });
  }

  updatechart(): void {
    this.chartOptions = {
      chart: {
        map: this.countryJson
      },
      title: {
        text: this.country+" Map"
      },
      accessibility: {
        typeDescription: 'Map of Country'
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
        //   data:  [
        //     ['DE.SH', 728],
        //     ['DE.BE', 710],
        //     ['DE.MV', 963],
        //     ['DE.HB', 541],
        //     ['DE.HH', 622],
        //     ['DE.RP', 866],
        //     ['DE.SL', 398],
        //     ['DE.BY', 785],
        //     ['DE.SN', 223],
        //     ['DE.ST', 605],
        //     ['DE.NW', 237],
        //     ['DE.BW', 157],
        //     ['DE.HE', 134],
        //     ['DE.NI', 136],
        //     ['DE.TH', 704],
        //     ['DE.', 361]
        // ],
        }
      ]
    };
  }

  logout() {
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }



}
