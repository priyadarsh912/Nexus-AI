import { MapPin, Coffee, BookOpen, Wallet, Star, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Place {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
  tags: string[];
  description: string;
}

const places: Place[] = [
  {
    id: "1",
    name: "Café 21",
    type: "Café",
    distance: "500m",
    rating: 4.5,
    tags: ["Study-friendly", "WiFi", "Budget"],
    description: "Cozy café with great coffee and quiet study corners",
  },
  {
    id: "2",
    name: "Central Library Annexe",
    type: "Library",
    distance: "200m",
    rating: 4.8,
    tags: ["Study-friendly", "24/7", "AC"],
    description: "Extended library space open round the clock during exams",
  },
  {
    id: "3",
    name: "The Food Court",
    type: "Restaurant",
    distance: "300m",
    rating: 4.2,
    tags: ["Budget", "Variety", "Fast"],
    description: "Multiple cuisines at student-friendly prices",
  },
  {
    id: "4",
    name: "Sports Complex",
    type: "Recreation",
    distance: "800m",
    rating: 4.6,
    tags: ["Chill", "Fitness", "Evening"],
    description: "Gym, courts, and recreational facilities for students",
  },
  {
    id: "5",
    name: "Domino's Pizza",
    type: "Fast Food",
    distance: "1.2km",
    rating: 4.0,
    tags: ["Budget", "Late Night", "Delivery"],
    description: "Late night pizza cravings sorted with student discounts",
  },
  {
    id: "6",
    name: "Study Hub Co-working",
    type: "Study Space",
    distance: "1.5km",
    rating: 4.7,
    tags: ["Study-friendly", "WiFi", "Premium"],
    description: "Premium co-working space with meeting rooms",
  },
];

const tagColors: Record<string, string> = {
  "Study-friendly": "badge-academic",
  "Budget": "badge-success",
  "Chill": "badge-event",
  "WiFi": "bg-muted text-muted-foreground",
  "24/7": "badge-warning",
  default: "bg-muted text-muted-foreground",
};

export function ExplorerGuide() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <MapPin className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Explorer's Guide</h1>
          <p className="text-muted-foreground">Discover places around campus</p>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
          <BookOpen className="h-3 w-3 mr-1" />
          Study-friendly
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
          <Wallet className="h-3 w-3 mr-1" />
          Budget
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
          <Coffee className="h-3 w-3 mr-1" />
          Chill
        </Badge>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <Card key={place.id} className="card-elevated interactive-card">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{place.type}</p>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Navigation className="h-3 w-3" />
                  {place.distance}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{place.description}</p>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{place.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {place.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className={`text-xs ${tagColors[tag] || tagColors.default}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
