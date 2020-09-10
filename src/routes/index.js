import React from 'react'
import { AllUsers, User, CreateUser, LoginUser, CreateNote, Notes } from '../containers'
import { Redirect } from '../components/index'

import { ROUTE_ALL_NOTES } from '../constants'

const routes = [
  {
    path: '/',
    title: 'Пользователи',
    render: () => <Redirect to="/login" />,
    exact: true,
    private: false,
  },
  {
    path: '/users',
    title: 'Пользователи',
    component: AllUsers,
    exact: true,
    private: true,
    key: 'users',
  },
  {
    path: '/users/:id',
    title: 'Пользователи',
    component: AllUsers,
    exact: true,
    private: true,
  },
  {
    path: '/user/',
    title: 'Пользователи',
    component: User,
    exact: true,
    private: true,
    key: 'user',
  },
  {
    path: '/create-user',
    title: 'Создать пользователя',
    component: CreateUser,
    exact: true,
    private: false,
  },
  {
    path: '/create-note',
    title: 'Создать заметку',
    component: CreateNote,
    exact: true,
    private: true,
  },
  {
    path: '/notes',
    component: () => <Redirect to={`/notes/${ROUTE_ALL_NOTES}`} />,
    title: 'Все заметки',
    exact: true,
    private: true,
  },
  {
    path: '/notes/:id',
    title: 'Заметка',
    component: Notes,
    exact: true,
    private: true,
  },
  {
    path: '/login',
    title: 'Авторизация',
    component: LoginUser,
    exact: true,
    private: false,
  },
]

export default routes
