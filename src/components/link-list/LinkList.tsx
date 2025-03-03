import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Edit2,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Trash2,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const iconMap = {
  Globe,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
};

export function LinksList({
  links,
  onRemoveLink,
  onUpdateLink,
}: {
  links: any[];
  onRemoveLink: any;
  onUpdateLink: any;
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", url: "" });

  const startEditing = (link: any) => {
    setEditingId(link.id);
    setEditForm({ title: link.title, url: link.url });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (id: any) => {
    const currentLink = links.find((link) => link.id === id);
    onUpdateLink({ ...currentLink, ...editForm });
    setEditingId(null);
  };

  const moveLink = (id: any, direction: any) => {
    const index = links.findIndex((link) => link.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === links.length - 1)
    ) {
      return;
    }

    const newLinks = [...links];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newLinks[index], newLinks[newIndex]] = [
      newLinks[newIndex],
      newLinks[index],
    ];

    // Update all links to maintain the order
    newLinks.forEach((link) => onUpdateLink(link));
  };

  const getIcon = (iconName: any) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Globe;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Links</CardTitle>
        <CardDescription>
          Manage the links displayed on your page. Drag to reorder.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {links.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            You haven't added any links yet. Add your first link above.
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                {editingId === link.id ? (
                  <div className="flex-1 space-y-3">
                    <Input
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      placeholder="Link title"
                    />
                    <Input
                      value={editForm.url}
                      onChange={(e) =>
                        setEditForm({ ...editForm, url: e.target.value })
                      }
                      placeholder="https://example.com"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => saveEditing(link.id)}>
                        <Check className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEditing}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                          {getIcon(link.icon)}
                        </div>
                        <span className="font-medium">{link.title}</span>
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px] md:ml-auto">
                        {link.url}
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-auto md:ml-0">
                      {link.clicks} clicks
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveLink(link.id, "up")}
                      >
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Move up</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveLink(link.id, "down")}
                      >
                        <ArrowDown className="h-4 w-4" />
                        <span className="sr-only">Move down</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(link)}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
