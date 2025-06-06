'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { analytics } from '../utils/analytics'

export default function Home() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        analytics.trackPageView('home')
    }, [])

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        // Validation
        if (!email.trim()) {
            setMessage('Please enter your email address.')
            setIsLoading(false)
            return
        }

        if (!validateEmail(email)) {
            setMessage('Please enter a valid email address.')
            setIsLoading(false)
            return
        }

        try {
            // Check if user already exists
            const { data: existingUser } = await supabase.auth.signInWithPassword({
                email: email,
                password: 'dummy-password'
            })

            // If no error on dummy login, user exists
            if (!existingUser) {
                // Create user account with Supabase Auth
                const { error: authError } = await supabase.auth.signUp({
                    email: email,
                    password: Math.random().toString(36).slice(-8), // Generate random password
                    options: {
                        data: {
                            email_confirmed: true // Auto-confirm for free lesson plans
                        }
                    }
                })

                if (authError) {
                    if (authError.message.includes('already registered')) {
                        setMessage('This email is already registered. Please use the login page or try a different email.')
                    } else {
                        setMessage('Error: ' + authError.message)
                    }
                } else {
                    setMessage('Success! Redirecting to your lesson plans...')
                    setEmail('')
                    // Redirect to downloads page after successful signup
                    setTimeout(() => {
                        window.location.href = '/downloads'
                    }, 2000)
                }
            }
            //Transcript fix
             } catch (err: unknown) {
            if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string' &&
                err.message.includes('Invalid login credentials')) {
                // User doesn't exist, proceed with signup
                try {
                    const { error: authError } = await supabase.auth.signUp({
                        email: email,
                        password: Math.random().toString(36).slice(-8),
                        options: {
                            data: {
                                email_confirmed: true
                            }
                        }
                    })

                    if (authError) {
                        if (authError.message.includes('already registered')) {
                            setMessage('This email is already registered. Please use the login page.')
                        } else {
                            setMessage('Error: ' + authError.message)
                        }
                    } else {
                        analytics.trackSignup(email)
                        setMessage('Success! Redirecting to your lesson plans...')
                        setEmail('')
                        setTimeout(() => {
                            window.location.href = '/downloads'
                        }, 2000)
                    }
                } catch {
                    setMessage('Something went wrong during signup. Please try again.')
                }
            } else {
                setMessage('Something went wrong. Please try again.')
            }
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <section className="px-4 py-20 mx-auto max-w-7xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        SEL Lesson Plans with
                        <span className="text-blue-600"> Therapy Dogs</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
                        Transform your classroom with engaging Social-Emotional Learning activities
                        designed specifically for K-12 teachers using therapy dogs.
                    </p>

                    {/* Email Signup Form */}
                    <div className="mt-10 max-w-md mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Get 3 Free Lesson Plans</h2>
                            <p className="text-gray-600 mb-4">
                                Download professionally designed SEL activities for your classroom.
                            </p>

                            {message && (
                                <div className={`mb-4 p-3 rounded border ${
                                    message.includes('Error') || message.includes('already registered')
                                        ? 'bg-red-100 border-red-400 text-red-700'
                                        : message.includes('Success')
                                        ? 'bg-green-100 border-green-400 text-green-700'
                                        : 'bg-blue-100 border-blue-400 text-blue-700'
                                }`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@school.edu"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
                                >
                                    {isLoading ? 'Getting Your Lesson Plans...' : 'Get Free Lesson Plans'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}