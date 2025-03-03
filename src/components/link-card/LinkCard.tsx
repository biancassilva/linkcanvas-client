import React from "react";
import { Link } from "../../types/common";

interface LinkCardProps {
  link: Link;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
      style={{
        backgroundColor: link.bgColor,
        color: link.textColor,
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{link.title}</h3>
        <span className="text-sm opacity-80">{link.category}</span>
      </div>
    </a>
  );
};

export default LinkCard;
