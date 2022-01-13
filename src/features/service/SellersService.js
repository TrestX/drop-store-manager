export class SellersService {

    getTopSellers() {
        return fetch('topSellers.json').then(res => res.json()).then(d => d.data);
    }

}