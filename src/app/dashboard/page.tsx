'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        school_name: '',
        grade_level: '',
        subject_area: '',
        experience_level: ''
    })

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                await loadProfile(user.id)
            }
            setLoading(false)
        }
        getUser()
    }, [])

    const loadProfile = async (userId) => {
        const { data } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single()
        
        if (data) {
            setProfile(data)
            setFormData(data)
        }
    }

    const saveProfile = async () => {
        const profileData = {
            user_id: user.id,
            email: user.email,
            ...formData,
            updated_at: new Date().toISOString()
        }

        const { error } = await supabase
            .from('user_profiles')
            .upsert(profileData)

        if (!error) {
            setProfile(profileData)
            setEditing(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="px-4 py-20 mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Please Sign In</h1>
                    <button onClick={() => window.location.href = '/'} className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 font-medium">
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="px-4 py-20 mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Teacher Dashboard</h1>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Profile Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                                <button 
                                    onClick={() => setEditing(!editing)}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                >
                                    {editing ? 'Cancel' : 'Edit'}
                                </button>
                            </div>

                            {editing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            value={user.email} 
                                            disabled 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.school_name} 
                                            onChange={(e) => setFormData({...formData, school_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                                        <select 
                                            value={formData.grade_level} 
                                            onChange={(e) => setFormData({...formData, grade_level: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Grade Level</option>
                                            <option value="K-2">K-2</option>
                                            <option value="3-5">3-5</option>
                                            <option value="6-8">6-8</option>
                                            <option value="9-12">9-12</option>
                                            <option value="Mixed">Mixed Grades</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject Area</label>
                                        <input 
                                            type="text" 
                                            value={formData.subject_area} 
                                            onChange={(e) => setFormData({...formData, subject_area: e.target.value})}
                                            placeholder="e.g., Special Education, Counseling, General Education"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience with SEL</label>
                                        <select 
                                            value={formData.experience_level} 
                                            onChange={(e) => setFormData({...formData, experience_level: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Experience Level</option>
                                            <option value="Beginner">New to SEL</option>
                                            <option value="Intermediate">Some SEL Experience</option>
                                            <option value="Advanced">Experienced with SEL</option>
                                        </select>
                                    </div>
                                    <button 
                                        onClick={saveProfile}
                                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div><strong>Email:</strong> {user.email}</div>
                                    <div><strong>School:</strong> {profile?.school_name || 'Not provided'}</div>
                                    <div><strong>Grade Level:</strong> {profile?.grade_level || 'Not provided'}</div>
                                    <div><strong>Subject Area:</strong> {profile?.subject_area || 'Not provided'}</div>
                                    <div><strong>SEL Experience:</strong> {profile?.experience_level || 'Not provided'}</div>
                                </div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Activity</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">3</div>
                                    <div className="text-gray-600">Free Downloads</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">0</div>
                                    <div className="text-gray-600">Premium Downloads</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <a 
                                    href="/downloads" 
                                    className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center"
                                >
                                    View Downloads
                                </a>
                                <button className="block w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                                    Upgrade to Premium
                                </button>
                                <button className="block w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                                    Contact Support
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                                    Sign up complete
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                                    Download free lesson plans
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                                    Complete profile (optional)
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                                    Try a lesson with students
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}