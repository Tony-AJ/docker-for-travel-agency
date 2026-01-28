# 1️⃣ Base image
FROM node:20-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files first (better caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of the source
COPY . .

# 6️⃣ Generate Prisma client
RUN npx prisma generate

# 7️⃣ Expose backend port (change if needed)
EXPOSE 3000

# 8️⃣ Start the backend
CMD ["npm", "run", "start"]
