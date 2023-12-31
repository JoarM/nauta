import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard/", "/invite/", "/api/", "/account/"],
        },
        sitemap: "nauta.vercel.app/sitemap.xml",
        host: "nauta.vercel.app"
    }
}