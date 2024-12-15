import { supabase } from "./integrations/supabase/client";

const sampleArticles = [
  {
    title: "The Future of AI in Healthcare",
    excerpt: "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment.",
    content: "Artificial intelligence is transforming healthcare in unprecedented ways...",
    category: "Technology",
    author: "Dr. Sarah Chen",
    image_url: "https://source.unsplash.com/random/800x600/?ai,healthcare",
    status: "published"
  },
  {
    title: "Global Climate Summit 2024",
    excerpt: "World leaders gather to address urgent climate action measures.",
    content: "In a historic meeting, representatives from over 190 countries...",
    category: "World",
    author: "James Wilson",
    image_url: "https://source.unsplash.com/random/800x600/?climate,summit",
    status: "published"
  },
  {
    title: "Breakthrough in Quantum Computing",
    excerpt: "Scientists achieve quantum supremacy with new processor design.",
    content: "A team of researchers has announced a major breakthrough...",
    category: "Science",
    author: "Dr. Robert Kumar",
    image_url: "https://source.unsplash.com/random/800x600/?quantum,computer",
    status: "published"
  },
  {
    title: "The Rise of Remote Work Culture",
    excerpt: "How companies are adapting to the new normal of distributed teams.",
    content: "The pandemic has permanently changed how we work...",
    category: "Technology",
    author: "Emily Zhang",
    image_url: "https://source.unsplash.com/random/800x600/?remote,work",
    status: "published"
  },
  {
    title: "Advances in Space Exploration",
    excerpt: "New discoveries point to potential signs of life on distant exoplanets.",
    content: "Astronomers using the James Webb Space Telescope have detected...",
    category: "Science",
    author: "Dr. Michael Torres",
    image_url: "https://source.unsplash.com/random/800x600/?space,planet",
    status: "published"
  },
  {
    title: "Mental Health in the Digital Age",
    excerpt: "Understanding the impact of social media on mental wellbeing.",
    content: "As our lives become increasingly digital...",
    category: "Health",
    author: "Dr. Lisa Thompson",
    image_url: "https://source.unsplash.com/random/800x600/?mental,health",
    status: "published"
  },
  {
    title: "The Evolution of Electric Vehicles",
    excerpt: "How EVs are reshaping the automotive industry landscape.",
    content: "The electric vehicle revolution is accelerating...",
    category: "Technology",
    author: "Alex Morgan",
    image_url: "https://source.unsplash.com/random/800x600/?electric,car",
    status: "published"
  },
  {
    title: "Sustainable Fashion Trends",
    excerpt: "Eco-friendly practices transforming the fashion industry.",
    content: "The fashion industry is undergoing a sustainable revolution...",
    category: "Entertainment",
    author: "Sofia Rodriguez",
    image_url: "https://source.unsplash.com/random/800x600/?sustainable,fashion",
    status: "published"
  },
  {
    title: "Breakthroughs in Renewable Energy",
    excerpt: "New solar technology achieves record efficiency levels.",
    content: "Scientists have developed a new type of solar cell...",
    category: "Science",
    author: "Dr. David Lee",
    image_url: "https://source.unsplash.com/random/800x600/?solar,energy",
    status: "published"
  },
  {
    title: "The Future of Education",
    excerpt: "How AI and VR are transforming learning experiences.",
    content: "Educational institutions are embracing new technologies...",
    category: "Technology",
    author: "Prof. Maria Garcia",
    image_url: "https://source.unsplash.com/random/800x600/?education,technology",
    status: "published"
  },
  {
    title: "Advancements in Cancer Research",
    excerpt: "Promising new treatment shows remarkable results in clinical trials.",
    content: "A groundbreaking study has revealed...",
    category: "Health",
    author: "Dr. John Smith",
    image_url: "https://source.unsplash.com/random/800x600/?medical,research",
    status: "published"
  },
  {
    title: "The Rise of Cryptocurrency",
    excerpt: "Understanding the impact of digital currencies on global finance.",
    content: "As cryptocurrency adoption continues to grow...",
    category: "Technology",
    author: "Mark Johnson",
    image_url: "https://source.unsplash.com/random/800x600/?cryptocurrency,bitcoin",
    status: "published"
  },
  {
    title: "Ocean Conservation Efforts",
    excerpt: "New initiatives to protect marine ecosystems worldwide.",
    content: "Marine biologists have launched a global effort...",
    category: "World",
    author: "Dr. Emma Watson",
    image_url: "https://source.unsplash.com/random/800x600/?ocean,conservation",
    status: "published"
  },
  {
    title: "The Future of Work",
    excerpt: "How AI and automation are reshaping career opportunities.",
    content: "The workplace is undergoing a dramatic transformation...",
    category: "Technology",
    author: "Thomas Anderson",
    image_url: "https://source.unsplash.com/random/800x600/?future,work",
    status: "published"
  },
  {
    title: "Advances in Biotechnology",
    excerpt: "Gene editing breakthrough offers hope for genetic disorders.",
    content: "Scientists have made a significant advancement...",
    category: "Science",
    author: "Dr. Sarah Palmer",
    image_url: "https://source.unsplash.com/random/800x600/?biotechnology,science",
    status: "published"
  }
];

