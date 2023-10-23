import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('myCanvas', { static: true })
  element!: ElementRef;
  public num:number=0;
  public interfaceRequests: any = [];
  public fechado: any = [];
  public andamento: any = [];
  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    new Chart(this.element.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        datasets: [
          {
            data: [85, 70, 88, 65, 22, 10, 65, 95, 28, 98, 200],
            borderColor: '#00AEFF',
            fill: true,
          },
        ],
      },
    });
    this.requests();
  }

  async requests() {
    const data = await this.firestore.readRequests();
    data.forEach((doc) => {
      this.interfaceRequests.push(doc.data());
    });

    this.fechado = this.interfaceRequests.filter((res: any) => {
      return res.status == 'Concluido' ||  res.status == 'Cancelado';
    });

    this.andamento = this.interfaceRequests.filter((res: any) => {
      return res.status !== 'Concluido' &&  res.status !== 'Cancelado';
    });

    console.log(this.fechado);
  }
}
