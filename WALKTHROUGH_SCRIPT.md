# 3–5 Minute Screen Recording Walkthrough Script

Use this structured script when recording your screen for the LeadZam assessment submission (using Loom, OBS, or Windows Game Bar `Win + G`).

---

## Video Outline & Timing (Total: ~3.5 to 4 Minutes)

| Section | Target Time | Key Goal |
|---|---|---|
| **1. Introduction & Audit Findings** | 0:00 – 1:00 | Summarize LeadZam audit & show findings |
| **2. Selected Problem & Rationale** | 1:00 – 1:45 | Explain why the 0% conversion rate was picked |
| **3. Figma Redesign Walkthrough** | 1:45 – 2:30 | Show Figma frames (No Leads, Zero Conversions, Add Lead, Mobile) |
| **4. Live Working Prototype Demo** | 2:30 – 3:30 | Live interaction in browser (validation, adding lead, demo bar) |
| **5. Wrap-up & AI Reflection** | 3:30 – 4:00 | Briefly cover AI usage, ownership, and next steps |

---

## Word-for-Word Script

### 1. Introduction & Key Audit Findings (0:00 – 1:00)
> *"Hi everyone, I’m Khushi Gupta. Today I’m walking you through my UI/UX audit and working frontend implementation for LeadZam CRM."*
>
> *(Show `AUDIT.md` or Figma audit slide)*
>
> *"While auditing LeadZam, I focused on high-impact product friction rather than surface-level styling. I identified four core findings:*
> 1. *First, the **0% Conversion Rate Paradox**: when a workspace has 0 leads, the CRM displays a genuine 0% rate, communicating false failure before any leads are even collected.*
> 2. *Second, a **Disconnected Setup Flow**: setup checklist tasks navigate users away from the dashboard without inline shortcuts.*
> 3. *Third, **Weak Form Error Recovery**: lack of explicit warning banners and inline error messaging in lead creation dialogs.*
> 4. *And fourth, **Mobile Hierarchy**: action buttons and multi-column KPI grids squishing on smaller viewports."*

---

### 2. Why I Selected This Problem (1:00 – 1:45)
> *"I selected the **0% Conversion Rate Paradox** as my high-impact problem to solve because it sits right at the center of the Day 1 onboarding experience.*
>
> *Mathematically, conversion rate is Won Leads divided by Total Leads. When Total Leads is zero, that equation is undefined. Displaying 0% creates immediate user doubt: Did my ads fail? Did my form break?*
>
> *By redesigning this, we don't just fix a calculation error—we transform a passive dead end into an active onboarding ramp with an inline 'Add first lead' action."*

---

### 3. The Redesigned Experience in Figma (1:45 – 2:30)
> *(Show your Figma file or the images in `design-reference/`)*
>
> *"Here is the design solution I created in Figma:*
> - *In the **No Leads** state, the rate is shown as unavailable with a dash `—` and the label 'No data yet', accompanied by reassuring copy and a primary blue `+ Add first lead` button.*
> - *In the **Zero Conversions** state—where leads actually exist but none have been won yet—we show an authentic `0%`, with transparent formula context: `Won ÷ total leads` and `Won Leads: 0`.*
> - *For the **Add Lead** interaction, I designed both the default pristine state and a robust validation error state with a top alert banner and inline field errors.*
> - *Finally, I created a **Mobile View** at 390px showing single-column stacked cards and a prominent top mobile CTA."*

---

### 4. Working Frontend Implementation (2:30 – 3:30)
> *(Switch to browser at `http://localhost:5173/`)*
>
> *"Now let's jump into the live React + TypeScript prototype.*
>
> *(Click `+ Add first lead` in the KPI card)*  
> *"When we click 'Add first lead', notice the accessible dialog opens. If I attempt to submit empty required fields..."*  
> *(Click Save to show validation)*  
> *"...the top banner alert appears, inputs highlight in red, and accessible inline error messages guide the user.*
>
> *(Fill in `Alex Morgan`, `alex@example.com` and click Save)*  
> *"When I submit valid data, the modal closes, a toast confirms creation, Total Leads updates to 1, and the conversion rate seamlessly changes from 'No data yet' to 0% with 'Won Leads: 0'.*
>
> *(Show Demo Controls bar at top)*  
> *"To make review effortless, I built prototype controls matching the 'Illustrative mock data' indicator from the Figma design. Reviewers can instantly switch to Scenario 2 to verify the 12 leads / 0 won baseline, or click '+1 Won' to see the rate recalculate in real-time to 8.3%, 16.7%, and 25% with zero division errors.*
>
> *(Toggle browser to mobile width)*  
> *"And resizing the viewport shows the responsive single-column layout matching the mobile Figma frame."*

---

### 5. Wrap-up & AI Usage (3:30 – 4:00)
> *"For AI usage: I used AI to accelerate boilerplate scaffolding, strict TypeScript typing, and edge-case test suites. However, I personally inspected every Figma pixel, rewrote the validation error flow to strictly match our Figma designs rather than generic browser alerts, and verified all 7 unit test assertions.*
>
> *Thank you, and I look forward to discussing this in the follow-up conversation!"*
