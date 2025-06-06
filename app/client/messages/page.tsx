"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageTransition } from "@/components/animations/page-transition"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Send, User, Video, Phone, MoreVertical, Search } from "lucide-react"

// Sample data for lawyers
const SAMPLE_LAWYERS = [
  {
    id: "1",
    name: "Adv. Priya Sharma",
    specialization: "Family Law",
    lastMessage: "I'll review the documents and get back to you tomorrow.",
    time: "10:30 AM",
    unread: 2,
    online: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Adv. Rajesh Kumar",
    specialization: "Criminal Law",
    lastMessage: "The hearing is scheduled for next Monday at 11 AM.",
    time: "Yesterday",
    unread: 0,
    online: false,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Adv. Ananya Patel",
    specialization: "Corporate Law",
    lastMessage: "I've sent you the draft agreement. Please review it.",
    time: "Yesterday",
    unread: 1,
    online: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Adv. Vikram Singh",
    specialization: "Real Estate",
    lastMessage: "We need to discuss the property documents.",
    time: "2 days ago",
    unread: 0,
    online: false,
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Sample messages for a conversation
const SAMPLE_MESSAGES = [
  {
    id: "1",
    sender: "lawyer",
    content: "Hello! How can I help you with your case today?",
    time: "10:00 AM",
  },
  {
    id: "2",
    sender: "client",
    content: "Hi, I need help with my divorce proceedings. Can you guide me through the process?",
    time: "10:05 AM",
  },
  {
    id: "3",
    sender: "lawyer",
    content:
      "Of course. Divorce cases in India are governed by personal laws based on religion. For Hindus, the Hindu Marriage Act applies. The process typically involves filing a petition, mediation, and court hearings.",
    time: "10:10 AM",
  },
  {
    id: "4",
    sender: "lawyer",
    content: "Could you provide me with some basic details about your marriage and the grounds for divorce?",
    time: "10:12 AM",
  },
  {
    id: "5",
    sender: "client",
    content:
      "We've been married for 5 years and have been living separately for the last year. We're looking for a mutual consent divorce.",
    time: "10:15 AM",
  },
  {
    id: "6",
    sender: "lawyer",
    content:
      "Thank you for the information. For a mutual consent divorce, both parties need to agree to the divorce and its terms. The process is generally faster and less complicated.",
    time: "10:20 AM",
  },
  {
    id: "7",
    sender: "lawyer",
    content:
      "We'll need to prepare a joint petition, which will include details about your marriage, reasons for separation, and terms of settlement including alimony, child custody (if applicable), and property division.",
    time: "10:22 AM",
  },
  {
    id: "8",
    sender: "client",
    content: "What documents will I need to provide?",
    time: "10:25 AM",
  },
  {
    id: "9",
    sender: "lawyer",
    content:
      "You'll need your marriage certificate, address proof, income proof, photographs, and any other relevant documents like property papers if there's property involved.",
    time: "10:28 AM",
  },
  {
    id: "10",
    sender: "lawyer",
    content: "I'll review the documents and get back to you tomorrow.",
    time: "10:30 AM",
  },
]

export default function ClientMessages() {
  const [activeTab, setActiveTab] = useState("chat")
  const [selectedLawyer, setSelectedLawyer] = useState(SAMPLE_LAWYERS[0])
  const [messages, setMessages] = useState(SAMPLE_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [isInCall, setIsInCall] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedLawyer])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: (messages.length + 1).toString(),
      sender: "client",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleStartCall = () => {
    setIsInCall(true)
    setActiveTab("video")
  }

  const handleEndCall = () => {
    setIsInCall(false)
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <MotionWrapper type="slideDown" className="mb-8">
          <h1 className="text-3xl font-bold">Messages</h1>
        </MotionWrapper>

        <AnimatedCard className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[700px]">
            {/* Contacts Sidebar */}
            <div className="border-r border-slate-200 md:col-span-1">
              <div className="p-4 border-b border-slate-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder="Search conversations..." className="pl-9 bg-slate-50 border-slate-200" />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(700px-73px)]">
                {SAMPLE_LAWYERS.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                      selectedLawyer.id === lawyer.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedLawyer(lawyer)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={lawyer.image} alt={lawyer.name} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        {lawyer.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm truncate">{lawyer.name}</h3>
                          <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{lawyer.time}</span>
                        </div>
                        <p className="text-xs text-slate-500">{lawyer.specialization}</p>
                        <p className="text-xs truncate mt-1">{lawyer.lastMessage}</p>
                      </div>
                      {lawyer.unread > 0 && (
                        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {lawyer.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat/Video Area */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedLawyer.image} alt={selectedLawyer.name} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedLawyer.name}</h3>
                    <p className="text-xs text-slate-500">
                      {selectedLawyer.online ? "Online" : "Offline"} • {selectedLawyer.specialization}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={handleStartCall}
                    disabled={isInCall}
                  >
                    <Phone className="h-5 w-5 text-slate-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={handleStartCall}
                    disabled={isInCall}
                  >
                    <Video className="h-5 w-5 text-slate-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-5 w-5 text-slate-600" />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="video">Video Call</TabsTrigger>
                </TabsList>

                {/* Chat Content */}
                <TabsContent value="chat" className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "client" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "client" ? "text-blue-100" : "text-slate-500"
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-slate-200">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <AnimatedButton
                        type="submit"
                        size="icon"
                        disabled={!newMessage.trim()}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="h-4 w-4" />
                      </AnimatedButton>
                    </form>
                  </div>
                </TabsContent>

                {/* Video Call Content */}
                <TabsContent value="video" className="flex-1 flex flex-col">
                  <div className="flex-1 bg-slate-900 relative flex items-center justify-center">
                    {isInCall ? (
                      <>
                        <div className="text-white text-center">
                          <p className="text-xl mb-2">Connected with {selectedLawyer.name}</p>
                          <p className="text-sm text-slate-400">Call duration: 00:05:32</p>
                        </div>
                        <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-800 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-blue-900 flex items-center justify-center">
                            <User className="h-8 w-8 text-white opacity-50" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                          >
                            <Video className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                          >
                            <Phone className="h-5 w-5" />
                          </Button>
                          <Button variant="destructive" size="icon" className="rounded-full" onClick={handleEndCall}>
                            <Phone className="h-5 w-5 rotate-135" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-white text-center">
                        <p className="text-xl mb-4">Start a video call with {selectedLawyer.name}</p>
                        <AnimatedButton onClick={handleStartCall} className="bg-blue-500 hover:bg-blue-600">
                          <Video className="h-5 w-5 mr-2" />
                          Start Video Call
                        </AnimatedButton>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </PageTransition>
  )
}
