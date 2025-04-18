"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type Message = {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  sender?: {
    full_name: string
  }
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState<any>(null)
  const [supportAgent, setSupportAgent] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        const { data: userData } = await supabase
          .from("legalsathi_users")
          .select("*")
          .eq("id", data.session.user.id)
          .single()
        setUser(userData)

        // Get support agent (admin)
        const { data: adminData } = await supabase
          .from("legalsathi_users")
          .select("*")
          .eq("role", "admin")
          .limit(1)
          .single()
        setSupportAgent(adminData || { id: "support", full_name: "Support Team" })
      }
    }

    checkUser()
  }, [supabase])

  useEffect(() => {
    if (user && supportAgent) {
      // Fetch messages
      const fetchMessages = async () => {
        const { data, error } = await supabase
          .from("legalsathi_messages")
          .select(
            `
            *,
            sender:sender_id(full_name)
          `,
          )
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .or(`sender_id.eq.${supportAgent.id},receiver_id.eq.${supportAgent.id}`)
          .order("created_at", { ascending: true })

        if (error) {
          console.error("Error fetching messages:", error)
          return
        }

        setMessages(data || [])
      }

      fetchMessages()

      // Subscribe to new messages
      const channel = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "legalsathi_messages",
            filter: `sender_id=eq.${user.id},receiver_id=eq.${supportAgent.id}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message])
          },
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "legalsathi_messages",
            filter: `sender_id=eq.${supportAgent.id},receiver_id=eq.${user.id}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message])
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [user, supportAgent, supabase])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user || !supportAgent) return

    try {
      const { error } = await supabase.from("legalsathi_messages").insert({
        sender_id: user.id,
        receiver_id: supportAgent.id,
        content: message,
      })

      if (error) {
        console.error("Error sending message:", error)
        return
      }

      setMessage("")
    } catch (error) {
      console.error("Error in handleSendMessage:", error)
    }
  }

  if (!user) return null

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col h-96 border border-sky-100">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Live Support</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender_id === user.id ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender_id === user.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender_id === user.id ? "text-primary-foreground/70" : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : (
        <Button
          className="bg-primary hover:bg-primary/90 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
