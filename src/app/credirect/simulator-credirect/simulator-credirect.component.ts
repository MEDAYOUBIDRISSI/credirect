import { Component } from '@angular/core';

@Component({
  selector: 'app-simulator-credirect',
  templateUrl: './simulator-credirect.component.html',
  styleUrl: './simulator-credirect.component.scss'
})
export class SimulatorCredirectComponent {

  // Input fields
  loanAmount: number = 4260000; // Default loan amount
  interestRate: number = 3.9; // Annual interest rate (percentage)
  loanDuration: number = 15; // Loan duration in years
  monthlyInsuranceRate: number = 0.004564; // Monthly insurance rate
  earlyRepayment: number = 0; // Early repayment amount

  // Output fields
  monthlyPayment: number = 0;
  totalInterest: number = 0;
  totalCost: number = 0;

  // Amortization schedule
  amortizationSchedule: any[] = [];

  constructor() {
    this.calculateLoan();
  }

  calculateLoan(): void {
    const monthlyInterestRate = this.interestRate / 100 / 12;
    const numberOfPayments = this.loanDuration * 12;

    // Calculate monthly payment (using annuity formula)
    this.monthlyPayment =
      (this.loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    // Include insurance in the monthly payment
    const insuranceCost = this.loanAmount * this.monthlyInsuranceRate;
    this.monthlyPayment += insuranceCost;

    // Total interest calculation
    this.totalInterest = this.monthlyPayment * numberOfPayments - this.loanAmount;

    // Total cost of the loan
    this.totalCost = this.loanAmount + this.totalInterest;

    // Generate amortization schedule
    this.generateAmortizationSchedule(monthlyInterestRate, numberOfPayments);
  }

  generateAmortizationSchedule(monthlyInterestRate: number, numberOfPayments: number): void {
    this.amortizationSchedule = [];
    let remainingBalance = this.loanAmount;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = this.monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      this.amortizationSchedule.push({
        month: i,
        interestPayment: interestPayment,
        principalPayment: principalPayment,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0
      });

      if (remainingBalance <= 0) break;
    }
  }
}
