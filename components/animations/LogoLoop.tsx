"use client"

interface LogoLoopProps {
  logos: string[]
}

export function LogoLoop({ logos }: LogoLoopProps) {
  return (
    <div className="w-full overflow-hidden py-12 bg-muted/30">
      <div className="flex animate-scroll">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-8 text-2xl font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  )
}
