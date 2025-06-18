import { PrismaClient } from "../lib/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.$transaction(
    async (tx) => {
      // Clear existing data (but keep users)
      console.log("🧹 Clearing existing data (keeping users)...");
      await tx.view.deleteMany();
      await tx.like.deleteMany();
      await tx.comment.deleteMany();
      await tx.blogPost.deleteMany();
      await tx.category.deleteMany();

      console.log("📝 Creating new data...");

      // Get existing users or create new ones if none exist
      let users = await tx.user.findMany();

      if (users.length === 0) {
        console.log("👥 No users found, creating new users...");
        users = await Promise.all(
          Array.from({ length: 5 }).map(() =>
            tx.user.create({
              data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                username: faker.internet.username(),
                image: `https://picsum.photos/seed/${faker.string.alphanumeric(
                  8
                )}/150/150`,
                bio: faker.person.bio(),
                title: faker.person.jobTitle(),
                website: faker.internet.url(),
                twitter: faker.internet.username(),
                github: faker.internet.username(),
                linkedin: faker.internet.username(),
              },
            })
          )
        );
      } else {
        console.log(`👥 Using ${users.length} existing users...`);
      }

      // Create categories
      const categories = await Promise.all(
        ["Technology", "Design", "Science"].map((name) =>
          tx.category.create({
            data: {
              name,
              description: faker.lorem.sentence(),
              icon: faker.internet.emoji(),
            },
          })
        )
      );

      // Create posts
      const posts = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          tx.blogPost.create({
            data: {
              title: faker.lorem.sentence(),
              slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
              excerpt: faker.lorem.sentences(2),
              content: faker.lorem.paragraphs(5),
              image: `https://picsum.photos/seed/${faker.string.alphanumeric(
                8
              )}/800/400`,
              readTime: `${faker.number.int({ min: 2, max: 10 })} min`,
              author: { connect: { id: faker.helpers.arrayElement(users).id } },
              category: {
                connect: { id: faker.helpers.arrayElement(categories).id },
              },
              tags: faker.lorem.words(3).split(" "),
            },
          })
        )
      );

      // Create comments
      await Promise.all(
        Array.from({ length: 30 }).map(() =>
          tx.comment.create({
            data: {
              content: faker.lorem.sentence(),
              author: { connect: { id: faker.helpers.arrayElement(users).id } },
              post: { connect: { id: faker.helpers.arrayElement(posts).id } },
            },
          })
        )
      );

      // Create likes (unique pairs)
      const likePairs = new Set<string>();
      while (likePairs.size < 50) {
        const user = faker.helpers.arrayElement(users);
        const post = faker.helpers.arrayElement(posts);
        likePairs.add(`${user.id}-${post.id}`);
      }

      for (const pair of likePairs) {
        const [userId, postId] = pair.split("-");
        await tx.like.create({
          data: {
            userId,
            postId,
          },
        });
      }

      // Create views (unique pairs)
      const viewPairs = new Set<string>();
      while (viewPairs.size < 100) {
        const user = faker.helpers.arrayElement(users);
        const post = faker.helpers.arrayElement(posts);
        viewPairs.add(`${user.id}-${post.id}`);
      }

      for (const pair of viewPairs) {
        const [userId, postId] = pair.split("-");
        await tx.view.create({
          data: {
            userId,
            postId,
          },
        });
      }
    },
    {
      timeout: 300000, // 5 minutes
    }
  );

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
