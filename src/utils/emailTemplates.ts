export const welcomeEmailTemplate = () => {
    return {
        subject: "Welcome to School Dogs - Your Free SEL Lesson Plans Are Ready!",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to School Dogs</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #1E40AF); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e5e5; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .lesson-card { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 15px; margin: 10px 0; }
        .lesson-title { color: #0369a1; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐕 Welcome to School Dogs!</h1>
            <p>Transform your classroom with therapy dog SEL activities</p>
        </div>
        
        <div class="content">
            <h2>Hi there, amazing educator!</h2>
            
            <p>Thank you for joining the School Dogs community! We're excited to help you bring the healing power of therapy dogs into your Social-Emotional Learning curriculum.</p>
            
            <p><strong>Your 3 FREE lesson plans are ready for download:</strong></p>
            
            <div class="lesson-card">
                <div class="lesson-title">🎯 Emotional Awareness with Therapy Dogs</div>
                <p>Perfect for K-5 students learning to identify and express emotions</p>
            </div>
            
            <div class="lesson-card">
                <div class="lesson-title">❤️ Building Empathy Through Animal Care</div>
                <p>Help grades 3-8 develop empathy by understanding therapy dog needs</p>
            </div>
            
            <div class="lesson-card">
                <div class="lesson-title">🧘 Stress Management with Canine Companions</div>
                <p>Teach grades 6-12 calming techniques through therapy dog interactions</p>
            </div>
            
            <div style="text-align: center;">
                <a href="https://schooldogs.com/downloads" class="button">Download Your Lesson Plans</a>
            </div>
            
            <h3>What's Next?</h3>
            <ul>
                <li>📚 Try one of these lessons with your students</li>
                <li>📝 Complete your teacher profile for personalized recommendations</li>
                <li>⭐ Consider upgrading to Premium for 50+ additional lesson plans</li>
                <li>📧 Reply to this email with questions or feedback</li>
            </ul>
            
            <p><strong>Need help getting started?</strong> Our lessons work great with real therapy dogs, but can also be adapted for stuffed animals or dog videos if live animals aren't available.</p>
            
            <p>We're here to support you every step of the way!</p>
            
            <p>Warmly,<br>
            The School Dogs Team</p>
        </div>
        
        <div class="footer">
            <p><small>
                You're receiving this because you signed up for free SEL lesson plans at schooldogs.com<br>
                <a href="#">Unsubscribe</a> | <a href="#">Contact Support</a>
            </small></p>
        </div>
    </div>
</body>
</html>
        `,
        text: `
Welcome to School Dogs!

Hi there, amazing educator!

Thank you for joining the School Dogs community! We're excited to help you bring the healing power of therapy dogs into your Social-Emotional Learning curriculum.

Your 3 FREE lesson plans are ready for download:

🎯 Emotional Awareness with Therapy Dogs (K-5)
❤️ Building Empathy Through Animal Care (3-8)  
🧘 Stress Management with Canine Companions (6-12)

Download them here: https://schooldogs.com/downloads

What's Next?
- Try one of these lessons with your students
- Complete your teacher profile for personalized recommendations
- Consider upgrading to Premium for 50+ additional lesson plans
- Reply to this email with questions or feedback

We're here to support you every step of the way!

Warmly,
The School Dogs Team
        `
    }
}

export const downloadReminderTemplate = () => {
    return {
        subject: "Don't Forget Your Free SEL Lesson Plans! 📚",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Lesson Plans Are Waiting</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .content { background: white; padding: 30px; border: 1px solid #e5e5e5; border-radius: 10px; }
        .button { display: inline-block; background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h2>🐕 Your Free Lesson Plans Are Still Waiting!</h2>
            
            <p>Hi there!</p>
            
            <p>We noticed you signed up for our free therapy dog SEL lesson plans but haven't downloaded them yet. Don't let these valuable resources go to waste!</p>
            
            <p><strong>Your 3 free lesson plans include:</strong></p>
            <ul>
                <li>Emotional Awareness with Therapy Dogs</li>
                <li>Building Empathy Through Animal Care</li>
                <li>Stress Management with Canine Companions</li>
            </ul>
            
            <div style="text-align: center;">
                <a href="https://schooldogs.com/downloads" class="button">Download Now</a>
            </div>
            
            <p>These lessons are perfect for bringing Social-Emotional Learning into your classroom in a fun, engaging way that students love.</p>
            
            <p>Questions? Just reply to this email - we're here to help!</p>
            
            <p>Best regards,<br>
            The School Dogs Team</p>
        </div>
    </div>
</body>
</html>
        `,
        text: `
Your Free Lesson Plans Are Still Waiting!

Hi there!

We noticed you signed up for our free therapy dog SEL lesson plans but haven't downloaded them yet. Don't let these valuable resources go to waste!

Your 3 free lesson plans include:
- Emotional Awareness with Therapy Dogs
- Building Empathy Through Animal Care  
- Stress Management with Canine Companions

Download them here: https://schooldogs.com/downloads

These lessons are perfect for bringing Social-Emotional Learning into your classroom in a fun, engaging way that students love.

Questions? Just reply to this email - we're here to help!

Best regards,
The School Dogs Team
        `
    }
}