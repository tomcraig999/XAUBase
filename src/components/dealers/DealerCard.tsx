import Link from "next/link";
import { Globe, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";

interface DealerCardProps {
  name: string;
  slug: string;
  cityName?: string | null;
  stateProv?: string | null;
  countryName?: string | null;
  specializations: string[];
  onlineSales: boolean;
  ratingAvg: number;
  reviewCount: number;
}

export default function DealerCard({
  name,
  slug,
  cityName,
  stateProv,
  countryName,
  specializations,
  onlineSales,
  ratingAvg,
  reviewCount,
}: DealerCardProps) {
  const locationParts = [cityName, stateProv, countryName].filter(Boolean);

  return (
    <Link
      href={`/dealer/${slug}`}
      className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-gold-600/50 hover:bg-card-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-gold-400">
            {name}
          </h3>
          {locationParts.length > 0 && (
            <div className="mt-1 flex items-center gap-1 text-xs text-dark-400">
              <MapPin className="h-3 w-3" />
              {locationParts.join(", ")}
            </div>
          )}
        </div>
        {onlineSales && <Globe className="h-4 w-4 text-gold-500" />}
      </div>

      <div className="mt-3 flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
        <span className="text-sm font-medium text-gold-400">{ratingAvg}</span>
        <span className="text-xs text-dark-400">({reviewCount} reviews)</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {specializations.slice(0, 4).map((spec) => (
          <Badge key={spec} variant="gold">
            {SPECIALIZATION_LABELS[spec] || spec}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
