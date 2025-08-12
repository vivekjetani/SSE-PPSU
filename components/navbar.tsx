"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { getCurrentUser, signOut, getUserData } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      // Get additional user data from Firestore
      const { data: userData } = await getUserData(currentUser.uid)
      setUser({ ...currentUser, ...userData })
    } else {
      setUser(null)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
    router.push("/")
  }

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/ppsu logo.png" alt="PPSU Logo" className="h-8 w-auto" />
              <span className="font-bold text-xl">SSE</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:bg-red-700 px-3 py-2 rounded-md">
              Home
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="hover:bg-red-700 px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin" className="hover:bg-red-700 px-3 py-2 rounded-md">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.displayName || user.name}</span>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:bg-red-700">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="ghost" className="text-white hover:bg-red-700">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button variant="default" className="bg-white text-red-600 hover:bg-gray-200">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-red-700 p-2 rounded-md">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block hover:bg-red-700 px-3 py-2 rounded-md">
                Home
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="block hover:bg-red-700 px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin" className="block hover:bg-red-700 px-3 py-2 rounded-md">
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm">{user.displayName || user.name}</span>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:bg-red-700">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>

                </>
              ) : null}
              {user === null && (
                <>
                  <Link href="/login" className="block hover:bg-red-700 px-3 py-2 rounded-md">Login</Link>
                  <Link href="/signup" className="block hover:bg-red-700 px-3 py-2 rounded-md">Sign Up</Link>
                </>
              )}



            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
