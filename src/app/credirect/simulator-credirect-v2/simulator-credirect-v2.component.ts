import { Component, OnInit } from '@angular/core';
import { AmortizationRowService } from './amortization-row.service';

@Component({
  selector: 'app-simulator-credirect-v2',
  templateUrl: './simulator-credirect-v2.component.html',
  styleUrl: './simulator-credirect-v2.component.scss'
})
export class SimulatorCredirectV2Component{
  principal: number = 1500000;
  annualRate: number = 0.046;
  years: number = 25;
  insuranceRate: number = 0.0035;
  income: number = 26000;
  otherDebt: number = 3835;
  startDate: Date = new Date('2024-08-01');

  monthlyPayment: number = 0;
  totalInterest: number = 0;
  debtRatio: number = 0;
  additionalCosts: any;
  schedule: any[] = [];

  constructor(private amortizationService: AmortizationRowService) {}

  calculate(): void {
    this.monthlyPayment = this.amortizationService.calculateMonthlyPayment(
      this.principal,
      this.annualRate,
      this.years,
      this.insuranceRate
    );

    this.schedule = this.amortizationService.generateAmortizationSchedule(
      this.principal,
      this.annualRate,
      this.years,
      this.insuranceRate,
      this.startDate
    );

    this.totalInterest = this.amortizationService.calculateTotalInterest(
      this.schedule
    );

    this.debtRatio = this.amortizationService.calculateDebtRatio(
      this.monthlyPayment,
      this.income,
      this.otherDebt
    );

    this.additionalCosts = this.amortizationService.calculateAdditionalCosts(
      this.principal
    );
  }
}