require('dotenv').config({ path: '.env.local' });

console.log(process.env.DATABASE_URL);  // Log the DATABASE_URL to verify it's loaded

require('child_process').execSync('pnpx prisma migrate dev', { stdio: 'inherit' });
