import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
    eyebrow:{
        type: String,
        default: "Based in Veraval · Serving all Gujarat"
    },
    headline:{
        type: String,
        default: "Every road here leads to somewhere scared."
    },
    headlineEmphasis:{
        type: String,
        default: "somewhere sacred."
    },
    lead:{
        type: String,
        default: "Outstation cabs for All India - driven by locals who know every shortcut, every viewpoint, and every good tea stall along the way."
    },
    phone:{
        type: String,
        default: "87994 65499"
    },
    whatsapp:{
        type: String,
        default: "87994 65499"
    },
    address:{
        type: String,
        default: "Bhalka Road, Veraval, Gujarat."
    }
}, {timestamps: true});

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings