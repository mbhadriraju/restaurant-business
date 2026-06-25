export type PortfolioCategory = "Restaurant" | "Menu" | "Social" | "Campaign";

export type PortfolioImage = {
  src: string;
  alt: string;
  category: PortfolioCategory;
  title: string;
  useCase: string;
  featured?: boolean;
  orientation?: "wide" | "tall" | "square";
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/payments", label: "Payments" },
];

export const services = [
  {
    title: "Food Photography",
    body: "Photos of the food, space, team, service, and guest experience. Built for menus, websites, social posts, and restaurant profiles.",
  },
  {
    title: "Website Development",
    body: "Clean restaurant websites that show the menu, tell guests what to expect, and make contact, ordering, or reservations easy.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Plan",
    body: "We talk through what the restaurant needs, where the work will be used, and what matters most to guests.",
  },
  {
    step: "02",
    title: "Prepare",
    body: "For photos, we plan dishes, spaces, timing, and shot list. For websites, we gather pages, copy, photos, and links.",
  },
  {
    step: "03",
    title: "Create",
    body: "We shoot, edit, design, or build with clear communication and respect for the restaurant's schedule.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "You get polished files or a live site that is ready to use.",
  },
];

export const portfolioCategories: Array<PortfolioCategory | "All"> = [
  "All",
  "Restaurant",
  "Menu",
  "Social",
  "Campaign",
];

const imageNumbers = [
  1, 6, 12, 18, 25, 28, 31, 39, 4, 7, 14, 17, 21, 30, 35, 40, 48, 55,
];

const categoryCycle: PortfolioCategory[] = [
  "Restaurant",
  "Menu",
  "Social",
  "Campaign",
];

export const portfolioImages: PortfolioImage[] = imageNumbers.map((number, index) => {
  const padded = String(number).padStart(2, "0");
  const category = categoryCycle[index % categoryCycle.length];

  return {
    src: `/photos/Highlights/MiyabiFinal-${padded}.jpg`,
    alt: `Restaurant photography sample ${padded} by YB Visuals`,
    category,
    title: `${category} Study ${padded}`,
    useCase:
      category === "Restaurant"
        ? "Dining room, hospitality, and brand atmosphere"
        : category === "Menu"
          ? "Menu pages, ordering platforms, and website dish features"
          : category === "Social"
            ? "Reels covers, profile refreshes, and weekly content drops"
            : "Launch ads, seasonal campaigns, and press-ready visuals",
    featured: index < 8,
    orientation: index % 7 === 0 ? "tall" : index % 5 === 0 ? "square" : "wide",
  };
});

export const featuredImages = portfolioImages.filter((image) => image.featured);

export const founders = [
  {
    name: "Henry Yim",
    role: "Cofounder, Photography and Business Lead",
    image: "/photos/Henry%20Yim%20Headshot.jpg",
    bio: "Henry brings years of photography experience and helps lead the business. He handles shoot planning, restaurant outreach, and on-site production.",
  },
  {
    name: "Madhava Bhadriraju",
    role: "Cofounder, Development and Business Lead",
    image: "/photos/Madhava%20Bhadriraju%20Headshot.jpg",
    bio: "Madhava is an experienced developer and business lead. He builds client websites, manages project delivery, and keeps the work clear from first call to launch.",
  },
];

export const projectTypes = [
  "Food photography",
  "Website development",
];

export const budgetRanges = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];
