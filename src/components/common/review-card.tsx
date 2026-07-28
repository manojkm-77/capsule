import { Star, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-[20px] border border-border p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] text-[14px] font-semibold">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="text-[14px] font-medium">{review.name}</p>
            <p className="text-[12px] text-muted">{review.date}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn("h-4 w-4", i < review.rating ? "text-primary fill-primary" : "text-border")}
              strokeWidth={1.8}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-muted">{review.text}</p>
      <button className="mt-3 flex items-center gap-1.5 text-[12px] text-muted hover:text-primary transition-colors">
        <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.8} />
        Helpful ({review.helpful})
      </button>
    </div>
  );
}
