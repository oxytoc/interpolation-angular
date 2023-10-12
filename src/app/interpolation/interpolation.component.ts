import { AfterViewInit, Component } from '@angular/core';

import functionPlot from 'function-plot'

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-interpolation',
  templateUrl: './interpolation.component.html',
  styleUrls: ['./interpolation.component.scss']
})
export class InterpolationComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.prepareDataForPlot();
  }

  private prepareDataForPlot() : void {
    const pi = Math.PI;
    const step = (2 * pi) / 7;
  
    const x_values: number[] = [];
    const y_values: number[] = [];
  
    // Создаем массив значений x и соответствующих им значений функции y
    for (let x = -pi; x <= pi; x += step) {
      x_values.push(x);
      y_values.push(this.f(x));
    }
  
    const interpolatedPoints: Point[] = [];
  
    // Отображаем интерполяционный полином Лагранжа на графике
    for (let x = -pi; x <= pi; x += 0.01) {
      const interpolatedValue = this.lagrangeInterpolation(x, x_values, y_values);
      interpolatedPoints.push({ x, y: interpolatedValue });
    }
    const dataForPlot = interpolatedPoints.map((point) => [point.x, point.y]);
    this.createPlot(dataForPlot);
  }

  private createPlot(dataForPlot: number[][]): void {
    functionPlot({
      target: "#chartdiv",
      width: 1600,
      height: 800,
      grid: true,
      data: [
        {
          fn: "sin(x)",
          range: [-Infinity, 0],
        }, 
        {
          fn: 'sin(x) + ln(x)',
          range: [0, Infinity]
        },
        {
          points: dataForPlot,
          fnType: 'points',
          graphType: 'scatter',
          color: 'red',
        },
      ]
    });
  }

  private lagrangeInterpolation(x: number, x_values: number[], y_values: number[]): number {
    let result = 0.0;
    for (let i = 0; i < x_values.length; ++i) {
      let term = y_values[i];
      for (let j = 0; j < x_values.length; ++j) {
        if (j !== i) {
          term *= (x - x_values[j]) / (x_values[i] - x_values[j]);
        }
      }
      result += term;
    }
    return result;
  }

  private f(x: number): number {
    if (x <= 0.0) {
      return Math.sin(x);
    } else {
      return Math.sin(x) + Math.log(x);
    }
  }
}
