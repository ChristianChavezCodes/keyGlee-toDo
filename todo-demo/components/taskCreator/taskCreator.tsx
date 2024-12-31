import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { PlusCircle, Check, X } from 'lucide-react'

interface TaskCreatorProps {
  onTaskCreate: (task: string) => void
  onTaskEdit?: (task: string) => void
  initialTask: string
  onCancel?: () => void
}

export function TaskCreator({ onTaskCreate, onTaskEdit, initialTask, onCancel }: TaskCreatorProps) {
  const [task, setTask] = useState(initialTask)

  useEffect(() => {
    setTask(initialTask)
  }, [initialTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      if (onTaskEdit) {
        onTaskEdit(task.trim())
      } else {
        onTaskCreate(task.trim())
        setTask('') 
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={onTaskEdit ? "Edit task" : "Enter a new task"}
        className="flex-grow"
      />
      <Button type="submit" size="icon" className="text-primary bg-primary/10 hover:bg-primary/20">
        {onTaskEdit ? <Check className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
      </Button>
      {onTaskEdit && (
        <Button type="button" size="icon" className="text-destructive bg-destructive/10 hover:bg-destructive/20" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </form>
  )
}

