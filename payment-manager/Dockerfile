FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install Prisma CLI
RUN npm install prisma --save-dev

# Copy the remaining application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Push the Prisma schema to the database
RUN npx prisma db push

EXPOSE 3001

CMD ["npm", "run", "dev"]
