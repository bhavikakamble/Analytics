import { Component } from "@angular/core";
import { ChartType } from 'ng-apexcharts';
import { graphData } from './shared/graph-data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
 graphData = graphData;
 public chartOptions = {
  series: graphData,
  chart: {
    height: 350,
    type: "line" as ChartType 
  },
  title: {
      text: 'Demo Chart',
        align: 'left',
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: '14px',
          color: '#333333'
        }
  } as any,
  stroke: {
        show: true,
        width: 1,
        curve: 'smooth'
      } as any,
 xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false
        },
        title: {
          text: 'Time Interval'
        }
      } as any,
   legend: {
        show: false
      },
 };
copiedChartOption:any[] | undefined;

 ngOnInit():void {
  this.copiedChartOption = [...this.graphData];
  // console.log("this.copiedChartOption",this.copiedChartOption);
 }

 toggleSeries(val: any, event: MouseEvent): void {
    const isControlPressed = event.ctrlKey || event.metaKey;
    const highlightedItems = this.copiedChartOption!.filter((item: any) => {
      item.isSelected = false;
      return item.highlighted;
    });
    if (isControlPressed) {
      val.highlighted = !val.highlighted;
      if (!val.highlighted && highlightedItems.length === 1)
        this.copiedChartOption!.forEach((item: any) => {
          item.highlighted = true;
        });
    } else {
      val.highlighted = !val.highlighted;
      if (!val.highlighted && highlightedItems.length === 1) {
        this.copiedChartOption!.forEach((item: any) => {
          item.highlighted = true;
        });
      } else {
        this.copiedChartOption!.forEach((item: any) => {
          if (item !== val) {
            item.highlighted = false;
          } else {
            item.highlighted = true;
          }
        });
      }
    }
    const chartData = this.copiedChartOption!.filter(
      (item: any) => item.highlighted
    );
    this.chartOptions.series = chartData;

    // this.chart.updateOptions({
    //   series: this.chartOptions.series
    // });
    // this.cdr.detectChanges();
  }

//         //   mounted: (chartContext: any) => {
//         //     this.initialMinX = new Date(
//         //       this.filterRequestObject.from
//         //     ).getTime();
//         //     this.initialMaxX = new Date(this.filterRequestObject.to).getTime();
//         //   },
//         //   // Zoom in and Zoom out event
//         //   beforeZoom: (chartContext: any, { xaxis }: any) => {
//         //     this.onZoom(xaxis, chartContext);
//         //     return { xaxis: { min: undefined, max: undefined } };
//         //   },
//         //   // Home Button events
//         //   beforeResetZoom: (chartContext: any) => {
//         //     this.zoomHistory = [];
//         //     this.handleChartReset();
//         //     return {
//         //       xaxis: {
//         //         min: undefined,
//         //         max: undefined
//         //       }
//         //     };
//         //   }

}
