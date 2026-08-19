import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categories = [
  { slug: "sweet", title: "Sweet", img: "/home/menu/Sweet.svg" },
  { slug: "savory", title: "Savory", img: "/home/menu/Savory.svg" },
  {
    slug: "pies-and-danishes",
    title: "Pies & Danishes",
    img: "/home/menu/PiesAndDanishes.svg",
  },
  {
    slug: "loaves-and-rolls",
    title: "Loaves & Rolls",
    img: "/home/menu/LoavesAndRolls.svg",
  },
];

const products = [
  // SWEET
  {
    title: "An Pan",
    desc: "Soft bread filled with chunky sweet red bean paste and topped with sesame seeds.",
    price: "3.00",
    img: "/menu/Sweet/Anpan.webp",
    catSlug: "sweet",
  },
  {
    title: "Anpanman Choco",
    desc: "A bun filled with homemade chocolate custard cream cream inspired by Anpanman.",
    price: "3.20",
    img: "/menu/Sweet/AnpanmanChoco.webp",
    catSlug: "sweet",
  },
  {
    title: "Berry Berry",
    desc: "A pastry filled with blueberry whipping cream and custard cream, topped with blueberries.",
    price: "5.30",
    img: "/menu/Sweet/BerryBerry.webp",
    catSlug: "sweet",
  },
  {
    title: "Chocolate Hat",
    desc: "A sunrise with a chocolate hat on top.",
    price: "3.70",
    img: "/menu/Sweet/ChocolateHat.webp",
    catSlug: "sweet",
  },
  {
    title: "Cinnamon Sunrise",
    desc: "A Cinnamon flavored sunrise filled with homemade custard cream filling.",
    price: "3.80",
    img: "/menu/Sweet/CinnamonSunriseWithCream.webp",
    catSlug: "sweet",
  },
  {
    title: "Double Chocolate",
    desc: "A soft chocolate bread coated with chocolate and filled with homemade chocolate custard.",
    price: "3.60",
    img: "/menu/Sweet/DoubleChocolate.webp",
    catSlug: "sweet",
  },
  {
    title: "Green Tea Kobe Cream",
    desc: "A soft bun filled with homemade light matcha-flavored custard cream.",
    price: "3.10",
    img: "/menu/Sweet/GreenTeaKobeCreamDelight.webp",
    catSlug: "sweet",
  },
  {
    title: "Green Tea Sunrise",
    desc: "A matcha twist on the sunrise bun with a green tea cookie crust and cream filling.",
    price: "4.20",
    img: "/menu/Sweet/GreenTeaSunrise.webp",
    catSlug: "sweet",
  },
  {
    title: "Kobe Cream Delight",
    desc: "A fluffy bun filled with homemade vanilla custard cream.",
    price: "2.80",
    img: "/menu/Sweet/KobeCreamDelight.webp",
    catSlug: "sweet",
  },
  {
    title: "Koshi An",
    desc: "Soft bread filled with smooth sweet red bean paste and topped with sesame seeds.",
    price: "3.00",
    img: "/menu/Sweet/KoshiAn.webp",
    catSlug: "sweet",
  },
  {
    title: "Maritozzo (Chocolate)",
    desc: "A fluffy Italian-style bun filled with chocolate custard cream.",
    price: "4.00",
    img: "/menu/Sweet/MaritozzoChocolateCustard.webp",
    catSlug: "sweet",
  },
  {
    title: "Maritozzo (Kobe)",
    desc: "A fluffy Italian-style bun filled with kobe custard cream.",
    price: "4.00",
    img: "/menu/Sweet/MaritozzoKobeCustard.webp",
    catSlug: "sweet",
  },
  {
    title: "Raspberry Cream Cheese",
    desc: "A pastry filled with raspberry whipping cream and cream cheese, topped with raspberries.",
    price: "5.30",
    img: "/menu/Sweet/RaspberryCreamCheese.webp",
    catSlug: "sweet",
  },
  {
    title: "Strawberry Anko Cream",
    desc: "Soft bread filled with sweet red bean paste and whipped cream, topped with a fresh strawberry.",
    price: "4.60",
    img: "/menu/Sweet/StrawberryAnkoCream.webp",
    catSlug: "sweet",
  },
  {
    title: "Sunrise",
    desc: "A soft bun topped with a sweet crunchy cookie crust.",
    price: "2.80",
    img: "/menu/Sweet/Sunrise.webp",
    catSlug: "sweet",
  },
  {
    title: "Sweet Cream Cheese",
    desc: "A soft bun filled with lightly sweetened cream cheese and topped with sliced almonds.",
    price: "3.30",
    img: "/menu/Sweet/SweetCreamCheese.webp",
    catSlug: "sweet",
  },
  {
    title: "Tropical Dessert",
    desc: "A pastry filled with whipping cream, coconut jelly, and custard, topped with mandarin oranges.",
    price: "2.80",
    img: "/menu/Sweet/TropicalDessert.webp",
    catSlug: "sweet",
  },

  // SAVORY
  {
    title: "Bacon & Egg",
    desc: "A soft bun filled with savory bacon and egg.",
    price: "3.30",
    img: "/menu/Savory/BaconAndEgg.webp",
    catSlug: "savory",
  },
  {
    title: "Clam Chowder",
    desc: "A bread bowl filled with creamy clam chowder with clams and vegetables.",
    price: "3.60",
    img: "/menu/Savory/ClamChowder.webp",
    catSlug: "savory",
  },
  {
    title: "Curry Meatball",
    desc: "A savory bun filled with Japanese curry and a juicy meatball.",
    price: "4.00",
    img: "/menu/Savory/CurryMeatball.webp",
    catSlug: "savory",
  },
  {
    title: "Croquette Pan",
    desc: "A Japanese panko breaded mashed potato with toppings of mayo, ketchup, and a cheese.",
    price: "3.50",
    img: "/menu/Savory/CroquettePan.webp",
    catSlug: "savory",
  },
  {
    title: "Ham & Cheese Croissant",
    desc: "A buttery croissant filled with savory ham and cheese on top.",
    price: "3.60",
    img: "/menu/Savory/HamAndCheeseCroissant.webp",
    catSlug: "savory",
  },
  {
    title: "Hot Dog",
    desc: "A soft bun wrapped around a savory beef hot dog sausage.",
    price: "3.90",
    img: "/menu/Savory/HotDog.webp",
    catSlug: "savory",
  },
  {
    title: "Pizza Pan",
    desc: "A fluffy bun topped with pizza sauce, pepperonis, and bell pepper toppings.",
    price: "3.60",
    img: "/menu/Savory/PizzaPan.webp",
    catSlug: "savory",
  },
  {
    title: "Teriyaki Chicken Meatball",
    desc: "A soft bun filled with a sweet and savory teriyaki chicken meatball, topped with cheese.",
    price: "3.70",
    img: "/menu/Savory/TeryakiMeatball.webp",
    catSlug: "savory",
  },

  // PIES & DANISHES
  {
    title: "Apple Pie",
    desc: "A flaky pastry filled apple jam, and custard cream, topped with apples.",
    price: "4.00",
    img: "/menu/PiesAndDanishes/ApplePie.webp",
    catSlug: "pies-and-danishes",
  },
  {
    title: "Blueberry & Cream Cheese Pie",
    desc: "A pastry filled with blueberry jam and cream cheese.",
    price: "3.60",
    img: "/menu/PiesAndDanishes/BlueberryAndCreamCheesePie.webp",
    catSlug: "pies-and-danishes",
  },
  {
    title: "Cinnamon & Cream Danish",
    desc: "A flaky Danish pastry with cinnamon and creamy filling.",
    price: "2.30",
    img: "/menu/PiesAndDanishes/CinnamonAndCreamDanish.webp",
    catSlug: "pies-and-danishes",
  },
  {
    title: "Cream Cheese Danish",
    desc: "A flaky pastry filled with sweet cream cheese, topped with almonds.",
    price: "2.50",
    img: "/menu/PiesAndDanishes/CreamCheeseDanish.webp",
    catSlug: "pies-and-danishes",
  },
  {
    title: "Dark Cherry Pie",
    desc: "A flaky pastry filled with cherry jam and custard cream, topped with dark cherry.",
    price: "3.60",
    img: "/menu/PiesAndDanishes/DarkCherryPie.webp",
    catSlug: "pies-and-danishes",
  },
  {
    title: "Lemon & Cream Pie",
    desc: "A buttery pastry filled with custard and lemon cream, topped with a slice of lemon.",
    price: "3.60",
    img: "/menu/PiesAndDanishes/LemonAndCreamPie.webp",
    catSlug: "pies-and-danishes",
  },
  {
    title: "Pie Custard",
    desc: "A flaky pastry filled with Bavarian cream.",
    price: "2.70",
    img: "/menu/PiesAndDanishes/PieCustard.webp",
    catSlug: "pies-and-danishes",
  },

  // LOAVES & ROLLS
  {
    title: "Shoku Pan (Thick Sliced)",
    desc: "Thick slices of soft and fluffy Japanese milk bread.",
    price: "5.00",
    img: "/menu/LoavesAndRolls/ShokuPanThickSliced.webp",
    catSlug: "loaves-and-rolls",
  },
  {
    title: "Shoku Pan (Thin Sliced)",
    desc: "Thin slices of soft and fluffy Japanese milk bread.",
    price: "5.00",
    img: "/menu/LoavesAndRolls/ShokuPanThinSliced.webp",
    catSlug: "loaves-and-rolls",
  },
  {
    title: "Shoku Pan (Uncut)",
    desc: "A full loaf of soft and fluffy Japanese milk bread (Two Shoku Pan Size).",
    price: "10.00",
    img: "/menu/LoavesAndRolls/ShokuPanUncut.webp",
    catSlug: "loaves-and-rolls",
  },
  {
    title: "Croissant",
    desc: "A buttery, flaky croissant baked until golden.",
    price: "2.10",
    img: "/menu/LoavesAndRolls/Croissant.webp",
    catSlug: "loaves-and-rolls",
  },
  {
    title: "Dinner Roll",
    desc: "Five soft and fluffy classic bread rolls.",
    price: "3.60",
    img: "/menu/LoavesAndRolls/DinnerRoll.webp",
    catSlug: "loaves-and-rolls",
  },
];

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { title: cat.title, img: cat.img },
      create: { slug: cat.slug, title: cat.title, img: cat.img },
    });
  }

  await prisma.product.deleteMany({});

  for (const p of products) {
    await prisma.product.create({
      data: {
        title: p.title,
        desc: p.desc,
        price: new Prisma.Decimal(p.price),
        img: p.img,
        catSlug: p.catSlug,
      },
    });
  }

  const count = await prisma.product.count();
  console.log(
    `Successfully updated and seeded ${count} pastries into the database!`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
