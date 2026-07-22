import SiteSettings from "../models/SiteSettings.js";

async function getOrCreateSettings() {
    let settings = await SiteSettings.findOne();
    if(!settings){
        settings = await SiteSettings.create({});
    }
    return settings;
}

//GEt /api/settings (public)
export async function getSettings(req, res, next) {
    try {
        const settings = await getOrCreateSettings();
        res.json(settings);
    } catch (err) {
        next(err);
    }
}

// PUT /api/settings (admin)
export async function updateSettings(req, res, next) {
    try {
        const settings = await getOrCreateSettings();
        Object.assign(settings, req.body);
        await settings.save();
        res.json(settings);
    } catch (err) {
        next(err);
    }
}