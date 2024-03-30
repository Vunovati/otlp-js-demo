CREATE TABLE IF NOT EXISTS products (
    "id" INTEGER PRIMARY KEY,
    "name" VARCHAR(255),
    "imageSrc" VARCHAR(255),
    "imageAlt" TEXT,
    "price" DECIMAL(10, 2),
    "color" VARCHAR(50),
    "gender" VARCHAR(50),
    "newArrival" BOOLEAN,
    "trendingNow" BOOLEAN
);
