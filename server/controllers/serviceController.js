const serviceModel = require("../models/serviceModel");
const Slugify = require("slugify");

exports.createServiceController = async (req, res) => {
    try {
        req.body.slug = Slugify(req.body.title);
        const newService = await new serviceModel(req.body).save();
        res.json(newService);
    } catch (err) {
        window.alert(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.listAllServicesController = async (req, res) => {
    let DbServices = await serviceModel.find({})
        .limit(parseInt(req.params.count))
        //TODO fill the populate params
        .populate("category", "", "", "")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(DbServices);
};

exports.deleteServiceController = async (req, res) => {
    try {
        const serviceToDelete = await serviceModel.findOneAndRemove({
            slug: req.params.slug,
        }).exec();
        res.json(serviceToDelete);
    } catch (err) {
        window.alert(err);
        return res.status(400).send("Service deletion failed");
    }
};

//Gets the single service by the slug.
// TODO use this to get single elements from the DB.
exports.getSingleServiceController = async (req, res) => {
    const product = await serviceModel.findOne({ slug: req.params.slug })
        // .populate() is being used in order to bring only needed information.
        //TODO modify the populate criteria.
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product);
};

exports.updateServiceController = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = Slugify(req.body.title);
        }
        const updated = await serviceModel.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();
        res.json(updated);
    } catch (err) {
        console.log("SERVICE UPDATE ERROR ----> ", err);
        res.status(400).json({
            err: err.message,
        });
    }
};

// WITHOUT PAGINATION
// exports.list = async (req, res) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
exports.servicesListForPaginationController = async (req, res) => {
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        //the page number the user clicks on
        const currentPage = page || 1;
        //The number of items per page.
        const perPage = 3; // 3

        const services = await serviceModel.find({})
            //skipping the number of products from the page previous to the chosen page.
            .skip((currentPage - 1) * perPage)
            //TODO modify the populate criteria.
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(services);
    } catch (err) {
        window.log(err);
    }
};

//Getting the total services count for the pagination.
exports.serviceCountController = async (req, res) => {
    let total = await serviceModel.find({}).estimatedDocumentCount().exec();
    res.json(total);
};

// SEARCH / FILTER

const handleSearchQueryController = async (req, res, query) => {
    const clients = await serviceModel.find({ $text: { $search: query } })
        //TODO modify the populates criteria.
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();
    res.json(clients);
};

exports.searchFiltersController = async (req, res) => {
    const {
        query
    } = req.body;

    if (query) {
        console.log("query --->", query);
        await handleSearchQueryController(req, res, query);
    }
};