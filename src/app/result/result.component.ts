import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  student: any = null;

  ngOnInit() {
    const data = localStorage.getItem('result');
    if (data) {
      this.student = JSON.parse(data);
    }
  }
}
