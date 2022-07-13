const mysqlQuery = require('../utils/mysql');

class Product {
    constructor({id, name, price, discount, description, status}){
        this.id = id;
        this.name = name;
        this.price =price;
        this.discount = discount;
        this.description = description;
        this.status = status;
    };
}

class ProductModel {
    constructor(){
        this.tableName = 'Product';
    };

    create = async (productInfo) => {
        const product = new Product(productInfo);
        sql = `INSERT INTO ${this.tableName}(product_id, product_name, discount, description , status)
               VALUES
              (${product.id}, ${product.name}, ${product.discount}, ${product.description}, ${product.status});`
        };
    deleteById = (id) => {

    };
    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE product_id = ${id}`;
        const result =  await mysqlQuery(sql);
        return result.data.rows[0];
    }

}

const productModel = new ProductModel();

module.exports = productModel;
