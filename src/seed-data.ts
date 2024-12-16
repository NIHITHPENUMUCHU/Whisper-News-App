import { supabase } from "./integrations/supabase/client";
import { sampleArticles } from "./seed/articles";
import { sampleJobs } from "./seed/jobs";

export const seedDatabase = async () => {
  // Insert articles
  const { error: articlesError } = await supabase
    .from('articles')
    .insert(sampleArticles);

  if (articlesError) {
    console.error('Error seeding articles:', articlesError);
    return;
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