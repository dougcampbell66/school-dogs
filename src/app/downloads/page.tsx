'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

const lessonPlans = [
    {
        id: 1,
        title: "Emotional Awareness with Therapy Dogs",
        description: "Help students identify and express emotions through therapy dog interactions",
        grade: "K-5",
        duration: "30 minutes",
        file: "/lesson-plans/emotional-awareness-with-dogs.pdf"
    },
    {
        id: 2,
        title: "Building Empathy Through Animal Care",
        description: "Develop empathy skills by learning about therapy dog needs and feelings",
        grade: "3-8",
        duration: "45 minutes",
        file: "/lesson-plans/building-empathy-animal-care.pdf"
    },
    {
        id: 3,
        title: "Stress Management with Canine Companions",
        description: "Learn calming techniques and stress reduction through therapy dog activities",
        grade: "6-12",
        duration: "40 minutes",
        file: "/lesson-plans/stress-management-canine.pdf"
    }
]

export default function Downloads() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                    <div className="text-lg text-gray-600">Loading your lesson plans...</div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="px-4 py-20 mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Access Denied
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Please sign up first to access your free lesson plans.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 font-medium"
                    >
                        Back to Sign Up
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="px-4 py-20 mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Your Free SEL Lesson Plans
                    </h1>
                    <p className="text-lg text-gray-600">
                        Welcome {user.email}! Download your therapy dog lesson plans below.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessonPlans.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {plan.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {plan.description}
                            </p>
                            <div className="text-sm text-gray-500 mb-4">
                                <div>Grade: {plan.grade}</div>
                                <div>Duration: {plan.duration}</div>
                            </div>
                            <a
                                href={plan.file}
                                download
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium text-center block transition-colors duration-200 hover:shadow-lg"
                            >
                                📄 Download PDF
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Want More Lesson Plans?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Get access to our complete library of 50+ SEL lesson plans featuring therapy dogs,
                            including detailed facilitator guides, student worksheets, and assessment rubrics.
                        </p>
                        <button className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 font-medium">
                            Upgrade to Premium ($29/month)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}