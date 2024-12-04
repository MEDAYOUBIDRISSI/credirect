import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer-file',
  templateUrl: './add-customer-file.component.html',
  styleUrl: './add-customer-file.component.scss'
})
export class AddCustomerFileComponent implements OnInit{

  items: any[]=[];
  activeIndex= 0;
  constructor(
  ) 
  {
    
  }


  ngOnInit() {
    this.items = [
      {
          label: 'Personal',
      },
      {
          label: 'Seat',
      },
      {
          label: 'Payment',
      },
      {
          label: 'Confirmation',
      }
    ];
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  
 
}
