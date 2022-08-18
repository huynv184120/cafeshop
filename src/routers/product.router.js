const productService = require("../services/product.service");
const { successResponse, ResponseData } = require("../commons/response");
const asyncHandler = require("../utils/asyncHandler");
const upload = require("../utils/multer");
const imageService = require("../services/image.service");
const productRouter = require("express").Router();
const fs = require('fs');

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const status = req.query.status;
    const page = req.query.page || 1;
    const isPaging = req.query.isPaging || true;
    const pageSize = req.query.pageSize || 10;
    const result = await productService.getListProduct({
      page,
      pageSize,
      isPaging,
      filter: { status },
    });
    return successResponse(res, new ResponseData({ result }));
  })
);

productRouter.get(
  "/image/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const img = await imageService.getById(id);
    res.contentType(img.contentType);
    res.send(img.data)
  })
)

productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const id = req.params.id;
    const result = await productService.getProductById(id);
    return successResponse(res, new ResponseData({ result }));
  })
);

productRouter.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const discount = req.body.discount;
    const status = req.body.status;
    const id = await imageService.create(req.file);
    const img = fs.readFileSync(req.file.path);
    const encode_image = img.toString('base64');
    await imageService.create({contentType: req.file.mimetype ,data:new Buffer(encode_image, 'base64')});
    // const result = await productService.createProduct({
    //   name,
    //   description,
    //   price,
    //   discount,
    //   status,
    // });
    // console.log(req.file)
    return successResponse(res, new ResponseData({ result:1 }));
  })
);

productRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const discount = req.body.discount;
    const status = req.body.status;
    const result = await productService.updateProduct(id, {
      name,
      description,
      price,
      discount,
      status,
    });
    console.group(req.file);
    return successResponse(res, new ResponseData({ result:1 }));
  })
);

productRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    const id = req.params.id;
    const result = await productService.deleteProduct(id);
    return successResponse(res, new ResponseData({ result }));
  })
);



module.exports = productRouter;
