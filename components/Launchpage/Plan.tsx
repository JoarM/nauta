import { Users, Wind } from "lucide-react";
import Image from "next/image";


export default function Plan() {
    return (
        <div className="mx-auto w-[1248px] max-w-full px-6 mt-48">
            <h3 className="text-6xl xl:text-7xl tracking-tighter font-bold text-center">Plan with ease</h3>
            <p className="max-w-2xl px-3 mb-16 mx-auto text-center text-foreground/70 text-xl">
                Free devlopers from time-consuming, unnecessary long 
                planning meets that slow your work, so you can relase faster.
            </p>
            <div className="grid place-items-center">
                <Image
                src="/planning.png"
                alt=""
                loading="lazy"
                width={960}
                height={484}
                className="max-w-full"
                />
            </div>
            <div className="grid md:grid-cols-2 gap-16 mt-16">
                <div>
                    <div className="w-10 h-10 rounded-lg bg-foreground/10 text-foreground/70 grid place-items-center">
                        <Users className="w-6 h-6" />
                    </div>
                    <h4 className=" text-2xl font-semibold tracking-tighter">Integrate your team easily</h4>
                    <p className="text-primary-foreground/50">
                        We make it easy to integrate your team with email invites or public links, 
                        get started and integrate your entire team within 10 minutes.
                    </p>
                </div>
                <div>
                    <div className="w-10 h-10 rounded-lg bg-foreground/10 text-foreground/70 grid place-items-center">
                        <Wind className="w-6 h-6" />
                    </div>
                    <h4 className=" text-2xl font-semibold tracking-tighter">Make planning a breeze</h4>
                    <p className="text-primary-foreground/50">
                        We strive to provide you with a planning solution that puts wind in your sails, 
                        we integrate modern solutions to improve your planning experince.
                    </p>
                </div>
            </div>
        </div>
    )
}