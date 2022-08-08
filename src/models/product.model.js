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

mapToProduct = (args) => {
    const product = new Product({});
    product.id = args['product_id'];
    product.name = args['product_name'];
    product.price = args['price'];
    product.description = args['description_content'];
    product.discount = args['discount'];
    product.status = args['product_status'];
    return product;
}

class ProductModel {
    constructor(){
        this.tableName = 'Product';
    };

    create = async (productInfo) => {
        const product = new Product(productInfo);
        const sql = `INSERT INTO ${this.tableName}(product_name, discount, description_content , product_status, price)
               VALUES
              ( '${product.name}', '${product.discount}', '${product.description}', '${product.status}' , ${product.price});`
            
        const result = await mysqlQuery(sql);
        console.log(result);
        return {success: result.success};
    };

    deleteById = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE product_id = ${id} ;`;
        const result = await mysqlQuery(sql);
        return {success: result.success};
    };

    findById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE product_id = ${id} ;`;
        const result =  await mysqlQuery(sql);
        let data;
        if(result.success && result.data.rows[0]){
            data = mapToProduct(result.data.rows[0]);
        }
        return {success:result.success, data};
    };

    find = async (filter , limit, offset) => {
        let condition = '1';
        if(filter.status){
            condition = condition + ' AND (product_status =' + filter.status + ')';
        }
        const sql = `SELECT * FROM ${this.tableName} WHERE ${condition} LIMIT ${limit} OFFSET ${offset} ;`;
        const result = await mysqlQuery(sql);
        let data;
        if(result.success){
            data = result.data.rows.map(product => mapToProduct(product));
        }
        return {success:result.success, data};
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
            updateInfo.push(`product_status = ${info.status}`);
        }
        if(info.discount){
            updateInfo.push(`discount = ${info.discount}`);
        }
        updateInfo = updateInfo.join(',');
        const sql = ` UPDATE ${this.tableName} SET ${updateInfo} WHERE product_id = ${id} ;`;
        const result = await mysqlQuery(sql);
        return {success: result.success};
    };
    count = async (filter) => {
        let condition = '1';
        if(filter.status){
            condition = condition + ' AND (product_status =' + filter.status + ')';
        }
        const sql = `SELECT COUNT(product_id) as amount FROM ${this.tableName} WHERE ${condition} ;`;
        const result = await mysqlQuery(sql);
        return result;
    };
}

const productModel = new ProductModel();

module.exports = productModel;
