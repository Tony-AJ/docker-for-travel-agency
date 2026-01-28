import 'dotenv/config';
import pkg from '@prisma/client';
import express from 'express';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;

const app = express();
app.use(express.json());
// Create a Postgres adapter from your DATABASE_URL and pass it to PrismaClient
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


app.post('/post', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
