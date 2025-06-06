'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Header() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <button onClick={() => window.location.href = '/'} className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">School Dogs</span>
                        </button>
                    </div>

                    <nav className="flex items-center space-x-6">
                        {loading ? (
                            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
                        ) : user ? (
                            <>
                                <a 
                                    href="/downloads" 
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    My Downloads
                                </a>
                                <a 
                                    href="/dashboard" 
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Dashboard
                                </a>
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-600">
                                        {user.email}
                                    </span>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => window.location.href = '/'}
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Sign Up
                                </button>
                                <a 
                                    href="/login" 
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                                >
                                    Login
                                </a>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}