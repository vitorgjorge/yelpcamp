const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("DB CONNECTION OPEN");
}
const Campground = require("../models/campground");

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6491f0367475fe52e9058473",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: "https://res.cloudinary.com/dkllabfoq/image/upload/v1687980239/YelpCamp/hnb7qkrmyszkp3pfsv3e.jpg",
                    filename: "YelpCamp/hnb7qkrmyszkp3pfsv3e",
                },
                {
                    url: "https://res.cloudinary.com/dkllabfoq/image/upload/v1687980560/YelpCamp/zpo4usfeynegi0sixhk7.jpg",
                    filename: "YelpCamp/zpo4usfeynegi0sixhk7",
                },
            ],
            description:
                "Description of the camp goes in here, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maxime sequi eius atque? Asperiores, nam laboriosam, atque ipsam perferendis minima odio itaque accusamus sint velit harum iusto optio. Quisquam, ab!",
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
        });
        await camp.save();
    }
};

seedDB();
