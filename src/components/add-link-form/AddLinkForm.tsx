import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

interface AddLinkFormProps {
  onAddLink: (link: any) => void;
}

export function AddLinkForm({ onAddLink }: AddLinkFormProps) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    icon: "Globe",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!form.title.trim() || !form.url.trim()) {
      return;
    }

    // Add http:// if missing
    let url = form.url;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    onAddLink({ ...form, url });
    setForm({ title: "", url: "", icon: "Globe" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Add New Link</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Link Title</Label>
          <Input
            id="title"
            placeholder="My Website"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">Icon</Label>
        <Select
          value={form.icon}
          onValueChange={(value) => setForm({ ...form, icon: value })}
        >
          <SelectTrigger id="icon">
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Globe">Website</SelectItem>
            <SelectItem value="Twitter">Twitter</SelectItem>
            <SelectItem value="Github">GitHub</SelectItem>
            <SelectItem value="Linkedin">LinkedIn</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="Youtube">YouTube</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Link
      </Button>
    </form>
  );
}
