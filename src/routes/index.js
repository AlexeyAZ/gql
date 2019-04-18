import React from 'react'
import { AllUsers, User, CreateUser, LoginUser } from '../containers'

import { Redirect } from '../components/index'

const routes = [
  {
    path: '/',
    title: 'Пользователи',
    render: props => <Redirect to="/login" />,
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
