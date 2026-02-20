export type CaseStudy = {
  id: string;
  title: string;
  role: string;
  duration: string;
  stack: string[];
  context: string;
  problem: string;
  approach: string;
  outcomes: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'commerce-platform-modernization',
    title: 'Commerce Platform Modernization',
    role: 'Lead Frontend Engineer',
    duration: '9 months',
    stack: ['Angular', 'Nx', 'TypeScript', 'Storybook'],
    context:
      'A multi-brand ecommerce group with three product squads and fragmented frontend ownership.',
    problem:
      'Release cadence slowed down because UI logic, state boundaries, and component standards diverged across teams.',
    approach:
      'Introduced a modular frontend architecture, shared component contracts, and an incremental migration plan with squad-by-squad adoption.',
    outcomes: [
      'Reduced release regressions by 42%',
      'Cut average PR review time by 35%',
      'Standardized 40+ reusable components'
    ]
  },
  {
    id: 'media-app-performance-recovery',
    title: 'Media App Performance Recovery',
    role: 'Performance Consultant',
    duration: '12 weeks',
    stack: ['Angular', 'Web Vitals', 'Lighthouse CI'],
    context:
      'A content-heavy platform had severe Core Web Vitals degradation after multiple feature launches.',
    problem:
      'Largest Contentful Paint and interaction responsiveness degraded, causing retention and SEO impact.',
    approach:
      'Ran a performance audit, prioritized quick wins, and guided teams through image, rendering, and bundle-size optimizations.',
    outcomes: [
      'Improved LCP from 3.8s to 1.9s on key templates',
      'Reduced JavaScript transfer size by 38%',
      'Raised Lighthouse performance score from 58 to 86'
    ]
  }
];
