
class Pagination {
    constructor({ total, totalPage, page, pageSize, isPaging }) {
        this.total = total;
        this.totalPage = totalPage;
        this.page = page;
        this.pageSize = pageSize;
        this.isPaging = isPaging;
    }
};

class ResponseData {
    constructor({ result, pagination }) {
        this.result = result || {};
        if(pagination)this.pagination = pagination || {};
    }
};

class Payload {
    constructor({ data, appStatus, message }) {
        this.data = data || {};
        this.appStatus = appStatus || -3;
        this.message = message || 'Error';
    }
};

const successResponse = (res, data, appStatus) => {
    console.log(data)
    res.json({ data: data || {}, appStatus: appStatus || 200 });
};

const failureResponse = (res, payload) => {
    res.json(payload);
};

const serverErrorResponse = (res, status, payload) => {
    res.status(status).json(payload);
};

module.exports = { Pagination, ResponseData, Payload, successResponse, failureResponse, serverErrorResponse };