const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

// IMAGES
const ImageSchema = new Schema(
    {
        url: String,
        filename: String,
    },
    opts
);

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});

// CAMPGROUND
const CampgroundSchema = new Schema(
    {
        title: String,
        images: [ImageSchema],
        geometry: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        price: Number,
        description: String,
        location: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return `<img src="${this.images[0].thumbnail}" alt="" /><a href="campgrounds/${this._id}">${this.title}</a>`;
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews,
            },
        });
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
