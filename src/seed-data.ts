import { supabase } from "./integrations/supabase/client";
import { sampleArticles } from "./seed/articles";
import { sampleJobs } from "./seed/jobs";

export const seedDatabase = async () => {
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

  // Insert jobs
  const { error: jobsError } = await supabase
    .from('jobs')
    .insert(sampleJobs);

  if (jobsError) {
    console.error('Error seeding jobs:', jobsError);
    return;
  }

  console.log('Database seeded successfully!');
};