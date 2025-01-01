"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { PlusCircle, Check, X } from "lucide-react"

interface TaskCreatorProps {

  onTaskCreate: (task: string, dueDate: string) => void

  onTaskEdit?: (task: string, dueDate: string) => void


  initialTask: string


  initialDueDate?: string


  onCancel?: () => void
}

export function TaskCreator({
  onTaskCreate,
  onTaskEdit,
  initialTask,
  initialDueDate = "",
  onCancel,
}: TaskCreatorProps) {
  const [taskText, setTaskText] = useState(initialTask)
  const [dueDate, setDueDate] = useState(initialDueDate)


  const dateInputRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    setTaskText(initialTask)
    setDueDate(initialDueDate)
  }, [initialTask, initialDueDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTask = taskText.trim()

    if (!trimmedTask) return

    if (onTaskEdit) {

      onTaskEdit(trimmedTask, dueDate)
    } else {

      onTaskCreate(trimmedTask, dueDate)

      setTaskText("")
      setDueDate("")
    }
  }
  const openDatePicker = () => {
    if (!dateInputRef.current) return
    if (typeof dateInputRef.current.showPicker === "function") {
      dateInputRef.current.showPicker()
    } else {
      dateInputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder={onTaskEdit ? "Edit task" : "Enter a new task"}
          className="flex-grow"
        />
        <Button
          type="submit"
          size="icon"
          className="text-primary bg-primary/10 hover:bg-primary/20"
        >
          {onTaskEdit ? (
            <Check className="h-4 w-4" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )}
        </Button>
        {onTaskEdit && onCancel && (
          <Button
            type="button"
            size="icon"
            className="text-destructive bg-destructive/10 hover:bg-destructive/20"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        className="w-full cursor-pointer"
        onClick={() => openDatePicker()}
      >
        <Input
          ref={dateInputRef}
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full"
        />
      </div>
    </form>
  )
}
