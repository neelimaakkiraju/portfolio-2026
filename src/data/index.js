// Portfolio data - single source of truth for all content
import portfolioData from "./portfolio.json";

export const data = portfolioData;

// Helper to get specific sections
export const getPersonal = () => data.personal;
export const getHero = () => data.hero;
export const getNavigation = () => data.navigation;
export const getProjects = () => data.projects;
export const getExperience = () => data.experience;
export const getContact = () => data.contact;
export const getSocial = () => data.social;
export const getFooter = () => data.footer;

export default data;
