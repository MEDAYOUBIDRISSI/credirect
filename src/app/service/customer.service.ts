import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    urlAPI = 'https://localhost:7025/api/';
    getData() {
        return [
            {
                id: 1000,
                name: 'Ahmed El Mansouri',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Benton, John B Jr',
                date: '2015-09-13',
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                    name: 'Ioni Bowcher',
                    image: 'ionibowcher.png'
                },
                balance: 70663
            },
            {
                id: 1001,
                name: 'Khadija Bensaid',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Chanay, Jeffrey A Esq',
                date: '2019-02-09',
                status: 'proposal',
                verified: true,
                activity: 0,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                },
                balance: 82429
            },
            {
                id: 1002,
                name: 'Omar Benjelloun',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Chemel, James L Cpa',
                date: '2017-05-13',
                status: 'qualified',
                verified: false,
                activity: 63,
                representative: {
                    name: 'Asiya Javayant',
                    image: 'asiyajavayant.png'
                },
                balance: 28334
            },
            {
                id: 1003,
                name: 'Hanae Chraibi',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Feltz Printing Service',
                date: '2020-09-15',
                status: 'new',
                verified: false,
                activity: 37,
                representative: {
                    name: 'Xuxue Feng',
                    image: 'xuxuefeng.png'
                },
                balance: 88521
            },
            {
                id: 1004,
                name: 'Noura El Kadiri',
                country: {
                    name: 'South Africa',
                    code: 'za'
                },
                company: 'Printing Dimensions',
                date: '2016-05-20',
                status: 'proposal',
                verified: true,
                activity: 33,
                representative: {
                    name: 'Asiya Javayant',
                    image: 'asiyajavayant.png'
                },
                balance: 93905
            },
            {
                id: 1005,
                name: 'Rachid Ouahidi',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Chapman, Ross E Esq',
                date: '2018-02-16',
                status: 'qualified',
                verified: false,
                activity: 68,
                representative: {
                    name: 'Ivan Magalhaes',
                    image: 'ivanmagalhaes.png'
                },
                balance: 50041
            },
            {
                id: 1006,
                name: 'Samira Bahri',
                country: {
                    name: 'Paraguay',
                    code: 'py'
                },
                company: 'Morlong Associates',
                date: '2018-02-19',
                status: 'renewal',
                verified: true,
                activity: 54,
                representative: {
                    name: 'Ivan Magalhaes',
                    image: 'ivanmagalhaes.png'
                },
                balance: 58706
            },
            {
                id: 1007,
                name: 'Mohamed Ait Lahcen',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Commercial Press',
                date: '2019-08-13',
                status: 'renewal',
                verified: true,
                activity: 69,
                representative: {
                    name: 'Onyama Limba',
                    image: 'onyamalimba.png'
                },
                balance: 26640
            },
            {
                id: 1008,
                name: 'Sofia Amrani',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Truhlar And Truhlar Attys',
                date: '2018-11-21',
                status: 'unqualified',
                verified: true,
                activity: 76,
                representative: {
                    name: 'Ivan Magalhaes',
                    image: 'ivanmagalhaes.png'
                },
                balance: 65369
            },
            {
                id: 1009,
                name: 'Ali Boukili',
                country: {
                    name: 'Mexico',
                    code: 'mx'
                },
                company: 'King, Christopher A Esq',
                date: '2015-07-07',
                status: 'proposal',
                verified: false,
                activity: 3,
                representative: {
                    name: 'Onyama Limba',
                    image: 'onyamalimba.png'
                },
                balance: 63451
            },
            {
                id: 1496,
                name: 'Yassine Filali',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Hermar Inc',
                date: '2020-04-22',
                status: 'unqualified',
                verified: true,
                activity: 65,
                representative: {
                    name: 'Stephen Shaw',
                    image: 'stephenshaw.png'
                },
                balance: 53660
            },
            {
                id: 1497,
                name: 'Sara Mounir',
                country: {
                    name: 'Argentina',
                    code: 'ar'
                },
                company: 'Simonton Howe & Schneider Pc',
                date: '2020-08-10',
                status: 'unqualified',
                verified: true,
                activity: 30,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                },
                balance: 44528
            },
            {
                id: 1498,
                name: 'Jamal Idrissi',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Warehouse Office & Paper Prod',
                date: '2019-11-07',
                status: 'negotiation',
                verified: false,
                activity: 20,
                representative: {
                    name: 'Onyama Limba',
                    image: 'onyamalimba.png'
                },
                balance: 69613
            },
            {
                id: 1499,
                name: 'Chaimae Azzam',
                country: {
                    name: 'Morocco',
                    code: 'ma'
                },
                company: 'Affiliated With Travelodge',
                date: '2019-04-23',
                status: 'renewal',
                verified: true,
                activity: 42,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                },
                balance: 88090
            }
        ];
    }
        

    constructor(private http: HttpClient) {}

    getCustomersMini() {
        return Promise.resolve(this.getData().slice(0, 5));
    }

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    }

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    }

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    }

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    }

    getCustomers(params?: any) {
        return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
    }

    // Méthode pour editer un projet offers
    getTest(params?: any) {
        return this.http.get<any>('https://localhost:7025/api/Credirect/getAllClientTest', { params: params }).toPromise();
    }

    //Méthode pour get Tier par CIN
    getTiereByCIN(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/GetTierByCIN', data).toPromise();
    }

    //Méthode pour get Tier par CIN
    addOrUpdateFolder(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/AddOrUpdateFolder', data).toPromise();
    }

    //Méthode pour get Tier par CIN
    getTiersByFolderID(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getTiersByFolderID', data).toPromise();
    }

    //Méthode pour get Credit Type
    getAllCreditType(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAllCreditType', data).toPromise();
    }

    //Méthode pour get Tier par CIN
    getTierByID(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getTierByID', data).toPromise();
    }
}
