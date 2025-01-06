import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import CreateBook from './pages/createBook.jsx'
import DeleteBook from './pages/deleteBook.jsx'
import EditBook from './pages/editBook.jsx'
import ShowBook from './pages/showBook.jsx'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={<createBook />}/>
      <Route path='/books/details/:id' element={<showBook />}/>
      <Route path='/books/edit/:id' element={<editBook />}/>
      <Route path='/books/delete/:id' element={<deleteBook />}/>
    </Routes>
  )
}
