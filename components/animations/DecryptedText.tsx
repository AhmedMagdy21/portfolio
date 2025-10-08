"use client"

import { useEffect, useState } from "react"

interface DecryptedTextProps {
  text: string
  className?: string
  delay?: number
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export function DecryptedText({ text, className = "", delay = 0 }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsDecrypting(true)
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              if (char === " ") return " "
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join(""),
        )

        if (iteration >= text.length) {
          clearInterval(interval)
          setIsDecrypting(false)
        }

        iteration += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, delay])

  return <div className={className}>{displayText || text}</div>
}
