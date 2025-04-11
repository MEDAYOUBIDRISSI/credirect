import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    step = 0;

    

    constructor(private productService: ProductService, public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        this.Chart1()
        this.Chart2()
        this.Chart3()
        this.Chart4()
        this.Chart5()
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    prevMethod(){
        if(this.step > 0) {
            this.step--;
        }
    }

    nextMethod(){
        if(this.step < 2) {
            this.step++;
        }
    }

    ////////////////////////////////////////:New Charts
    data: any;
    options: any;
    Chart1() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data = {
            labels: ['Crédit immobilier', 'Crédit consommation', 'Crédit hypothécaire', 'Crédit-Bail Immobilier', 'Crédit-Bail Mobilier ', 'Crédit à la promotion immobilière', 'Crédit d’investissement'],
            datasets: [
                {
                    label: 'Production Brute',
                    backgroundColor: "#f3c98b",
                    borderColor: "#f3c98b",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Production Net',
                    backgroundColor: "#daa588",
                    borderColor: "#daa588",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        };
    }

    data_2: any;
    options_2: any;
    Chart2(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data_2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'bar',
                    label: 'En montage',
                    backgroundColor: "#ff70a6",
                    data: [50, 25, 12, 48, 90, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Ajournée',
                    backgroundColor: "#ff9770",
                    data: [21, 84, 24, 75, 37, 65, 34]
                },
                {
                    type: 'bar',
                    label: 'Refusé',
                    backgroundColor: "#ffd670",
                    data: [41, 52, 24, 74, 23, 21, 32]
                },
                {
                    type: 'bar',
                    label: 'Débloqué',
                    backgroundColor: "#e9ff70",
                    data: [1, 0, 4, 20, 9, 10, 9]
                }
            ]
        };

        this.options_2 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    data_3: any;
    options_3: any;
    Chart3(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data_3 = {
            datasets: [
                {
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ],
                    label: 'My dataset'
                }
            ],
            labels: ['Banque Populaire', 'BMCE Bank', 'Société Générale Maroc', 'Crédit du Maroc', 'CIH Bank']
        };
        
        this.options_3 = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    data_4: any;
    options_4: any;
    Chart4(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data_4 = {
            labels: ['Organisme 1', 'Organisme 2', 'Organisme 3', 'Organisme 4', 'Organisme 5'],
            datasets: [
            {
                data: [1, 20, 9, 15, 55],
                backgroundColor: [
                documentStyle.getPropertyValue('--blue-500'), 
                documentStyle.getPropertyValue('--yellow-500'), 
                documentStyle.getPropertyValue('--green-500'), 
                documentStyle.getPropertyValue('--orange-500'), 
                documentStyle.getPropertyValue('--red-500')
                ],
                hoverBackgroundColor: [
                documentStyle.getPropertyValue('--blue-400'), 
                documentStyle.getPropertyValue('--yellow-400'), 
                documentStyle.getPropertyValue('--green-400'), 
                documentStyle.getPropertyValue('--orange-400'), 
                documentStyle.getPropertyValue('--red-400')
                ]
            }
            ]
        };


        this.options_4 = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }

    data_5: any;
    options_5: any;
    Chart5(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
        this.data_5 = {
            labels: ['En montage', 'Ajournée', 'Refusé', 'Débloqué'],
            datasets: [
                {
                    label: 'Dossiers',
                    borderColor: "#f28f3b",
                    pointBackgroundColor: "#f28f3b",
                    pointBorderColor: "#f28f3b",
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: "#f28f3b",
                    data: [65, 59, 10, 6]
                }
            ]
        };
        
        this.options_5 = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary
                    },
                    pointLabels: {
                        color: textColorSecondary
                    }
                }
            }
        };
    }
}
