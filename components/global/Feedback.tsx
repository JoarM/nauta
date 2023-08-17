"use client";

import { Frown, Laugh, Meh, Smile } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { FormEvent, useState } from "react";
import { ZodFeedback } from "@/lib/schemas";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LoadingButton from "./LoadingButton";
import { useToast } from "../ui/use-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Feedback() {
    const [rating, setRating] = useState<"Awsome" | "Good" | "Meh" | "Horrible" | null>(null);
    const [feedback, setFeedback] = useState("");
    const [sending, setSending] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const [animate] = useAutoAnimate<HTMLSpanElement>();

    async function sendFeedback(e: FormEvent) {
        e.preventDefault();
        setSending(true);

        const parse = await ZodFeedback.safeParseAsync({
            feedback: feedback,
            rating: rating,
        });

        if (parse.success) {
            addDoc(collection(db, "feedback"), {
                feedback: feedback,
                rating: rating,
                createdAt: Timestamp.now(),
            })
            .then(() => {
                setOpen(false);
                setFeedback("");
                setRating(null);
                setError(null);
                toast({
                    title: "Thanks for your feedback",
                    duration: 3000,
                });
            })
            .catch(() => {
                toast({
                    title: "Failed to save feedback",
                    description: "Sorry we currently couldnt save your feedback please try again later",
                    duration: 5000,
                });
            })
            .finally(() => {
                setSending(false);
            });
        } else {
            if (parse.error.issues.length === 1) {
                {parse.error.issues.at(0)?.message === "Invalid input" ? setError("Please select a rating") : setError(parse.error.issues.at(0)?.message as string)}
            } else {
                setError(parse.error.issues.at(0)?.message as string + " and select a rating");
            }
            setSending(false);
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="bg-background/80">Feedback</Button>
            </PopoverTrigger>
            <PopoverContent className="bg-secondary w-80 overflow-hidden">
                <form className="p-4 grid gap-2" id="feedback" onSubmit={sendFeedback} ref={animate}>
                    <Textarea 
                    placeholder="Your feedback..." 
                    className="resize-none bg-secondary min-h-[98px]" 
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    disabled={sending}
                    minLength={1}
                    maxLength={128}
                    />
                    {error && <span className="text-rose-600 text-sm">{ error }</span>}
                </form>
                <div className="bg-background p-4 flex items-center justify-between">
                    <div className="grid grid-flow-col gap-1">
                        <button aria-selected={rating === "Awsome"} disabled={sending} onClick={() => setRating("Awsome")} className="aspect-square outline-none flex items-center justify-center rounded-full w-8 h-8 hover:bg-accent/30 hover:text-accent focus-visible:bg-accent/30 focus-visible:text-accent transition-colors aria-selected:bg-accent/30 aria-selected:text-accent">
                            <Laugh className="w-4 h-4"/>
                            <span className="sr-only">Awsome</span>
                        </button>
                        <button aria-selected={rating === "Good"} disabled={sending} onClick={() => setRating("Good")} className="aspect-square outline-none flex items-center justify-center rounded-full w-8 h-8 hover:bg-accent/30 hover:text-accent focus-visible:bg-accent/30 focus-visible:text-accent transition-colors aria-selected:bg-accent/30 aria-selected:text-accent">
                            <Smile className="w-4 h-4"/>
                            <span className="sr-only">Good</span>
                        </button>
                        <button aria-selected={rating === "Meh"} disabled={sending} onClick={() => setRating("Meh")} className="aspect-square outline-none flex items-center justify-center rounded-full w-8 h-8 hover:bg-accent/30 hover:text-accent focus-visible:bg-accent/30 focus-visible:text-accent transition-colors aria-selected:bg-accent/30 aria-selected:text-accent">
                            <Meh className="w-4 h-4"/>
                            <span className="sr-only">Meh</span>
                        </button>   
                        <button aria-selected={rating === "Horrible"} disabled={sending} onClick={() => setRating("Horrible")} className="aspect-square outline-none flex items-center justify-center rounded-full w-8 h-8 hover:bg-accent/30 hover:text-accent focus-visible:bg-accent/30 focus-visible:text-accent transition-colors aria-selected:bg-accent/30 aria-selected:text-accent">
                            <Frown className="w-4 h-4"/>
                            <span className="sr-only">Horrible</span>
                        </button>
                    </div>
                    {sending ? <LoadingButton size="sm">Sending</LoadingButton> : <Button size="sm" type="submit" form="feedback">Send</Button>}
                </div>
            </PopoverContent>
        </Popover>
    )
}