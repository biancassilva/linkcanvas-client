import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

const iconMap = {
  Globe,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
};

export function PagePreview({ links }: { links: any[] }) {
  const getIcon = (iconName: any) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Globe;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Page Preview</CardTitle>
        <CardDescription>
          This is how your page will look to visitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 max-w-[320px] mx-auto bg-background">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="User"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">Your Name</h3>
            <p className="text-sm text-muted-foreground mt-1">@yourname</p>
            <p className="text-sm mt-2 max-w-[250px]">
              Your bio goes here. Tell people about yourself and what you do.
            </p>
          </div>

          <div className="space-y-3">
            {links.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground text-sm">
                Add links to see them here
              </div>
            ) : (
              links.map((link) => (
                <Button
                  key={link.id}
                  variant="outline"
                  className="w-full justify-start gap-2 h-auto py-3"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                      {getIcon(link.icon)}
                    </div>
                    <span>{link.title}</span>
                  </a>
                </Button>
              ))
            )}
          </div>

          <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
            Made with LinkShare
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
