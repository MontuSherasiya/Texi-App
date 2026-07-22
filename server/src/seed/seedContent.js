import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Destination from "../models/Destination.js";
import Testimonial from "../models/Testimonial.js";
import Stat from "../models/Stat.js";
import WhyUsItem from "../models/WhyUsItem.js";

const destinations = [
    {
        stopNo: "Stop 01",
        name: "Somnath",
        description: "The coastal temple town where the Arabian Sea meets centuries of pilgrimage.",
        spots: "Triveni Sangam · Surya Temple · Bhalka Tirth · Ban Ganga",
        order: 1
    },
    {
        stopNo: "Stop 02",
        name: "Dwarka",
        description: "A revered pilgrim city on the western tip, known for its ancient shore temples.",
        spots: "Dwarkadhish Temple · Nageshwar · Bet Dwarka · Rukmini Temple",
        order: 2
    },
    {
        stopNo: "Stop 03",
        name: "Gir",
        description: "Home to Asia's last wild lions, across dry deciduous forest and scrub.",
        spots: "Lion Safari Zones · Devalia Park · Gir Interpretation Zone",
        order: 3
    },
    {
        stopNo: "Stop 04",
        name: "Diu",
        description: "A quiet island with Portuguese-era forts and some of Gujarat's best beaches.",
        spots: "Diu Fort · Nagoa Beach · INS Khukri Memorial · St. Paul's Church",
        order: 4
    }
]

const testimonials = [
    {
        quote: "Three-day trip covering Somnath, Gir and Dwarka — around 700 km in total. The car was clean and the driver never once seemed tired or rushed.",
        who: "Sundaresh S., Chennai",
        order: 1
    },
    {
        quote: "Our driver knew exactly where to stop for the best tea and the best photo spots — that local knowledge made the whole trip.",
        who: "Ravi N., Bhopal",
        order: 2
    }
];

const stats = [
    {
        num: "40+",
        label: "Professional drivers",
        order: 1
    },
    {
        num: "12,000+",
        label: "Trips completed",
        order: 2
    },
    {
        num: "25+",
        label: "Vehicles in fleet",
        order: 3
    },
    {
        num: "4.8★",
        label: "Average Rating",
        order: 4
    }
];

const whyUs = [
    {
        idx: "01",
        title: "Local Drivers",
        body: "Every driver is from the region — they know the temple timings, the tide charts at Diu, and where to stop for real Kathiyawadi food.",
        order : 1
    },
    {
        idx: "02",
        title: "Fixed, upfront fares",
        body: "Your per-km rate is agreed before you leave. Toll, parking and driver allowance are the only extras, and we tell you that upfront too.",
        order : 2
    },
    {
        idx: "03",
        title: "On-time, always",
        body: "Early darshan at Somnath or a sunset at Nageshwar — we build in buffer time so you're never rushing to catch a moment.",
        order : 3
    },
    {
        idx: "04",
        title: "Sanitised, serviced cars",
        body: "Every vehicle is inspected before a long trip — brakes, AC, and tyres checked, not just wiped down and sent out.",
        order : 4
    }
];

async function run() {
    await connectDB();

    await Destination.deleteMany({});
    await Destination.insertMany(destinations);

    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonials);

    await Stat.deleteMany({});
    await Stat.insertMany(stats);

    await WhyUsItem.deleteMany({});
    await WhyUsItem.insertMany(whyUs);

    console.log("Seeded destinations, testimonials, stats, why-us cards.");
    await mongoose.disconnect();
    process.exit(0);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
})