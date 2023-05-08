import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Highcharts from 'highcharts';
import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  Highcharts = Highcharts
  chartData = null
  showClusters = false
  updateFlag = false
  showError = false
  oneToOneFlag = false
  loading = false

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

}
