import { Droplet, Plus, Search, Sticker, Trash2 } from "lucide-react";

export default function Elegance() {
    return (
        <div className="mx-auto w-[1248px] max-w-full px-6 mt-48 pb-24">
            <h3 className="text-6xl xl:text-7xl tracking-tighter font-bold text-center">A refined experince</h3>
            <p className="max-w-2xl px-3 mb-16 mx-auto text-center text-foreground/70 text-xl">
                See for you self how Nauta can make planning feel more elegant, 
                make it something u enjoy and not something u hate.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="max-w-lg border rounded-lg aspect-video w-full mx-auto lg:mx-0" aria-label="Planning demo">
                    <div className="h-8 py-1 px-4 border-b relative flex justify-center items-center">
                        <div className="grid grid-cols-3 place-items-center gap-2 h-full w-fit absolute left-4">
                            <span className=" w-3 h-3 rounded-full bg-rose-600"></span>
                            <span className=" w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className=" w-3 h-3 rounded-full bg-green-600"></span>
                        </div>
                        <div className="rounded-md flex-grow sm:flex-grow-0 w-2/5 ml-16 sm:ml-0 h-full bg-background text-center text-sm flex-shrink-0 min-w-fit px-3">
                            nauta.vercel.app
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <div className="flex gap-1">
                            <span className="text-sm py-1 px-2 border rounded flex items-center w-full">
                                <Search className="w-3 h-3 mr-2"/>
                                Filter projects...
                            </span>
                            <span className="text-sm py-1 px-2 rounded flex items-center bg-primary-foreground text-primary flex-shrink-0">
                                <Plus className="w-3 h-3 sm:mr-2"/>
                                <span className="hidden sm:inline">Add</span>
                            </span>
                        </div>
                        <div className="grid grid-cols-2 mt-3">
                            <div className="border rounded px-3 py-5">
                                <div className="font-medium">Title</div>
                                <div className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet.</div>
                                <div className="mt-3 bg-destructive text-destructive-foreground rounded w-fit p-2 ml-auto"><Trash2 className="w-3 h-3"/></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mt-12 lg:mt-0">
                        <div className="w-10 h-10 rounded-lg bg-foreground/10 text-foreground/70 grid place-items-center">
                            <Droplet className="w-6 h-6" />
                        </div>
                        <h4 className=" text-2xl font-semibold tracking-tighter">Flow like water</h4>
                        <p className="text-primary-foreground/50">
                            Make your development process flow like a spring-stream, we try to make the higest quality 
                            tools to help you move faster.
                        </p>
                    </div>
                    <div className="mt-16">
                        <div className="w-10 h-10 rounded-lg bg-foreground/10 text-foreground/70 grid place-items-center">
                            <Sticker className="w-6 h-6" />
                        </div>
                        <h4 className=" text-2xl font-semibold tracking-tighter">We value your opinion</h4>
                        <p className="text-primary-foreground/50">
                            Your feedback is the fastest way to improve the website, we try our best our-self
                            but your feedback is the only real way for us too know how to improve the website.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
