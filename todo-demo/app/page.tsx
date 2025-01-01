"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"
import { Button } from "@/components/ui/button/button"
import { Progress } from "@/components/ui/progress/progress"
import {
  Calendar,
  Home,
  Users,
  DollarSign,
  PlusCircle,
  Bell,
  MessageSquare,
  Pencil,
  Trash2,
  Sun,
  Moon,
} from "lucide-react"
import { NavigationBar } from "@/components/navigationBar/navigationBar"
import { TaskCreator } from "@/components/taskCreator/taskCreator"

interface Todo {
  id: number
  display_name: string
  due_by?: string | null
}

export default function RealtorDashboard() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editingDueDate, setEditingDueDate] = useState<string | null>(null)

  const [darkMode, setDarkMode] = useState(false)
  const taskListRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    fetchTodos()
  }, [])


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])


  const fetchTodos = async () => {
    try {
      const res = await axios.get<Todo[]>("http://localhost:4000/todos")
      console.log("Fetched todos:", res.data)
      setTodos(res.data)
    } catch (err) {
      console.error("Error fetching todos:", err)
    }
  }


  const addTask = async (newTask: string, dueDate: string) => {
    try {
      let dueBy: string | null = null
      if (dueDate) {

        const midday = `${dueDate}T12:00:00Z`
        dueBy = new Date(midday).toISOString()
      }

      const payload = {
        display_name: newTask,
        due_by: dueBy,
      }
      console.log("Creating new task with payload:", payload)

      const res = await axios.post<Todo>("http://localhost:4000/todos", payload)
      console.log("Created todo:", res.data)

      setTodos((prev) => [...prev, res.data])
      setTimeout(scrollToBottom, 0)
    } catch (err) {
      console.error("Error creating todo:", err)
    }
  }


  const deleteTodo = async (todoId: number) => {
    try {
      await axios.delete(`http://localhost:4000/todos/${todoId}`)
      setTodos((prev) => prev.filter((t) => t.id !== todoId))
    } catch (err) {
      console.error("Error deleting todo:", err)
    }
  }


  const updateTodo = async (todoId: number, updatedName: string, updatedDueDate: string) => {
    try {

      const payload: any = {
        display_name: updatedName,
        due_by: updatedDueDate ? new Date(updatedDueDate).toISOString() : null,
      }
      console.log("Updating todo:", todoId, "with payload:", payload)

      const res = await axios.put<Todo>(`http://localhost:4000/todos/${todoId}`, payload)
      setTodos((prevTodos) => prevTodos.map((t) => (t.id === todoId ? res.data : t)))
    } catch (err) {
      console.error("Error updating todo:", err)
    }
  }


  const editTask = (index: number, editedTask: string, editedDueDate: string) => {
    const targetTodo = todos[index]
    if (!targetTodo) return

    updateTodo(targetTodo.id, editedTask, editedDueDate)
    setEditingIndex(null)
    setEditingTask(null)
    setEditingDueDate(null)
  }


  const scrollToBottom = () => {
    if (taskListRef.current) {
      taskListRef.current.scrollTop = taskListRef.current.scrollHeight
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">

      <header className="bg-background shadow-md transition-colors duration-300">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            <div className="flex items-center">
              <Image
                src="https://static.wixstatic.com/media/b1862a_35fbcec63649428480d78371e08d8972~mv2.png/v1/fill/w_168,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/keygleelogo_2x.png"
                alt="Keyglee Logo"
                width={168}
                height={40}
                className="h-8 w-auto"
              />
            </div>


            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/10"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Realtor" />
                <AvatarFallback>KG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>


      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Listings</CardTitle>
              <Home className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-foreground/70">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-foreground/70">+4 new this week</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Upcoming Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">7</div>
              <p className="text-xs text-foreground/70">Next: Today at 2 PM</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$24,500</div>
              <p className="text-xs text-foreground/70">+15% from last month</p>
            </CardContent>
          </Card>
        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="col-span-4 border-primary/20 transition-colors duration-300">
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { address: "123 Main St", price: "$350,000", progress: 75 },
                  { address: "456 Elm St", price: "$275,000", progress: 40 },
                  { address: "789 Oak Ave", price: "$425,000", progress: 60 },
                ].map((listing, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full">
                      <p className="text-sm font-medium">{listing.address}</p>
                      <p className="text-sm text-muted-foreground">{listing.price}</p>
                      <Progress value={listing.progress} className="mt-2 bg-secondary/20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


          <Card className="col-span-3 border-primary/20 transition-colors duration-300">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>You have {todos.length} tasks from the server</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={taskListRef} className="space-y-4 h-[300px] overflow-y-auto pr-2">
                {todos.map((todo, index) => {
       
                  const isZeroDate = todo.due_by === "0001-01-01T00:00:00Z"
                  const displayDate = !todo.due_by || isZeroDate
                    ? null
                    : `Due by: ${new Date(todo.due_by).toLocaleDateString()}`

                  return (
                    <div
                      key={todo.id}
                      className={`flex flex-col p-2 rounded mb-1 ${
                        editingIndex === index ? "bg-primary/10" : ""
                      } transition-colors duration-300`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <p className="text-sm flex-grow">{todo.display_name}</p>
                        <div className="flex items-center space-x-2 ml-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary hover:bg-primary/10 transition-colors duration-300"
                            onClick={() => {
                              setEditingIndex(index)
                              setEditingTask(todo.display_name)
                              setEditingDueDate(todo.due_by ?? "")
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 transition-colors duration-300"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-xs text-foreground/70 mt-1">
                        {displayDate}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-primary/20 transition-colors duration-300">
          <CardHeader>
            <CardTitle>
              {editingTask !== null ? "Editing Task" : "Create New Task"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCreator
              onTaskCreate={(taskName, dueDate) => addTask(taskName, dueDate)}
              onTaskEdit={
                editingTask !== null
                  ? (editedTaskName, editedDueDate) =>
                      editTask(editingIndex!, editedTaskName, editedDueDate)
                  : undefined
              }
              initialTask={editingTask || ""}
              initialDueDate={editingDueDate || ""}
              onCancel={() => {
                setEditingIndex(null)
                setEditingTask(null)
                setEditingDueDate(null)
              }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
