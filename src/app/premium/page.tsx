'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

const premiumFeatures = [
    "50+ Complete SEL Lesson Plans",
    "Detailed Facilitator Guides",
    "Student Worksheets & Activities",
    "Assessment Rubrics",
    "Video Training Materials",
    "Monthly New Content Updates",
    "Email Support from SEL Experts",
    "Printable Resources",
    "Classroom Management Tips",
    "Parent Communication Templates"
]

const additionalLessonPlans = [
    "Conflict Resolution with Canine Mediators",
    "Building Self-Confidence Through Dog Training",
    "Communication Skills with Therapy Animals",
    "Responsibility and Pet Care Ethics",
    "Grief and Loss Support with Comfort Dogs",
    "Anger Management Through Animal Interaction",
    "Social Skills Development in Group Settings",
    "Mindfulness and Meditation with Dogs"
]

export default function Premium() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [subscribing, setSubscribing] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser()
    }, [])

    const handleSubscribe = async () => {
        if (!user) {
            window.location.href = '/login'
            return
        }

        setSubscribing(true)
        // Simulate subscription process
        setTimeout(() => {
            alert('Subscription feature coming soon! Contact support@schooldogs.com for early access.')
            setSubscribing(false)
        }, 2000)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="px-4 py-20 mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Upgrade to Premium
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get unlimited access to our complete library of therapy dog SEL lesson plans, 
                        plus exclusive resources and ongoing support.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="max-w-lg mx-auto mb-16">
                    <div className="bg-white rounded-lg shadow-xl p-8 border-4 border-blue-600">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Premium Access</h2>
                            <div className="text-5xl font-bold text-blue-600 mb-2">$29</div>
                            <div className="text-gray-600 mb-6">per month</div>
                            <button 
                                onClick={handleSubscribe}
                                disabled={subscribing}
                                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 font-bold text-lg disabled:opacity-50"
                            >
                                {subscribing ? 'Processing...' : 'Start Premium Today'}
                            </button>
                            <p className="text-sm text-gray-500 mt-4">Cancel anytime • 30-day money-back guarantee</p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
                        <div className="space-y-4">
                            {premiumFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Lesson Plans</h3>
                        <div className="space-y-3">
                            {additionalLessonPlans.map((lesson, index) => (
                                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                                    <span className="text-gray-800 font-medium">{lesson}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">What Teachers Say</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-center">
                            <p className="text-gray-600 italic mb-4">
                                &ldquo;These lesson plans have transformed my classroom! My students are more engaged 
                                and emotionally aware than ever before.&rdquo;
                            </p>
                            <div className="font-bold text-gray-900">- Sarah M., 3rd Grade Teacher</div>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600 italic mb-4">
                                &ldquo;The therapy dog activities help my special needs students open up and 
                                connect in ways I never thought possible.&rdquo;
                            </p>
                            <div className="font-bold text-gray-900">- Michael R., Special Education Teacher</div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h4 className="font-bold text-gray-900 mb-2">Do I need actual therapy dogs to use these lessons?</h4>
                            <p className="text-gray-600">While real therapy dogs enhance the experience, many activities can be adapted for stuffed animals, dog videos, or visiting therapy dogs.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h4 className="font-bold text-gray-900 mb-2">Are these lessons aligned with educational standards?</h4>
                            <p className="text-gray-600">Yes! All lessons are designed to meet CASEL SEL standards and can be integrated with Common Core requirements.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h4 className="font-bold text-gray-900 mb-2">Can I cancel my subscription anytime?</h4>
                            <p className="text-gray-600">Absolutely! Cancel anytime with no fees. We also offer a 30-day money-back guarantee.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}