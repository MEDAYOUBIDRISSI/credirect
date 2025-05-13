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

    
    /**
     * Retrieves test data from the specified API endpoint.
     *
     * @param params - Optional query parameters to include in the request.
     * @returns A promise that resolves to the response data of type `any`.
     */
    getTest(params?: any) {
        return this.http.get<any>('https://localhost:7025/api/Credirect/getAllClientTest', { params: params }).toPromise();
    }

    //Méthode pour get Tier par CIN
    getTiereByCIN(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/GetTierByCIN', data).toPromise();
    }
    
    /**
     * Adds or updates a folder by sending the provided data to the server.
     *
     * @param data - The data object containing folder information to be added or updated.
     * @returns A promise that resolves with the server's response.
     */
    addOrUpdateFolder(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/AddOrUpdateFolder', data).toPromise();
    }

    
    /**
     * Retrieves tiers associated with a specific folder ID by making a POST request to the API.
     *
     * @param data - The payload containing the folder ID and any additional required information.
     * @returns A promise that resolves to the response containing the tiers data.
     */
    getTiersByFolderID(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getTiersByFolderID', data).toPromise();
    }

    getTiresByIDFromFicheClient(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getTiresByIDFromFicheClient', data).toPromise();
    }

    /**
     * Retrieves all credit types from the server.
     *
     * @param data - Optional parameter containing the request payload.
     * @returns A promise that resolves to the response containing credit type data.
     */
    getAllCreditType(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAllCreditType', data).toPromise();
    }

    /**
     * Retrieves a list of all banks from the server.
     * 
     * @param data - Optional parameter containing the request payload to be sent to the server.
     * @returns A promise that resolves to the response containing the list of banks.
     */
    getAllBanks(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAllBanks', data).toPromise();
    }

    /**
     * Retrieves all object credit data by making a POST request to the specified API endpoint.
     * 
     * @param data - Optional parameter containing the request payload to be sent to the API.
     * @returns A promise that resolves to the response data of type `any`.
     */
    getAllObjectCredit(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAllObjectCredit', data).toPromise();
    }

    /**
     * Retrieves all nature property data from the server.
     *
     * @param data - Optional parameter containing the request payload to be sent to the server.
     * @returns A promise that resolves to the response containing the nature property data.
     */
    getAllNatureProperty(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAllNatureProperty', data).toPromise();
    }

    /**
     * Retrieves all assignment properties by making a POST request to the specified API endpoint.
     *
     * @param data - Optional parameter containing the data to be sent in the request body.
     * @returns A promise that resolves to the response containing the assignment properties.
     */
    getAllAssignmentProperty(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAllAssignmentProperty', data).toPromise();
    }

    /**
     * Sends a POST request to retrieve all properties in use.
     * 
     * @param data - Optional payload to include in the request body.
     * @returns A promise that resolves to the response containing the requested data.
     */
    getAllUseProperty(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAllUseProperty', data).toPromise();
    }

    /**
     * Sends a POST request to retrieve condition properties.
     *
     * @param data - Optional payload to be sent in the request body.
     * @returns A promise that resolves to the response containing condition properties.
     */
    getAlConditionProperty(data?: any) {
        return this.http.post<any>(this.urlAPI + 'Utility/getAlConditionProperty', data).toPromise();
    }

    /**
     * Retrieves tier information by ID from the server.
     *
     * @param data - The payload containing the necessary data to fetch the tier information.
     * @returns A promise that resolves to the server's response containing the tier details.
     */
    getTierByID(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getTierByID', data).toPromise();
    }

    /**
     * Retrieves the list of folders from the server.
     *
     * @param data - The payload to be sent in the POST request.
     * @returns A promise that resolves to the response containing the folder list.
     */
     getFoldersList(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getFoldersList', data).toPromise();
    }
    
    /**
     * Sends a POST request to save tier information for a professional.
     *
     * @param data - The data object containing tier information to be saved.
     * @returns A promise that resolves with the response from the server.
     */
    saveTierInfoProf(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/saveTierInfoProf', data).toPromise();
    }

    /**
     * Sends a POST request to retrieve bank information based on the provided data.
     *
     * @param data - The payload to be sent in the POST request.
     * @returns A promise that resolves to the response containing bank information.
     */
    getInfoBank(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getInfosBank', data).toPromise();
    }
    
    /**
     * Sends a POST request to save bank information.
     *
     * @param data - The data object containing bank information to be saved.
     * @returns A promise that resolves with the response from the API.
     */
    saveInfoBank(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/saveInfosBank', data).toPromise();
    }

    /**
     * Sends a POST request to retrieve engagement data.
     *
     * @param data - The payload to be sent in the request body.
     * @returns A promise that resolves to the response containing engagement data.
     */
    getEngagement(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getEngagement', data).toPromise();
    }

    /**
     * Sends a POST request to save engagement data.
     *
     * @param data - The engagement data to be saved.
     * @returns A promise that resolves with the response from the API.
     */
    saveEngagement(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/saveEngagement', data).toPromise();
    }

    getPlanFinancement(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getPlanFinancement', data).toPromise();
    }

    savePlanFinancement(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/savePlanFinancement', data).toPromise();
    }

    getGarantie(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getGarantie', data).toPromise();
    }

    saveGarantie(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/saveGarantie', data).toPromise();
    }

    getDepot(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getDepot', data).toPromise();
    }

    saveDepot(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/saveDepot', data).toPromise();
    }

    getCreditTimeline(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getCreditTimeline', data).toPromise();
    }

    saveCreditStatus(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/saveCreditStatus', data).toPromise();
    }

    getDossiersByDepots(data: any) {
        return this.http.post<any>(this.urlAPI + 'Credirect/getDossiersByDepots', data).toPromise();
    }
}
