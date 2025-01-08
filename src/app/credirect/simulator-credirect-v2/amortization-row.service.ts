import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmortizationRowService {
  calculateMonthlyPayment(principal: number, annualRate: number, years: number, insuranceRate: number = 0): number {
    const monthlyRate = (annualRate + insuranceRate) / 12;
    const totalPayments = years * 12;
    return (
      principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    );
  }

  calculateTotalInterest(schedule: any[]): number {
    return schedule.reduce((sum, entry) => sum + entry.interestPayment, 0);
  }

  calculateDebtRatio(monthlyPayment: number, income: number, otherDebt: number): number {
    return (monthlyPayment + otherDebt) / income;
  }

  calculateAdditionalCosts(principal: number): any {
    const registration = 0.04 * principal;
    const conservation = 0.015 * principal + 200;
    const hypothec =
      principal < 5000000
        ? (principal - 250000) * 0.015 + 1250
        : (principal - 5000000) * 0.005 + 72500;
    const honoraria = 0.006 * principal;
    const tvaHonoraria = 0.2 * honoraria;

    return {
      registration,
      conservation,
      hypothec,
      honoraria,
      tvaHonoraria,
      total: registration + conservation + hypothec + honoraria + tvaHonoraria,
    };
  }

  generateAmortizationSchedule(
    principal: number,
    annualRate: number,
    years: number,
    insuranceRate: number = 0,
    startDate: Date
  ): any[] {
    const monthlyRate = annualRate / 12;
    const insuranceMonthlyRate = insuranceRate / 12;
    const totalPayments = years * 12;
    const monthlyPayment = this.calculateMonthlyPayment(
      principal,
      annualRate,
      years,
      insuranceRate
    );

    const schedule = [];
    let remainingBalance = principal;

    for (let month = 0; month < totalPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate * 1.1;
      const insurancePayment = remainingBalance * insuranceMonthlyRate * 1.1;
      const principalPayment = monthlyPayment - interestPayment - insurancePayment ;
      remainingBalance -= principalPayment;

      schedule.push({
        month: month + 1,
        date: new Date(startDate.getFullYear(), startDate.getMonth() + month, startDate.getDate()),
        remainingBalance: Math.max(remainingBalance, 0),
        monthlyPayment,
        principalPayment,
        interestPayment,
        insurancePayment,
      });

      if (remainingBalance <= 0) break;
    }

    return schedule;
  }
}
