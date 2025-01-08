import { Component } from '@angular/core';

@Component({
  selector: 'app-simulator-credirect',
  templateUrl: './simulator-credirect.component.html',
  styleUrl: './simulator-credirect.component.scss'
})
export class SimulatorCredirectComponent {

  loanAmount = 1500000;
  interestRate = 4.6; // Annual interest rate in %
  loanTerm = 25; // Loan term in years
  paymentsPerYear = 12;

  amortizationSchedule: any[] = [];
  summary: any = null;
  notaryFees = [
    { description: 'Enregistrement', amount: 50640.0 },
    { description: 'Conservation', amount: 19190.0 },
    { description: 'Hypothèque', amount: 20100.0 },
    { description: 'Expédition', amount: 1500.0 },
    { description: 'Débours', amount: 500.0 },
    { description: 'Honoraires approx', amount: 7596.0 },
    { description: 'TVA/Hono', amount: 1519.2 }
  ];
  totalNotaryFees = 0;

  calculateAmortization() {
    const monthlyRate = this.interestRate / 100 / this.paymentsPerYear;
    const totalPayments = this.loanTerm * this.paymentsPerYear;
    const monthlyPayment =
      (this.loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalPayments));

    // Reset the amortization schedule
    this.amortizationSchedule = [];
    let remainingBalance = this.loanAmount;
    const startDate = new Date();

    let totalInterest = 0;

    for (let i = 0; i < totalPayments; i++) {
      const interestPaid = remainingBalance * monthlyRate;
      const principalPaid = monthlyPayment - interestPaid;
      remainingBalance -= principalPaid;

      totalInterest += interestPaid;

      this.amortizationSchedule.push({
        date: new Date(startDate.setMonth(startDate.getMonth() + 1)).toLocaleDateString(),
        monthlyPayment,
        principalPaid,
        interestPaid,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0
      });
    }

    this.summary = {
      monthlyPayment,
      totalInterest,
      totalPayments
    };

    // Calculate total notary fees
    this.totalNotaryFees = this.notaryFees.reduce((sum, fee) => sum + fee.amount, 0);
  }

}
