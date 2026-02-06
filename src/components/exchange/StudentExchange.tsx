import { useState } from "react";
import { Search, Package, ShoppingCart, Car, Plus, MapPin, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ExchangeItem {
  id: string;
  title: string;
  description: string;
  category: "lost" | "found" | "sell" | "buy" | "travel";
  price?: number;
  location?: string;
  date: string;
  user: string;
  contact?: string;
}

const mockItems: ExchangeItem[] = [
  {
    id: "1",
    title: "Lost Student ID Card",
    description: "Lost my ID card near Block B cafeteria. Name: Rahul Kumar, UID: 25BCS10089",
    category: "lost",
    location: "Block B Cafeteria",
    date: "2025-02-05",
    user: "Rahul K.",
    contact: "rahul@university.edu",
  },
  {
    id: "2",
    title: "Found Wireless Earbuds",
    description: "Found a pair of white wireless earbuds in Library 2nd floor reading room",
    category: "found",
    location: "Library 2nd Floor",
    date: "2025-02-05",
    user: "Priya S.",
  },
  {
    id: "3",
    title: "Selling Engineering Graphics Drafter",
    description: "Complete set with T-square, set squares, and compass. Used for 1 semester only.",
    category: "sell",
    price: 450,
    date: "2025-02-04",
    user: "Amit T.",
    contact: "amit@university.edu",
  },
  {
    id: "4",
    title: "Looking for DBMS Textbook",
    description: "Need 'Database System Concepts' by Silberschatz. Willing to buy or borrow.",
    category: "buy",
    date: "2025-02-04",
    user: "Sneha M.",
  },
  {
    id: "5",
    title: "Cab Share to Delhi Airport",
    description: "Looking for cab share to IGI Airport on Feb 10. Flight at 6 PM.",
    category: "travel",
    location: "Delhi Airport (T3)",
    date: "2025-02-10",
    user: "Vikram R.",
    contact: "vikram@university.edu",
  },
  {
    id: "6",
    title: "Weekend Trip to Kasol",
    description: "Planning a group trip to Kasol on Feb 15-16. Need 3 more people for cab sharing.",
    category: "travel",
    location: "Kasol, HP",
    date: "2025-02-15",
    user: "Group Trip",
  },
];

const categoryIcons = {
  lost: Package,
  found: Package,
  sell: ShoppingCart,
  buy: ShoppingCart,
  travel: Car,
};

const categoryColors = {
  lost: "badge-urgent",
  found: "badge-success",
  sell: "badge-academic",
  buy: "badge-warning",
  travel: "badge-event",
};

export function StudentExchange() {
  const [items, setItems] = useState<ExchangeItem[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "" as ExchangeItem["category"],
    price: "",
    location: "",
  });
  const { toast } = useToast();

  const filteredItems = (category: string) => {
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handleSubmit = () => {
    if (!newItem.title || !newItem.description || !newItem.category) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const item: ExchangeItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      category: newItem.category,
      price: newItem.price ? parseInt(newItem.price) : undefined,
      location: newItem.location || undefined,
      date: new Date().toISOString().split("T")[0],
      user: "You",
    };

    setItems([item, ...items]);
    setNewItem({ title: "", description: "", category: "" as ExchangeItem["category"], price: "", location: "" });
    setIsDialogOpen(false);

    toast({
      title: "Post created successfully!",
      description: "Your listing is now visible to others",
    });
  };

  const renderItem = (item: ExchangeItem) => {
    const Icon = categoryIcons[item.category];
    
    return (
      <Card key={item.id} className="card-elevated interactive-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              item.category === "lost" ? "bg-destructive/10" :
              item.category === "found" ? "bg-success/10" :
              item.category === "travel" ? "bg-accent/10" : "bg-primary/10"
            }`}>
              <Icon className={`h-5 w-5 ${
                item.category === "lost" ? "text-destructive" :
                item.category === "found" ? "text-success" :
                item.category === "travel" ? "text-accent" : "text-primary"
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
                <Badge className={categoryColors[item.category]}>
                  {item.category}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {item.user}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(item.date).toLocaleDateString()}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                )}
                {item.price && (
                  <Badge variant="secondary">₹{item.price}</Badge>
                )}
              </div>

              {item.contact && (
                <Button variant="outline" size="sm" className="mt-3">
                  Contact
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Student Exchange</h1>
            <p className="text-muted-foreground">Lost & Found, Buy/Sell, Travel Sharing</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription>
                Share what you're looking for or what you've found
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value: ExchangeItem["category"]) =>
                    setNewItem({ ...newItem, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Lost Item</SelectItem>
                    <SelectItem value="found">Found Item</SelectItem>
                    <SelectItem value="sell">Selling</SelectItem>
                    <SelectItem value="buy">Looking to Buy</SelectItem>
                    <SelectItem value="travel">Travel Share</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  placeholder="Brief title for your post"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Add details..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              {(newItem.category === "sell" || newItem.category === "buy") && (
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Where is this relevant?"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full btn-gradient">
                Create Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
          <TabsTrigger value="found">Found</TabsTrigger>
          <TabsTrigger value="sell">Selling</TabsTrigger>
          <TabsTrigger value="buy">Buying</TabsTrigger>
          <TabsTrigger value="travel">Travel</TabsTrigger>
        </TabsList>

        {["all", "lost", "found", "sell", "buy", "travel"].map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid gap-4">
              {filteredItems(category).length > 0 ? (
                filteredItems(category).map(renderItem)
              ) : (
                <Card className="card-elevated">
                  <CardContent className="p-8 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No posts found</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Create the first post
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
