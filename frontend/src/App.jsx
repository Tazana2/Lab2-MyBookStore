import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import BookPage from "./pages/BookPage"
import AboutPage from "./pages/AboutPage"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {

  return (
  <div className="min-h-dvh font-sans flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
