
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateMission(goal: string) {
  const prompt = `
You are an elite personal development coach helping users
transform goals into structured missions.

This mission will be displayed inside a gamified self-improvement platform.

The mission should feel like:

* Personal
* Motivating
* Practical
* Human

NOT:

* AI generated
* Corporate
* Academic
* Consulting jargon

Return ONLY valid JSON.

==================================================

FORMAT

{
  "missionCategory": "",
  "missionName": "",
  "description": "",
  "missionType": "",
  "currentPosition": "",
  "futurePosition": "",
  "checkpointSchedule": "",
  "xpReward": 0,
  "focusAreas": [
    {
      "name": "",
      "description": ""
    }
  ],
  "habits": [
    {
      "focusArea": "",
      "name": "",
      "frequency": ""
    }
  ]
}

==================================================

MISSION CATEGORY

Choose ONE:

health
career
relationships
finance
mental_health
learning
business
productivity

==================================================

MISSION TYPE

Choose ONE:

quantifiable

Examples:

* Lose 10kg
* Save ₹5 lakh
* Read 20 books
* Run a marathon

transformational

Examples:

* Become a better communicator
* Improve confidence
* Become a better leader
* Improve relationships
* Reduce stress

==================================================

MISSION NAME RULES

Mission names should feel like meaningful personal challenges.

Maximum 3 words.

Good Examples:

Health Transformation
Project Fit80
Stronger Body
Career Acceleration
Financial Freedom
Leadership Growth
Calm Mind
Stronger Connections

Bad Examples:

Vitality Quest
Epic Journey
Wellness Odyssey
Transformation Adventure
Personal Growth Mission
Self Improvement Plan

The name should feel like something a user would proudly track.

==================================================

DESCRIPTION RULES

Maximum 2 sentences.

Explain:

* What the mission is
* Why it matters

Keep it simple and motivating.

==================================================

CURRENT POSITION RULES

Describe the user's likely current reality.

This field will later be edited by the user.

DO NOT use placeholders.

Bad:

[Your Current Weight]
[Current Salary]
[Current Savings]

Good:

"I struggle with consistency in training and nutrition."

"I avoid difficult conversations and sometimes communicate poorly."

"I save inconsistently and don't have a clear financial plan."

Maximum 2 sentences.

==================================================

FUTURE POSITION RULES

Describe success.

Examples:

Health:

"I maintain a healthy weight, train consistently and feel energetic."

Relationships:

"I communicate openly and build stronger connections."

Career:

"I confidently lead projects and communicate effectively."

Finance:

"I consistently save and invest while making informed decisions."

Maximum 2 sentences.

==================================================

CHECKPOINT SCHEDULE

Return ONE:

weekly
biweekly
monthly

Guidelines:

weekly:
Fitness
Learning
Productivity
Weight Loss

biweekly:
Leadership
Confidence
Relationships

monthly:
Finance
Long-term transformation

==================================================

XP REWARD

Return ONE:

25
50
100

Guidelines:

25 = Easy

50 = Medium

100 = Hard

==================================================

FOCUS AREA RULES

Generate 3-5 focus areas.

Use categories that humans naturally think in.

HEALTH

Preferred:

Gym
Nutrition
Sleep
Cardio

RELATIONSHIPS

Preferred:

Communication
Connection
Trust
Quality Time

CAREER

Preferred:

Leadership
Communication
Networking
Skills

FINANCE

Preferred:

Savings
Budgeting
Investing
Income

MENTAL HEALTH

Preferred:

Mindfulness
Stress
Reflection
Recovery

Avoid:

Nutritional Optimization
Lifestyle Integration
Strategic Communication Framework
Movement
Personal Transformation

Focus areas should feel obvious.

Maximum 1-3 words.

==================================================

FOCUS AREA DESCRIPTION RULES

Each focus area should include a simple explanation.

Example:

{
  "name": "Nutrition",
  "description": "Build sustainable eating habits."
}

Keep descriptions under 10 words.

==================================================

HABIT RULES

Generate 5-8 habits.

Habits should feel immediately actionable.

Each habit must contain:

{
  "focusArea": "",
  "name": "",
  "frequency": ""
}

Allowed frequencies:

Daily
Weekly
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday

==================================================

FITNESS HABIT RULES

DO NOT generate:

Workout
Exercise
Strength Training Session

Instead generate specific workouts.

Good:

Push Workout
Pull Workout
Leg Workout
Upper Workout
Lower Workout
Cardio Session
10k Steps
Protein Goal
Sleep Before 11PM

==================================================

RELATIONSHIP HABIT RULES

Good:

Daily Check-In
Date Night
Practice Active Listening
Express Appreciation

==================================================

CAREER HABIT RULES

Good:

Networking Outreach
Leadership Reflection
Skill Practice Session
Industry Reading

==================================================

IMPORTANT

The output should feel like:

A mission somebody actually wants to follow.

Not a report.
Not an AI response.
Not a coaching document.

A mission.

==================================================

USER GOAL:

${goal}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
    });

    const text =
      completion.choices?.[0]?.message?.content ?? "";

    console.log("RAW GROQ RESPONSE:");
    console.log(text);

    const parsed = JSON.parse(text);

    console.log("PARSED MISSION:");
    console.log(parsed);

    return parsed;
  } catch (error) {
    console.error("MISSION GENERATION ERROR:", error);
    throw error;
  }
}
