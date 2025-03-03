import LinkCard from "@/components/link-card/LinkCard";
import ProfileSection from "@/components/profile-section/ProfileSection";
import { Link, Profile } from "@/types/common";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile] = useState<Profile>({
    name: "John Doe",
    bio: "Digital Creator & Developer",
    avatar: "/avatar-placeholder.png",
  });

  useEffect(() => {
    // Simula carregamento inicial de dados
    const fetchLinks = async (): Promise<void> => {
      try {
        // Em produção, substituir por uma chamada API real
        const demoLinks: Link[] = [
          {
            id: 1,
            title: "Portfolio",
            url: "https://portfolio.com",
            category: "work",
            bgColor: "#4A90E2",
            textColor: "#FFFFFF",
          },
          {
            id: 2,
            title: "Latest Project",
            url: "https://project.com",
            category: "projects",
            bgColor: "#50E3C2",
            textColor: "#000000",
          },
          {
            id: 3,
            title: "Connect on LinkedIn",
            url: "https://linkedin.com",
            category: "social",
            bgColor: "#0077B5",
            textColor: "#FFFFFF",
          },
        ];

        // Simulando delay de network
        setTimeout(() => {
          setLinks(demoLinks);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching links:", error);
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="inline-block mb-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              LinkCanvas
            </h1>
            <p className="text-gray-600 mt-2">Your Link Creation Space</p>
          </div>
        </header>

        {loading ? (
          <div className="text-center">
            <div className="animate-pulse">Loading your canvas...</div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <ProfileSection profile={profile} />

            <div className="space-y-4">
              {links.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
