import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
        },
        sitemap: "nauta.vercel.app/sitemap.xml",
        host: "nauta.vercel.app"
    }
}