import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const quotes = [
  "The secret of getting ahead is getting started. - Mark Twain",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The future depends on what you do today. - Mahatma Gandhi",
]

export default function InspirationQuote() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <p className="italic text-muted-foreground">{quote}</p>
        </div>
      </CardContent>
    </Card>
  )
}

