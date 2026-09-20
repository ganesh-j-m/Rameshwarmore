"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BannerCarousel({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);

    const goTo = useCallback(
        (i: number) => setIndex(((i % images.length) + images.length) % images.length),
        [images.length]
    );
    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (images.length < 2) return;
        const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative mx-auto aspect-[21/9] w-full max-w-content overflow-hidden rounded-md border border-line bg-paperDim">
            {images.map((src, i) => (
                <Image
                    key={src + i}
                    src={src}
                    alt={`Highlight ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-cover transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === index ? 1 : 0 }}
                />
            ))}

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-ink/40 p-2 text-white hover:bg-ink/60"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-ink/40 p-2 text-white hover:bg-ink/60"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to ${i + 1}`}
                                onClick={() => goTo(i)}
                                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-gold" : "w-1.5 bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}