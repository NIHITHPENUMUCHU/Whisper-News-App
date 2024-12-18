import { supabase } from "./integrations/supabase/client";
import { sampleArticles } from "./seed/articles";
import { sampleJobs } from "./seed/jobs";

export const seedDatabase = async () => {
  console.log('Starting database seeding...');
  
  try {
    // First, check if data already exists
    const { data: existingArticles, error: articlesCountError } = await supabase
      .from('articles')
      .select('count');
    
    if (articlesCountError) {
      console.error('Error checking articles count:', articlesCountError);
      return;
    }

    const { data: existingJobs, error: jobsCountError } = await supabase
      .from('jobs')
      .select('count');
    
    if (jobsCountError) {
      console.error('Error checking jobs count:', jobsCountError);
      return;
    }

    // Only seed if tables are empty
    if (!existingArticles?.[0]?.count) {
      console.log('Seeding articles...');
      // Insert articles in batches to avoid rate limiting
      const batchSize = 5;
      for (let i = 0; i < sampleArticles.length; i += batchSize) {
        const batch = sampleArticles.slice(i, i + batchSize);
        const { error: articlesError } = await supabase
          .from('articles')
          .insert(batch);

        if (articlesError) {
          console.error('Error seeding articles batch:', articlesError);
          return;
        }
      }
      console.log('Articles seeding completed!');
    }

    if (!existingJobs?.[0]?.count) {
      console.log('Seeding jobs...');
      // Insert jobs in batches to avoid rate limiting
      const batchSize = 5;
      for (let i = 0; i < sampleJobs.length; i += batchSize) {
        const batch = sampleJobs.slice(i, i + batchSize);
        const { error: jobsError } = await supabase
          .from('jobs')
          .insert(batch);

        if (jobsError) {
          console.error('Error seeding jobs batch:', jobsError);
          return;
        }
      }
      console.log('Jobs seeding completed!');
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};