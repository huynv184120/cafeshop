const ImageModel = require("../models/image.model");
const imageService = {
    create: async ({contentType,data}) => {
        const img = await ImageModel.create({data, contentType});
        return img._id
    },
    getById: async (id) => {
        const img = await ImageModel.findById(id);
        return img;
    }
}

module.exports = imageService;