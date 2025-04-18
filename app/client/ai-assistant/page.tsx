"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, User, Bot } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Legal Assistant. How can I help you with your legal questions today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // This would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Sample responses based on user input
      let response = ""
      const userInput = input.toLowerCase()

      if (userInput.includes("divorce") || userInput.includes("separation")) {
        response =
          "Divorce cases in India are governed by personal laws based on religion. For Hindus, Buddhists, Sikhs, and Jains, the Hindu Marriage Act applies. Muslims follow the Muslim Personal Law, and Christians follow the Indian Divorce Act. The process typically involves filing a petition, mediation, and court hearings. I recommend consulting with a Family Law specialist for personalized advice."
      } else if (userInput.includes("property") || userInput.includes("real estate")) {
        response =
          "Property disputes in India can involve title issues, boundary disputes, inheritance claims, or tenant-landlord conflicts. The Transfer of Property Act, Registration Act, and various state laws govern these matters. Documentation like sale deeds, property tax receipts, and land records are crucial. I recommend consulting with a Real Estate lawyer who can review your specific situation."
      } else if (userInput.includes("criminal") || userInput.includes("arrest")) {
        response =
          "Criminal cases in India follow the Code of Criminal Procedure. If you're facing charges, you have rights including the right to remain silent, right to legal representation, and protection against self-incrimination. The process involves investigation, charge sheet filing, trial, and judgment. I strongly recommend consulting with a Criminal Law specialist immediately."
      } else {
        response =
          "Thank you for your question. To provide accurate legal guidance, I would need more specific details about your situation. Legal matters are often complex and depend on jurisdiction, timing, and specific circumstances. Would you like me to connect you with a lawyer who specializes in this area?"
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Legal Assistant</h1>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Legal AI Chat</CardTitle>
          <CardDescription>Ask questions about legal matters and get AI-powered guidance</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                      <AvatarFallback>
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                      <AvatarImage
                        src={
                          message.role === "user"
                            ? "/placeholder.svg?height=32&width=32"
                            : "/placeholder.svg?height=32&width=32"
                        }
                      />
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.role === "user" ? "text-emerald-100" : "text-slate-500"}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <Input
                  placeholder="Type your legal question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
