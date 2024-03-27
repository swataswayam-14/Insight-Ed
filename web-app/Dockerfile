FROM node:21

WORKDIR /nextapp

COPY package* .

RUN npm install

COPY . .

RUN npm install -g prisma

RUN npx prisma generate

ENV DATABASE_URL = "postgresql://swataswayamdash:Dcnhf1IajsW5@ep-gentle-math-a5z04t41.us-east-2.aws.neon.tech/Insight-Ed?sslmode=require"

CMD ["npm", "run", "dev"]