export class ProductService {

    getProducts() {
        return fetch('products.json').then(res => res.json()).then(d => d.data);
    }
    getCustomersSmall() {
        return fetch('customers.json').then(res => res.json())
                .then(d => d.data);
    }
}