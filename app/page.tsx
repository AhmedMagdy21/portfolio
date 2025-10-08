import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Skills } from "@/components/Skills"
import { Experience } from "@/components/Experience"
import { Education } from "@/components/Education"
import { Footer } from "@/components/Footer"
import { LogoLoop } from "@/components/animations/LogoLoop"
import { ProjectsCounter } from "@/components/ProjectsCounter"

export default function Home() {
  const companyLogos = [
    "MEITS TECH",
    "WECANCITY",
    "AFAQ",
    "MASSIVE ET",
    "React",
    "TypeScript",
    "Next.js",
    "TailwindCSS",
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <LogoLoop logos={companyLogos} />
      <Experience />
      <Education />
      <div id="projects" className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Projects</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
      <ProjectsCounter />
      <Footer />
    </main>
  )
}
