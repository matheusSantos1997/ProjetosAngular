import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  qtdCartoes: number;
  ganhoTotal: number;
  despesaTotal: number;
  saldo: number;
  anoAtual: number = new Date().getFullYear(); // pegando o ano atual
  anoInicial: number = this.anoAtual - 10;
  anos: number[];

  usuarioId: string = localStorage.getItem('UsuarioId');

  // dados do gráfico
  dados: ChartDataSets[];
  labels: Label[];
  opcoes = {
     responsive: true,
     legend: {
       labels: {
          usePointStyle: true
       }
     }
  };

  plugins = [];
  tipo = 'line';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
     this.dashboardService.pegarDadosCardsDashboard(this.usuarioId).subscribe((resultado) => {
        this.qtdCartoes = resultado.qtdCartoes;
        this.ganhoTotal = resultado.ganhoTotal.toFixed(2).replace('.', ',');
        this.despesaTotal = resultado.despesaTotal.toFixed(2).replace('.', ',');
        this.saldo = resultado.saldo.toFixed(2).replace('.', ',');
     });

     this.anos = this.carregarAnos(this.anoInicial, this.anoAtual);

     // pegar dados anuais do gráfico
     this.dashboardService.pegarDadosAnuaisPeloUsuarioId(this.usuarioId, this.anoAtual).subscribe((resultado) => {
         this.labels = this.retornarMeses(resultado.meses);

         this.dados = [
            {
               data: this.retornarValoresGanhos(resultado.meses, resultado.ganhos),
               label: 'Ganho de R$',
               fill: false,
               borderColor: '#27ae60',
               backgroundColor: '#27ae60',
               pointBackgroundColor: '#27ae60',
               pointBorderColor: '#27ae60',
               pointHoverBackgroundColor: '#27ae60',
               pointHoverBorderColor: '#27ae60'
            },

            {
              data: this.retornarValoresDespesas(resultado.meses, resultado.despesas),
              label: 'Despesa de R$',
              fill: false,
              borderColor: '#c0392b',
              backgroundColor: '#c0392b',
              pointBackgroundColor: '#c0392b',
              pointBorderColor: '#c0392b',
              pointHoverBackgroundColor: '#c0392b',
              pointHoverBorderColor: '#c0392b'
           },

         ];
     });
  }

  carregarAnos(anoInicial: number, anoAtual: number): number[]{
     const anos = [];

     for(anoInicial; anoInicial <= anoAtual; anoInicial++){
       anos.push(anoInicial);
     }

    //  while(anoInicial <= anoAtual){
    //   anos.push(anoInicial);
    //   anoInicial = anoInicial + 1;
    // }

     return anos;
  }

  retornarMeses(dadosMeses: any): string[] {
      const meses = [];
      let index = 0;
      const qtdMeses = dadosMeses.length;

      // for(let i = 0; i < qtdMeses.length; i++){
      //   meses.push(dadosMeses[i].nome)
      // }
      while(index < qtdMeses){
         meses.push(dadosMeses[index].nome);
         index = index + 1;
      }

      return meses;
  }

  retornarValoresGanhos(dadosMeses: any, dadosGanhos: any): number[] {
      const valores = [];
      let indexMeses = 0;
      let indexGanhos = 0;
      const qtdMeses = dadosMeses.length;
      const qtdGanhos = dadosGanhos.length;

      while(indexMeses <= qtdMeses -1){
           if(indexGanhos <= qtdGanhos -1){
              if(dadosGanhos[indexGanhos].mesId === dadosMeses[indexMeses].mesId){
                 valores.push(dadosGanhos[indexGanhos].valores);
                 indexGanhos = indexGanhos + 1;
                 indexMeses = indexMeses + 1;
              } else {
                 valores.push(0);
                 indexMeses = indexMeses + 1;
              }
           } else {
               valores.push(0);
               indexMeses = indexMeses + 1;
           }
      }

      return valores;

  }

  retornarValoresDespesas(dadosMeses: any, dadosDespesas: any): number[] {

    const valores = [];
    let indexMeses = 0;
    let indexDespesas = 0;
    const qtdMeses = dadosMeses.length;
    const qtdDespesa = dadosDespesas.length;

    while(indexMeses <= qtdMeses -1){
         if(indexDespesas <= qtdDespesa -1){
            if(dadosDespesas[indexDespesas].mesId === dadosMeses[indexMeses].mesId){
               valores.push(dadosDespesas[indexDespesas].valores);
               indexDespesas = indexDespesas + 1;
               indexMeses = indexMeses + 1;
            }
            else {
               valores.push(0);
               indexMeses = indexMeses + 1;
            }
         } else {
          valores.push(0);
          indexMeses = indexMeses + 1;
         }
    }

    return valores;

  }

  carregarDados(anoSelecionado: number): void {
   // pegar dados anuais do gráfico
   this.dashboardService.pegarDadosAnuaisPeloUsuarioId(this.usuarioId, anoSelecionado)
       .subscribe((resultado) => {
       this.labels = this.retornarMeses(resultado.meses);

       this.dados = [
          {
             data: this.retornarValoresGanhos(resultado.meses, resultado.ganhos),
             label: 'Ganho de R$',
             fill: false,
             borderColor: '#27ae60',
             backgroundColor: '#27ae60',
             pointBackgroundColor: '#27ae60',
             pointBorderColor: '#27ae60',
             pointHoverBackgroundColor: '#27ae60',
             pointHoverBorderColor: '#27ae60'
          },

          {
            data: this.retornarValoresDespesas(resultado.meses, resultado.despesas),
            label: 'Despesa de R$',
            fill: false,
            borderColor: '#c0392b',
            backgroundColor: '#c0392b',
            pointBackgroundColor: '#c0392b',
            pointBorderColor: '#c0392b',
            pointHoverBackgroundColor: '#c0392b',
            pointHoverBorderColor: '#c0392b'
         },

       ];
   });
  }

}
