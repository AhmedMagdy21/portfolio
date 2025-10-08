export const cvData = {
  name: "Ahmed Magdy",
  contact: {
    phone: ["01156981502", "01070641316"],
    location: "Cairo, Egypt",
    email: "ahmeedd396@gmail.com",
    linkedin: "https://www.linkedin.com/in/ahmed-magdy-062a2b212/",
  },
  summary:
    "Front-End Developer specializing in modern, responsive web applications using React. Experienced in scalable UI development, secure RESTful API integration, and complex systems like license management, ERP, and ZATCA-compliant invoicing. Passionate about clean code, performance optimization, and continuous learning, with hands-on experience using AI tools such as GitHub Copilot and Cursor.",
  skills: [
    "HTML",
    "CSS",
    "Sass",
    "JS",
    "TypeScript",
    "Swagger",
    "Postman",
    "Tailwindcss",
    "API integration",
    "Material UI",
    "Responsive design",
    "npm Libraries",
    "Azure",
    "Agile methodology",
    "Problem solving",
    "GitHub",
    "AI Technology",
  ],
  experience: [
    {
      title: "FRONT-END DEVELOPER",
      company: "MEITS TECH",
      location: "MAADI, CAIRO",
      period: "12/2022 – CURRENT",
      description: "React developer experienced in Amazon Pay projects in Saudi Arabia, managing APIs, and team tasks.",
      projects: [
        {
          name: "License Management System",
          tech: "React 18 | TypeScript | Material UI | Swagger | OTP | REST APIs",
          description:
            "Developed a multi-step license workflow with document uploads and OTP-secured actions via SMS and email. Built reusable React components, integrated Swagger-based REST APIs for full CRUD operations, and applied Material UI for a fast, responsive.",
        },
        {
          name: "Tamweelak",
          tech: "React 18 | TypeScript | Material UI | Swagger | OTP | REST APIs | Amazon Pay",
          description:
            "Developed a responsive web platform offering financing and installment services for education, vehicles, rentals, and club memberships. Implemented Amazon Pay integration and applied Material UI for a consistent user experience across all devices.",
        },
        {
          name: "Beyotna",
          tech: "React | TypeScript",
          description:
            "It is an application that offers home services such as cleaning, and nursing through service providers who are registered on the website. They have a dashboard where they can manage their projects.",
        },
        {
          name: "FAWTARHA",
          tech: "React | QR Code Generation | Secure APIs",
          description:
            "E-Invoicing Platform (ZATCA-Compliant). Developed a cloud-based e-invoicing system compliant with Saudi ZATCA standards. Automated real-time QR code generation and invoice validation, built role-based dashboards for auditing, and implemented secure, encrypted API communication.",
        },
        {
          name: "Insonic",
          tech: "React | AI Integration | Multi-language",
          description:
            "Integrated admin dashboard application built with React, featuring AI-powered interview management and candidate analysis. The system includes modules for user, company, department, and customer management, with multi-language support (Arabic and English) and flexible role-based permissions. It also includes the Mawahibai AI system, which automatically generates interview questions, records sessions, and analyzes responses using AI.",
        },
      ],
    },
    {
      title: "FRONT-END DEVELOPER",
      company: "WECANCITY",
      location: "GIZA",
      period: "8/2022 – 12/2022",
      description: "Working on a project for employee management using Angular",
      projects: [],
    },
    {
      title: "FRONT-END DEVELOPER",
      company: "AFAQ",
      location: "GIZA",
      period: "6/2022 – 8/2022",
      description:
        "Creating an environmental dashboard using Angular for the NEOM region in the Kingdom of Saudi Arabia.",
      projects: [],
    },
    {
      title: "WEB DEVELOPER",
      company: "MASSIVE ET",
      location: "CAIRO",
      period: "8/2021 – 12/2021",
      description: "Modified several projects using traditional skills (html - Sass - Css - JS).",
      projects: [],
    },
  ],
  education: [
    {
      degree: "Bachelor of information systems",
      institution: "Elgazeera Academy",
      period: "",
    },
    {
      degree: "Front-end web development with angular",
      institution: "Route Academy",
      period: "",
    },
    {
      degree: "Front-end web development with React 18",
      institution: "Code with mosh",
      period: "Cairo, 8/2021 – 12/2021",
    },
  ],
}

export function generateCVText(): string {
  const cv = cvData
  let text = `${cv.name}\n`
  text += `Phone: ${cv.contact.phone.join(" | ")}\n`
  text += `Location: ${cv.contact.location}\n`
  text += `Email: ${cv.contact.email}\n`
  text += `LinkedIn: ${cv.contact.linkedin}\n\n`

  text += `SUMMARY\n`
  text += `${cv.summary}\n\n`

  text += `SKILLS\n`
  cv.skills.forEach((skill) => {
    text += `• ${skill}\n`
  })
  text += `\n`

  text += `EXPERIENCE\n`
  cv.experience.forEach((exp, index) => {
    text += `${index + 1}. ${exp.title}, ${exp.company} - ${exp.location} | ${exp.period}\n`
    text += `${exp.description}\n`
    if (exp.projects.length > 0) {
      text += `\nProjects:\n`
      exp.projects.forEach((project) => {
        text += `• ${project.name}\n`
        text += `  ${project.tech}\n`
        text += `  ${project.description}\n\n`
      })
    }
    text += `\n`
  })

  text += `EDUCATION\n`
  cv.education.forEach((edu) => {
    text += `• ${edu.degree} - ${edu.institution}`
    if (edu.period) text += ` | ${edu.period}`
    text += `\n`
  })

  return text
}

export function downloadCV() {
  const cvText = generateCVText()
  const blob = new Blob([cvText], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "Ahmed_Magdy_CV.txt"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
