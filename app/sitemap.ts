import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://zcrum.vercel.app/home",
            lastModified: new Date(),
        },
    ]
}