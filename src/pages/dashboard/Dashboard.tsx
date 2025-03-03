import { AddLinkForm } from "@/components/add-link-form/AddLinkForm";
import { LinksList } from "@/components/link-list/LinkList";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DashboardHeader } from "./components/header/Header";
import { PagePreview } from "./components/page-preview/PagePreview";
import { DashboardStats } from "./components/stats/Stats";

export default function DashboardPage() {
  const [links, setLinks] = useState([
    {
      id: "1",
      title: "My Website",
      url: "https://example.com",
      icon: "Globe",
      clicks: 128,
    },
    {
      id: "2",
      title: "Twitter Profile",
      url: "https://twitter.com/username",
      icon: "Twitter",
      clicks: 85,
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com/username",
      icon: "Github",
      clicks: 42,
    },
    {
      id: "4",
      title: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: "Linkedin",
      clicks: 36,
    },
  ]);

  const addLink = (link: any) => {
    setLinks([...links, { ...link, id: Date.now().toString(), clicks: 0 }]);
  };

  const removeLink = (id: any) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const updateLink = (updatedLink: any) => {
    setLinks(
      links.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 pt-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <DashboardStats links={links} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="links" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="links">My Links</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="links" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <AddLinkForm onAddLink={addLink} />
                  </CardContent>
                </Card>

                <LinksList
                  links={links}
                  onRemoveLink={removeLink}
                  onUpdateLink={updateLink}
                />
              </TabsContent>

              <TabsContent value="appearance">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">
                      Appearance Settings
                    </h3>
                    <p className="text-muted-foreground">
                      Customize how your page looks. Coming soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Page Settings</h3>
                    <p className="text-muted-foreground">
                      Configure your page settings. Coming soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <PagePreview links={links} />
          </div>
        </div>
      </main>
    </div>
  );
}