const sampleJobs = [
  {
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    description: "Looking for an experienced software engineer to lead our backend team...",
    requirements: "5+ years experience with Node.js, Python, and distributed systems",
    salary_range: "$150,000 - $180,000",
    status: "active"
  },
  {
    title: "AI Research Scientist",
    company: "InnovAI Labs",
    location: "Boston, MA",
    description: "Join our cutting-edge AI research team...",
    requirements: "PhD in Computer Science or related field, experience with deep learning",
    salary_range: "$160,000 - $200,000",
    status: "active"
  },
  {
    title: "Product Manager",
    company: "Digital Dynamics",
    location: "New York, NY",
    description: "Lead product strategy and development for our SaaS platform...",
    requirements: "3+ years of product management experience in B2B software",
    salary_range: "$130,000 - $160,000",
    status: "active"
  },
  {
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Remote",
    description: "Design intuitive and beautiful user interfaces for our products...",
    requirements: "Portfolio showcasing web and mobile app designs",
    salary_range: "$90,000 - $120,000",
    status: "active"
  },
  {
    title: "Data Scientist",
    company: "DataMind Analytics",
    location: "Seattle, WA",
    description: "Analyze complex datasets and build predictive models...",
    requirements: "Strong background in statistics and machine learning",
    salary_range: "$140,000 - $170,000",
    status: "active"
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Systems",
    location: "Austin, TX",
    description: "Manage and improve our cloud infrastructure...",
    requirements: "Experience with AWS, Docker, and Kubernetes",
    salary_range: "$120,000 - $150,000",
    status: "active"
  },
  {
    title: "Frontend Developer",
    company: "WebCraft",
    location: "Remote",
    description: "Build responsive and performant web applications...",
    requirements: "3+ years experience with React and TypeScript",
    salary_range: "$100,000 - $130,000",
    status: "active"
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Solutions Inc",
    location: "San Jose, CA",
    description: "Develop and deploy machine learning models...",
    requirements: "Strong background in ML and software engineering",
    salary_range: "$140,000 - $180,000",
    status: "active"
  },
  {
    title: "Technical Project Manager",
    company: "Project Pro",
    location: "Chicago, IL",
    description: "Lead technical projects and coordinate with stakeholders...",
    requirements: "PMP certification and technical background",
    salary_range: "$110,000 - $140,000",
    status: "active"
  },
  {
    title: "Security Engineer",
    company: "SecureNet",
    location: "Washington, DC",
    description: "Implement and maintain security infrastructure...",
    requirements: "CISSP certification and 5+ years experience",
    salary_range: "$130,000 - $160,000",
    status: "active"
  },
  {
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Los Angeles, CA",
    description: "Develop native iOS and Android applications...",
    requirements: "Experience with Swift and Kotlin",
    salary_range: "$110,000 - $140,000",
    status: "active"
  },
  {
    title: "Database Administrator",
    company: "DataCore Systems",
    location: "Denver, CO",
    description: "Manage and optimize database performance...",
    requirements: "Experience with PostgreSQL and MySQL",
    salary_range: "$100,000 - $130,000",
    status: "active"
  },
  {
    title: "Quality Assurance Engineer",
    company: "QualityTech",
    location: "Portland, OR",
    description: "Develop and execute test plans for software applications...",
    requirements: "Experience with automated testing frameworks",
    salary_range: "$90,000 - $120,000",
    status: "active"
  },
  {
    title: "Blockchain Developer",
    company: "Chain Innovation",
    location: "Miami, FL",
    description: "Develop smart contracts and blockchain applications...",
    requirements: "Experience with Solidity and Web3",
    salary_range: "$130,000 - $160,000",
    status: "active"
  },
  {
    title: "Systems Architect",
    company: "ArchSystems",
    location: "Seattle, WA",
    description: "Design and implement scalable system architecture...",
    requirements: "10+ years of systems design experience",
    salary_range: "$160,000 - $200,000",
    status: "active"
  }
];

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