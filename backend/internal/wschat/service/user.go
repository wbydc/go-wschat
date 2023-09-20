package service

import (
	"github.com/wbydc/go-wschat/backend/internal/wschat/domain"
	"github.com/wbydc/go-wschat/backend/internal/wschat/repository"
)

type UserService interface {
	FindById(id domain.UserId) (*domain.User, error)
	FindByName(username string) (*domain.User, error)
}

type userService struct {
	userRepository repository.UserRepository
}

func (s *userService) FindById(id domain.UserId) (*domain.User, error) {
	return s.userRepository.FindById(id)
}

func (s *userService) FindByName(username string) (*domain.User, error) {
	return s.userRepository.FindByName(username)
}

func NewUserService(userRepository repository.UserRepository) UserService {
	return &userService{
		userRepository: userRepository,
	}
}
