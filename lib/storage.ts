"use client"

export interface PortfolioData {
  summary: {
    name: string
    title: string
    description: string
  }
  skills: string[]
  experience: Array<{
    id: string
    company: string
    location: string
    period: string
    role: string
    description: string
    projects?: Array<{
      name: string
      description: string
    }>
  }>
  education: Array<{
    id: string
    degree: string
    institution: string
    period: string
  }>
  contact: {
    phone: string
    phone2: string
    email: string
    location: string
    linkedin: string
  }
}

const DEFAULT_DATA: PortfolioData = {
  summary: {
    name: "Ahmed Magdy",
    title: "Front-End Developer",
    description:
      "Front-End Developer specializing in modern, responsive web applications using React. Experienced in scalable UI development, secure RESTful API integration, and complex systems like license management, ERP, and ZATCA-compliant invoicing. Passionate about clean code, performance optimization, and continuous learning, with hands-on experience using AI tools such as GitHub Copilot and Cursor.",
  },
  skills: [
    "HTML",
    "CSS",
    "Sass",
    "JavaScript",
    "TypeScript",
    "Swagger",
    "Postman",
    "TailwindCSS",
    "API Integration",
    "Material UI",
    "Responsive Design",
    "npm Libraries",
    "Azure",
    "Agile Methodology",
    "Problem Solving",
    "GitHub",
    "AI Technology",
  ],
  experience: [
    {
      id: "1",
      company: "MEITS TECH",
      location: "Maadi, Cairo",
      period: "12/2022 – Current",
      role: "React Developer",
      description: "React developer experienced in Amazon Pay projects in Saudi Arabia, managing APIs, and team tasks.",
      projects: [
        {
          name: "License Management System",
          description: "React 18 | TypeScript | Material UI | Swagger | OTP | REST APIs",
        },
        {
          name: "Tamweelak",
          description: "React 18 | TypeScript | Amazon Pay",
        },
        {
          name: "Beyotna",
          description: "Home services app",
        },
        {
          name: "FAWTARHA",
          description: "ZATCA-compliant E-Invoicing system",
        },
        {
          name: "Insonic",
          description: "AI-powered interview management dashboard",
        },
      ],
    },
    {
      id: "2",
      company: "WECANCITY",
      location: "Cairo",
      period: "2022",
      role: "Angular Developer",
      description: "Employee management system using Angular",
    },
    {
      id: "3",
      company: "AFAQ",
      location: "Giza",
      period: "8/2022 – 12/2022",
      role: "Front-End Developer",
      description: "Environmental dashboard for NEOM region (KSA)",
    },
    {
      id: "4",
      company: "MASSIVE ET",
      location: "Cairo",
      period: "2021 – 2022",
      role: "Front-End Developer",
      description: "Modified several projects using HTML, Sass, CSS, JS",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Information Systems",
      institution: "University",
      period: "2017 – 2021",
    },
    {
      id: "2",
      degree: "Front-End Web Development with Angular",
      institution: "Training Center",
      period: "2021",
    },
    {
      id: "3",
      degree: "Front-End Web Development with React 18",
      institution: "Cairo",
      period: "8/2021 – 12/2021",
    },
  ],
  contact: {
    phone: "01156981502",
    phone2: "01070641316",
    email: "ahmeedd396@gmail.com",
    location: "Cairo, Egypt",
    linkedin: "https://www.linkedin.com/in/ahmed-magdy-062a2b212/",
  },
}

export function getPortfolioData(): PortfolioData {
  if (typeof window !== "undefined") {
    const dataStr = localStorage.getItem("portfolioData")
    if (dataStr) {
      try {
        return JSON.parse(dataStr)
      } catch {
        return DEFAULT_DATA
      }
    }
  }
  return DEFAULT_DATA
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolioData", JSON.stringify(data))
  }
}

export function resetPortfolioData(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolioData", JSON.stringify(DEFAULT_DATA))
  }
}
