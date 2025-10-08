"use client"

export function LaserFlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-laser-flow" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-laser-flow"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}
