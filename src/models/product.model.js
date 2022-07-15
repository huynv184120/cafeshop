const mysqlQuery = require('../utils/mysql');

class Product {
    constructor({id, name, price, discount, description, status}){
        this.id = id;
        this.name = name || '';
        this.price = price || 0;
        this.discount = discount || 0;
        this.description = description || '';
        this.status = status || 1;
    };
}

class ProductModel {
    constructor(){
        this.tableName = 'Product';
    };

    create = async (productInfo) => {
        const product = new Product(productInfo);
        const sql = `INSERT INTO ${this.tableName}(product_id, product_name, discount, description_content , product_status)
               VALUES
              ('${product.id}', '${product.name}', '${product.discount}', '${product.description}', '${product.status}');`
            
        const result = await mysqlQuery(sql);
        return result;
    };

    deleteById = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE product_id = ${id}`;
        const result = await mysqlQuery(sql);
        return result;
    };

    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE product_id = ${id}`;
        const result =  await mysqlQuery(sql);
        return result;
    };

    find = async (filter , limit, offset) => {
        let condition = '1';
        if(filter.status){
            condition = condition + ' AND (product_status =' + filter.status + ')';
        }
        const sql = `SELECT * FROM ${this.tableName} WHERE ${condition} LIMIT ${limit} OFFSET ${offset}`;
        const result = await mysqlQuery(sql);
        return result;
    };
    
    update = async (id, info) => {
        let updateInfo = [];
        if(info.name){
            updateInfo.push(`product_name = '${info.name}'`);
        }
        if(info.description){
            updateInfo.push(`description = '${info.description}'`);
        }
        if(info.price){
            updateInfo.push(`price = ${info.price}`);
        }
        if(info.status){
            updateInfo.push(`status = ${info.status}`);
        }
        if(info.discount){
            updateInfo.push(`discount = ${info.discount}`);
        }
        updateInfo = updateInfo.join(',');
        const sql = `UPDATE ${this.tableName} SET ${updateInfo}`;
        const result = await mysqlQuery(sql);
        return result;
    }
}

const productModel = new ProductModel();

module.exports = productModel;
