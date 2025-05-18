import { useEffect } from "react";
import Router from "./Router";
export default function App() {
  // Enable Dark Mode
  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
  
  return (
    <Router />
  )
}
