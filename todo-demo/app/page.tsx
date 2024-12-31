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
  Moon 
} from "lucide-react"
import { NavigationBar } from "@/components/navigationBar/navigationBar"
import { TaskCreator } from "@/components/taskCreator/taskCreator"

interface Todo {
  id: number
  display_name: string
  due_by?: string      
}

export default function RealtorDashboard() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const taskListRef = useRef<HTMLDivElement>(null)

  const [darkMode, setDarkMode] = useState(false)


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
      setTodos(res.data)
    } catch (err) {
      console.error("Error fetching todos:", err)
    }
  }


  const addTask = async (newTask: string) => {
    try {
      const res = await axios.post<Todo>("http://localhost:4000/todos", {
        display_name: newTask,
      })
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

  const editTask = (index: number, editedTask: string) => {
    const targetTodo = todos[index]
    if (!targetTodo) return
  
    updateTodo(targetTodo.id, editedTask)
  
    setEditingIndex(null)
    setEditingTask(null)
  }

  const scrollToBottom = () => {
    if (taskListRef.current) {
      taskListRef.current.scrollTop = taskListRef.current.scrollHeight
    }
  }

  const updateTodo = async (todoId: number, updatedName: string) => {
    try {
      const res = await axios.put<Todo>(`http://localhost:4000/todos/${todoId}`, {
        display_name: updatedName,
      })
  

      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todoId ? res.data : t))
      )
    } catch (err) {
      console.error("Error updating todo:", err)
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
              <p className="text-sm">
                Here you could show more data, or remove this entirely.
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-primary/20 transition-colors duration-300">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                You have {todos.length} tasks from the server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={taskListRef} className="space-y-4 h-[300px] overflow-y-auto pr-2">
                {todos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between p-2 rounded ${
                      editingIndex === index ? "bg-primary/10" : ""
                    } transition-colors duration-300`}
                  >
                    <p className="text-sm flex-grow">{todo.display_name}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:bg-primary/10 transition-colors duration-300"
                        onClick={() => {
                          setEditingIndex(index)
                          setEditingTask(todo.display_name)
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
                ))}
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
              onTaskCreate={addTask}
              onTaskEdit={
                editingTask !== null
                  ? (editedTask) => editTask(editingIndex!, editedTask)
                  : undefined
              }
              initialTask={editingTask || ""}
              onCancel={() => {
                setEditingIndex(null)
                setEditingTask(null)
              }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
