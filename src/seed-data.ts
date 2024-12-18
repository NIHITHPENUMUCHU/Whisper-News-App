import { supabase } from "./integrations/supabase/client";
import { sampleArticles } from "./seed/articles";
import { sampleJobs } from "./seed/jobs";

export const seedDatabase = async () => {
  console.log('Starting database seeding...');
  
  try {
    // First, check if data already exists
    const { data: existingArticles } = await supabase
      .from('articles')
      .select('count');
    
    const { data: existingJobs } = await supabase
      .from('jobs')
      .select('count');

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
    }

    if (!existingJobs?.[0]?.count) {
      console.log('Seeding jobs...');
      // Insert jobs
      const { error: jobsError } = await supabase
        .from('jobs')
        .insert(sampleJobs);

      if (jobsError) {
        console.error('Error seeding jobs:', jobsError);
        return;
      }
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};