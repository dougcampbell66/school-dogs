'use client'

import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                })
                if (error) {
                    setMessage('Error: ' + error.message)
                } else {
                    setMessage('Success! Check your email to confirm your account.')
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                })
                if (error) {
                    setMessage('Error: ' + error.message)
                } else {
                    window.location.href = '/dashboard'
                }
            }
        } catch {
            setMessage('Something went wrong. Please try again.')
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="px-4 py-20 mx-auto max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isSignUp ? 'Join thousands of teachers using SEL lesson plans' : 'Sign in to access your lesson plans'}
                        </p>
                    </div>

                    {message && (
                        <div className={`mb-4 p-3 rounded border ${
                            message.includes('Error') 
                                ? 'bg-red-100 border-red-400 text-red-700' 
                                : 'bg-green-100 border-green-400 text-green-700'
                        }`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@school.edu"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled={isLoading}
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
                        >
                            {isLoading 
                                ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                                : (isSignUp ? 'Create Account' : 'Sign In')
                            }
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                                setMessage('')
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                            {isSignUp 
                                ? 'Already have an account? Sign in' 
                                : "Don't have an account? Sign up"
                            }
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <button onClick={() => window.location.href = '/'} className="text-gray-600 hover:text-gray-700 text-sm">
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}