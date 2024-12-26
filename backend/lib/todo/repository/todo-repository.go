package repository

import (
	"github.com/keyglee/assessment/lib/todo/model"
	"gorm.io/gorm"
)

type TodoRepository struct {
	db *gorm.DB
}

func NewTodoRepository(db *gorm.DB) *TodoRepository {
	return &TodoRepository{db}
}

func (tr *TodoRepository) Search(search *model.TodoSearchParams) ([]*model.Todo, error) {
	var todos []*model.Todo
	query := tr.db.Model(&model.Todo{})
	if search.ID != nil {
		query = query.Where("id = ?", *search.ID)
	}
	if search.DisplayName != nil {
		query = query.Where("display_name = ?", *search.DisplayName)
	}
	if search.DueBy != nil {
		query = query.Where("due_by = ?", *search.DueBy)
	}

	result := query.Find(&todos)
	if result.Error != nil {
		return nil, result.Error
	}
	return todos, nil
}

func (tr *TodoRepository) GetByID(todoID uint) (*model.Todo, error) {
	var todo model.Todo
	result := tr.db.Where("id =?", todoID).First(&todo)
	if result.Error != nil {
		return nil, result.Error
	}

	return &todo, nil
}

func (tr *TodoRepository) Create(todo *model.Todo) error {
	result := tr.db.Create(&todo)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (tr *TodoRepository) Update(todo *model.Todo, update *model.UpdateTodo) error {
	result := tr.db.Model(&todo).Updates(update)

	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (tr *TodoRepository) Delete(todo *model.Todo) error {
	result := tr.db.Delete(todo)

	if result.Error != nil {
		return result.Error
	}
	return nil
}
