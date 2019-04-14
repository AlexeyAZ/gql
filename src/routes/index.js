import React from 'react'
import { Redirect } from 'react-router-dom'
import { AllUsers, User, CreateUser, LoginUser } from '../containers/'

const routes = [
  {
    path: '/',
    title: 'Пользователи',
    render: () => <Redirect to="/users" />,
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
    path: '/login',
    title: 'Авторизация',
    component: LoginUser,
    exact: true,
    private: false,
  },
]

export default routes
