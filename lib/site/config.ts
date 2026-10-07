export const site = {
  name: "Syed Monis Sarwar",
  shortName: "Monis Sarwar",
  role: "Full-stack engineer, building AI agents",
  url: "https://m0nis.com",
  email: "monissms16@gmail.com",
  calUrl: "https://cal.com/monis-sarwar-vvbnfn",
  resumeUrl: "/resume",
  resumePdf: "/resume/resume.pdf",
  githubUsername: "MonisMS",
  avatar: "/profile-pic-1.jpeg",
  timeZone: "Asia/Kolkata",
  openTo: "Open to work",

  meta: {
    title: "Syed Monis Sarwar | Full-stack Engineer building AI agents",
    description:
      "Full-stack engineer building AI agents and the systems around them. Projects start from real problems: a daily airfare price index for India, a reading feed from 275+ sources, and AI tools for teachers and field teams.",
  },
} as const;

export const socials = {
  github: "https://github.com/MonisMS",
  linkedin: "https://www.linkedin.com/in/syed-monis-sarwar-sms47/",
  x: "https://x.com/SMSarwar47",
  leetcode: "",
  instagram: "https://www.instagram.com/monis_sarwar/",
  email: `mailto:${site.email}`,
} as const;
