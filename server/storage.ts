import { users, watches, inquiries, sellSubmissions, newsletters, type User, type InsertUser, type Watch, type InsertWatch, type Inquiry, type InsertInquiry, type SellSubmission, type InsertSellSubmission, type Newsletter, type InsertNewsletter } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllWatches(): Promise<Watch[]>;
  getWatch(id: number): Promise<Watch | undefined>;
  getFeaturedWatches(): Promise<Watch[]>;
  getWatchesByBrand(brand: string): Promise<Watch[]>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  createSellSubmission(submission: InsertSellSubmission): Promise<SellSubmission>;
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private watches: Map<number, Watch>;
  private inquiries: Map<number, Inquiry>;
  private sellSubmissions: Map<number, SellSubmission>;
  private newsletters: Map<number, Newsletter>;
  private currentUserId: number;
  private currentWatchId: number;
  private currentInquiryId: number;
  private currentSellSubmissionId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.watches = new Map();
    this.inquiries = new Map();
    this.sellSubmissions = new Map();
    this.newsletters = new Map();
    this.currentUserId = 1;
    this.currentWatchId = 1;
    this.currentInquiryId = 1;
    this.currentSellSubmissionId = 1;
    this.currentNewsletterId = 1;
    
    this.initializeWatches();
  }

  private initializeWatches() {
    const watchesData: InsertWatch[] = [
      {
        name: "Rolex Submariner Date",
        brand: "Rolex",
        price: 12500000,
        category: "Men's",
        condition: "Excellent",
        year: 2022,
        image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800",
        movement: "Automatic",
        caseMaterial: "Oystersteel",
        caseSize: "41mm",
        waterResistance: "300m",
        description: "The Rolex Submariner Date is an iconic diving watch that combines exceptional functionality with timeless elegance. This legendary timepiece features a unidirectional rotating bezel, Chromalight display with long-lasting blue luminescence, and is waterproof to 300 metres.",
        featured: true,
      },
      {
        name: "Patek Philippe Nautilus",
        brand: "Patek Philippe",
        price: 45200000,
        category: "Men's",
        condition: "Excellent",
        year: 2021,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "40mm",
        waterResistance: "120m",
        description: "The Patek Philippe Nautilus is the embodiment of sporty elegance. Its distinctive porthole-inspired case and horizontally embossed dial make it one of the most recognizable luxury sports watches in the world.",
        featured: true,
      },
      {
        name: "Audemars Piguet Royal Oak",
        brand: "Audemars Piguet",
        price: 28750000,
        category: "Men's",
        condition: "Very Good",
        year: 2020,
        image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "41mm",
        waterResistance: "50m",
        description: "The Audemars Piguet Royal Oak revolutionized luxury watchmaking with its octagonal bezel and integrated bracelet. This masterpiece combines bold design with exceptional craftsmanship.",
        featured: true,
      },
      {
        name: "Omega Speedmaster Professional",
        brand: "Omega",
        price: 3850000,
        category: "Men's",
        condition: "Excellent",
        year: 2023,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        movement: "Manual",
        caseMaterial: "Stainless Steel",
        caseSize: "42mm",
        waterResistance: "50m",
        description: "The legendary Omega Speedmaster Professional 'Moonwatch' - the first watch worn on the moon. This manual-wind chronograph represents the pinnacle of space exploration heritage.",
        featured: true,
      },
      {
        name: "Cartier Santos",
        brand: "Cartier",
        price: 6200000,
        category: "Unisex",
        condition: "Very Good",
        year: 2019,
        image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "39.8mm",
        waterResistance: "100m",
        description: "The Cartier Santos, inspired by aviation pioneer Alberto Santos-Dumont, features the distinctive square case with exposed screws that has become an icon of luxury watchmaking.",
        featured: true,
      },
      {
        name: "TAG Heuer Monaco",
        brand: "TAG Heuer",
        price: 4650000,
        category: "Men's",
        condition: "Good",
        year: 2018,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "39mm",
        waterResistance: "100m",
        description: "The TAG Heuer Monaco is famous for its square case and motorsport heritage. Made iconic by Steve McQueen in the film 'Le Mans', this chronograph represents racing elegance.",
        featured: true,
      },
      {
        name: "Rolex GMT-Master II",
        brand: "Rolex",
        price: 15200000,
        category: "Men's",
        condition: "Excellent",
        year: 2022,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
        movement: "Automatic",
        caseMaterial: "Oystersteel",
        caseSize: "40mm",
        waterResistance: "100m",
        description: "The Rolex GMT-Master II was designed for pilots and world travelers. Its 24-hour bezel and dual time zone functionality make it the perfect companion for global adventures.",
        featured: false,
      },
      {
        name: "Patek Philippe Calatrava",
        brand: "Patek Philippe",
        price: 32800000,
        category: "Men's",
        condition: "Excellent",
        year: 2021,
        image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800",
        movement: "Manual",
        caseMaterial: "White Gold",
        caseSize: "39mm",
        waterResistance: "30m",
        description: "The Patek Philippe Calatrava represents pure classical elegance. This dress watch exemplifies the Geneva manufacture's philosophy of timeless design and exceptional finishing.",
        featured: false,
      },
      {
        name: "Omega Seamaster",
        brand: "Omega",
        price: 4200000,
        category: "Men's",
        condition: "Very Good",
        year: 2020,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "42mm",
        waterResistance: "300m",
        description: "The Omega Seamaster Professional combines diving functionality with luxury aesthetics. Famous as James Bond's watch of choice, it offers exceptional performance and style.",
        featured: false,
      },
      {
        name: "IWC Pilot's Watch",
        brand: "IWC",
        price: 7850000,
        category: "Men's",
        condition: "Good",
        year: 2019,
        image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "43mm",
        waterResistance: "60m",
        description: "The IWC Pilot's Watch continues the brand's aviation heritage with exceptional legibility and robust construction. A true tool watch for modern aviators.",
        featured: false,
      },
      {
        name: "Jaeger-LeCoultre Reverso",
        brand: "Jaeger-LeCoultre",
        price: 9200000,
        category: "Unisex",
        condition: "Excellent",
        year: 2022,
        image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?w=800",
        movement: "Manual",
        caseMaterial: "Stainless Steel",
        caseSize: "42.9mm x 25.5mm",
        waterResistance: "30m",
        description: "The Jaeger-LeCoultre Reverso features a unique reversible case originally designed for polo players. This Art Deco masterpiece remains one of watchmaking's most distinctive designs.",
        featured: false,
      },
      {
        name: "Breitling Navitimer",
        brand: "Breitling",
        price: 5650000,
        category: "Men's",
        condition: "Good",
        year: 2018,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "46mm",
        waterResistance: "30m",
        description: "The Breitling Navitimer is the ultimate pilot's chronograph, featuring a circular slide rule for aviation calculations. A perfect blend of function and form for aviation enthusiasts.",
        featured: false,
      },
      {
        name: "Panerai Luminor",
        brand: "Panerai",
        price: 8400000,
        category: "Men's",
        condition: "Very Good",
        year: 2020,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "44mm",
        waterResistance: "300m",
        description: "The Panerai Luminor showcases Italian design with its distinctive crown-protecting bridge and sandwich dial. Originally designed for Italian Navy divers.",
        featured: false,
      },
      {
        name: "Rolex Daytona",
        brand: "Rolex",
        price: 25800000,
        category: "Men's",
        condition: "Excellent",
        year: 2023,
        image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800",
        movement: "Automatic",
        caseMaterial: "Oystersteel",
        caseSize: "40mm",
        waterResistance: "100m",
        description: "The Rolex Cosmograph Daytona was designed to meet the demands of professional racing drivers. This chronograph offers exceptional precision and readability on the racetrack.",
        featured: false,
      },
      {
        name: "Rolex Oyster Perpetual",
        brand: "Rolex",
        price: 8500000,
        category: "Unisex",
        condition: "Excellent",
        year: 2022,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800",
        movement: "Automatic",
        caseMaterial: "Oystersteel",
        caseSize: "41mm",
        waterResistance: "100m",
        description: "The Rolex Oyster Perpetual is the purest expression of the Oyster concept. This time-only watch embodies all the fundamental qualities of the brand in their simplest form.",
        featured: false,
      },
      {
        name: "Rolex Explorer",
        brand: "Rolex",
        price: 9750000,
        category: "Men's",
        condition: "Good",
        year: 2019,
        image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800",
        movement: "Automatic",
        caseMaterial: "Oystersteel",
        caseSize: "39mm",
        waterResistance: "100m",
        description: "The Rolex Explorer pays tribute to the spirit of exploration. Originally designed for extreme conditions, this watch accompanied Sir Edmund Hillary to the summit of Everest.",
        featured: false,
      },
      {
        name: "Cartier Tank",
        brand: "Cartier",
        price: 11200000,
        category: "Unisex",
        condition: "Excellent",
        year: 2021,
        image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?w=800",
        movement: "Quartz",
        caseMaterial: "Yellow Gold",
        caseSize: "31mm x 25mm",
        waterResistance: "30m",
        description: "The Cartier Tank is inspired by the Renault tanks of WWI. This rectangular watch has become an icon of elegant design, worn by celebrities and royalty alike.",
        featured: false,
      },
      {
        name: "Omega Constellation",
        brand: "Omega",
        price: 5200000,
        category: "Unisex",
        condition: "Very Good",
        year: 2020,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "39mm",
        waterResistance: "100m",
        description: "The Omega Constellation represents precision and luxury. Known for its distinctive design features including the famous 'claws' and star emblem.",
        featured: false,
      },
      {
        name: "TAG Heuer Carrera",
        brand: "TAG Heuer",
        price: 6800000,
        category: "Men's",
        condition: "Excellent",
        year: 2022,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        movement: "Automatic",
        caseMaterial: "Stainless Steel",
        caseSize: "41mm",
        waterResistance: "100m",
        description: "The TAG Heuer Carrera chronograph was inspired by the Carrera Panamericana race. This elegant sports watch perfectly balances sophistication with racing spirit.",
        featured: false,
      },
      {
        name: "Hublot Big Bang",
        brand: "Hublot",
        price: 18750000,
        category: "Men's",
        condition: "Good",
        year: 2019,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
        movement: "Automatic",
        caseMaterial: "Ceramic",
        caseSize: "44mm",
        waterResistance: "100m",
        description: "The Hublot Big Bang represents the fusion of tradition and innovation. Its bold design and use of unconventional materials have made it a contemporary icon.",
        featured: false,
      }
    ];

    watchesData.forEach(watch => {
      const id = this.currentWatchId++;
      this.watches.set(id, { ...watch, id, featured: watch.featured ?? false });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllWatches(): Promise<Watch[]> {
    return Array.from(this.watches.values());
  }

  async getWatch(id: number): Promise<Watch | undefined> {
    return this.watches.get(id);
  }

  async getFeaturedWatches(): Promise<Watch[]> {
    return Array.from(this.watches.values()).filter(watch => watch.featured);
  }

  async getWatchesByBrand(brand: string): Promise<Watch[]> {
    return Array.from(this.watches.values()).filter(watch => 
      watch.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const newInquiry: Inquiry = { 
      ...inquiry, 
      id,
      watchId: inquiry.watchId ?? null,
      message: inquiry.message ?? null,
      createdAt: new Date().toISOString(),
    };
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }

  async createSellSubmission(submission: InsertSellSubmission): Promise<SellSubmission> {
    const id = this.currentSellSubmissionId++;
    const newSubmission: SellSubmission = { 
      ...submission, 
      id,
      year: submission.year ?? null,
      description: submission.description ?? null,
      hasBox: submission.hasBox ?? null,
      hasPapers: submission.hasPapers ?? null,
      hasServiceRecords: submission.hasServiceRecords ?? null,
      createdAt: new Date().toISOString(),
    };
    this.sellSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newNewsletter: Newsletter = { 
      ...newsletter, 
      id,
      subscribedAt: new Date().toISOString(),
    };
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }
}

export const storage = new MemStorage();
