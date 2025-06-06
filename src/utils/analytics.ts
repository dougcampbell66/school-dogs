// Simple analytics tracking utility
// In production, you'd integrate with Google Analytics, Mixpanel, etc.

interface AnalyticsEvent {
    event: string
    properties?: Record<string, unknown>
    userId?: string
}

class Analytics {
    private isProduction = process.env.NODE_ENV === 'production'
    
    track(event: string, properties?: Record<string, unknown>, userId?: string) {
        const eventData: AnalyticsEvent = {
            event,
            properties: {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                ...properties
            },
            userId
        }

        // Log to console in development
        if (!this.isProduction) {
            console.log('📊 Analytics Event:', eventData)
        }

        // In production, you would send to your analytics service
        if (this.isProduction) {
            // Example: Send to your analytics endpoint
            // fetch('/api/analytics', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(eventData)
            // })
        }

        // Store locally for later sync if needed
        this.storeLocalEvent(eventData)
    }

    private storeLocalEvent(event: AnalyticsEvent) {
        try {
            const stored = localStorage.getItem('analytics_events')
            const events = stored ? JSON.parse(stored) : []
            events.push(event)
            
            // Keep only last 100 events to prevent storage bloat
            if (events.length > 100) {
                events.splice(0, events.length - 100)
            }
            
            localStorage.setItem('analytics_events', JSON.stringify(events))
        } catch (error) {
            console.warn('Failed to store analytics event locally:', error)
        }
    }

    // User events
    trackSignup(email: string) {
        this.track('user_signup', { email })
    }

    trackLogin(email: string) {
        this.track('user_login', { email })
    }

    trackDownload(fileName: string, userId?: string) {
        this.track('lesson_plan_download', { fileName }, userId)
    }

    trackPageView(page: string, userId?: string) {
        this.track('page_view', { page }, userId)
    }

    trackPremiumClick(userId?: string) {
        this.track('premium_upgrade_click', {}, userId)
    }

    trackProfileUpdate(userId?: string) {
        this.track('profile_update', {}, userId)
    }

    // Get stored events (for debugging or manual sync)
    getStoredEvents(): AnalyticsEvent[] {
        try {
            const stored = localStorage.getItem('analytics_events')
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    }

    // Clear stored events
    clearStoredEvents() {
        try {
            localStorage.removeItem('analytics_events')
        } catch (error) {
            console.warn('Failed to clear stored events:', error)
        }
    }
}

export const analytics = new Analytics()