export interface Grant {
  id: number;
  name: string;
  description: string;
  category: string;
  amount: number;
  deadline: string;
  imageUrl: string;
  richTextDescription: string;
  tags: string[];
  moreImageUrls: string[];
  contact: Contact;
}

export interface Contact {
  name: string;
  email: string;
}

export const grants: Grant[] = [
  {
    id: 1,
    name: "Developer Grant",
    description: "A grant for developers to work on open source projects",
    category: "Development",
    amount: 1000,
    deadline: "2020-12-31",
    imageUrl: "/chartmobile.png",
    richTextDescription: "This is a rich text description of the grant",
    tags: ["open source", "developer", "programming"],
    moreImageUrls: [
      "/chartmobile.png",
      "/chartmobile.png",
      "/chartmobile.png"
    ],
    contact: {
      name: "devwifhat",
      email: "dev@example.com" // Added dummy email
    }
  },
  // Added dummy data for a new grant
  {
    id: 2,
    name: "Innovation Grant",
    description: "Supporting innovative solutions in environmental technology",
    category: "Innovation",
    amount: 5000,
    deadline: "2023-06-30",
    imageUrl: "/innovation.png",
    richTextDescription: "Explore cutting-edge environmental technologies.",
    tags: ["innovation", "environment", "technology"],
    moreImageUrls: [
      "/innovation1.png",
      "/innovation2.png",
      "/innovation3.png"
    ],
    contact: {
      name: "innovatewithus",
      email: "innovate@example.com"
    }
  }
];