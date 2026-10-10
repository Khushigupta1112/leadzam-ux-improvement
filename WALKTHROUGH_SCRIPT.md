# 3–5 Minute Screen Recording Walkthrough Script

**LeadZam UI/UX & Frontend Intern Assessment**  
**Candidate:** Khushi Gupta  
**Target Duration:** ~3.5 to 4.5 Minutes  

---

## 🎬 Screen Setup Checklist (Before Hitting Record)

Have these **3 tabs** open and ready in your browser:
1. **Tab 1:** GitHub repository displaying [`AUDIT.md`](https://github.com/Khushigupta1112/leadzam-ux-improvement/blob/main/AUDIT.md)
2. **Tab 2:** Your Figma file: [LeadZam — Conversion Rate Redesign](https://www.figma.com/design/7il97yoFswo4JPs2bArmow/LeadZam-%E2%80%94-Conversion-Rate-Redesign?node-id=2-3)
3. **Tab 3:** Live running prototype at [http://localhost:5173/](http://localhost:5173/)

---

## ⏱️ Section 1: Introduction & My Audit Findings (0:00 – 1:05)

**[Screen: Tab 1 — Scroll through `AUDIT.md` on GitHub]**

> *"Hi everyone, my name is Khushi Gupta. Today, I’m walking you through my UI/UX product audit, my Figma redesign, and my working React and TypeScript frontend prototype for LeadZam CRM.*
>
> *When auditing LeadZam, I evaluated the product as both a designer and a frontend engineer. I looked closely at account access safety, data accuracy, and how easy it is for an administrator to understand everyday workspace activity.*
>
> *I identified four key observations:*
>
> 1. *First, **Account Access Safety in Settings**: In `Password & Security`, when Google is the sole connected sign-in method and no password is set, the application displays an active 'Disconnect Google' action. Without defensive confirmation, this creates a potential risk of accidental account lockout.*
> 2. *Second, **The 0% Conversion Rate on Empty Workspaces**: On the Admin Dashboard, the conversion rate displays `0%` even when total leads and submissions are zero. Mathematically, zero divided by zero is undefined, and presenting this as 0% sends a false failure signal to new customers on Day 1.*
> 3. *Third, **Technical Strings in the Audit Log**: In workspace settings, the audit log exposes raw developer keys like `demo_data.loaded` and `auth.google_provisioned`, which increases cognitive load for non-technical sales managers.*
> 4. *And fourth, **Trial Messaging Consistency**: A minor discrepancy where the marketing navbar states 'Start Free Trial' while the hero CTA states 'Start 14-Day Free Trial.'*
>
> *I also reviewed the login page signup link, but intentionally did not classify it as an issue since dual entry points follow standard SaaS conventions."*

---

## ⏱️ Section 2: Why I Chose the Conversion Rate Problem (1:05 – 1:50)

**[Screen: Tab 1 — Point to Section 3: "Prioritization & Selection Rationale" in `AUDIT.md`]**

> *"Among these findings, I selected **Finding #2—the 0% Conversion Rate Paradox**—for deep redesign and implementation.*
>
> *Here is why:*
> - *While account disconnection is a potential backend edge-case, the conversion rate paradox directly impacts **100% of new users landing on LeadZam on Day 1**.*
> - *First impressions dictate trial-to-paid activation. When a new sales team logs in and sees a bold '0%', they assume their ads, webhooks, or forms have failed before they've even begun.*
> - *More importantly, it represents a huge **missed activation opportunity**. Instead of leaving an empty, confusing card, we can turn that metric into an actionable onboarding on-ramp that guides users to log their very first lead.*
>
> *This problem allowed me to demonstrate end-to-end product thinking, clean UI state management, and accessible frontend engineering."*

---

## ⏱️ Section 3: The Redesign in Figma (1:50 – 2:35)

**[Screen: Tab 2 — Switch to Figma file and zoom into the frames]**

> *"Here is how I designed the solution in Figma across five key frames:*
>
> **[Point to Frame 1: Workspace / No Leads]**  
> *- In the **No Leads** state, when Total Leads is zero, we replace the confusing 0% with an unavailable em dash `—` and the headline 'No data yet.' We add reassuring copy: 'Your conversion rate will appear once leads are added,' and introduce a primary blue CTA: `+ Add first lead` directly inside the card.*
>
> **[Point to Frame 2: Zero Conversions]**  
> *- In the **Zero Conversions** state—where leads actually exist in the pipeline (such as 12 leads), but none have converted yet—we show an authentic `0%`. Notice the transparent formula breakdown: `Won ÷ total leads`, `Won Leads: 0`, and the clear status 'No leads have converted yet.'*
>
> **[Point to Frames 3 & 4: Add Lead Modal Default & Validation Error]**  
> *- To support that CTA, I designed the **Add Lead Modal** in both its pristine default state, and a clear validation error state with a top warning banner—'Lead not saved. Complete the required fields below'—along with red borders and inline error text.*
>
> **[Point to Frame 5: Mobile View]**  
> *- Finally, in the **Mobile View** at 390px, KPI cards stack cleanly into single-column cards, and we feature a prominent top sticky action to maintain mobile conversion velocity."*

---

## ⏱️ Section 4: Live Frontend Prototype Demo (2:35 – 3:50)

**[Screen: Tab 3 — Switch to live browser at `http://localhost:5173/`]**

> *"Now, let's explore the working frontend prototype, built with React, strict TypeScript, Tailwind CSS, and Vite.*
>
> **[Action: Point out the Conversion Rate card]**  
> *"On initial load, the dashboard opens in our baseline **No Leads** state. Total Leads is zero, and Conversion Rate displays '—' with 'No data yet' and our 'Add first lead' button. Division by zero is completely guarded in our TypeScript logic.*
>
> **[Action: Click `+ Add first lead`]**  
> *"Clicking the button opens our accessible Add Lead dialog with autofocus and background scroll locking.*
>
> **[Action: Click `Save` with blank fields]**  
> *"If I attempt to submit without filling required fields, our validation lifecycle kicks in: The top warning banner appears, the inputs outline in red, and accessible inline error messages guide the user. It also strictly validates email format.*
>
> **[Action: Type `Alex Morgan` and `alex@leadzam.io`, then click `Save`]**  
> *"When I enter valid information and hit Save, the modal closes, a success toast confirms creation, Total Leads increments to 1, and look at the conversion card: It immediately transitions from 'No data yet' to a genuine '0%', with 'Won Leads: 0' and 'No leads have converted yet.'*
>
> **[Action: Point to Demo Controls at the top and click `2. Zero Conversions`]**  
> *"To make review effortless for your team, I built prototype controls at the top matching the 'Illustrative mock data' badge from Figma:*
> - *Clicking **Scenario 2** demonstrates our 12 leads baseline.*
> - *Clicking **+1 Won** immediately recalculates the conversion rate live—to 8.3%, 16.7%, and 25%—with zero division errors or layout shifts.*
>
> **[Action: Resize browser window or toggle mobile responsive emulator to ~390px]**  
> *"And resizing down to mobile width demonstrates our responsive design: single-column card stacking, touch-friendly tap targets, and the top mobile action matching our Figma mobile frame."*

---

## ⏱️ Section 5: AI Usage & Engineering Ownership (3:50 – 4:20)

**[Screen: Switch to GitHub README — AI Usage Notes section]**

> *"Finally, regarding my AI usage: I used ChatGPT during the initial exploration to help organize my audit observations, and Gemini/Antigravity to accelerate boilerplate scaffolding, TypeScript typing, and edge-case unit test matrices.*
>
> *However, I exercised strict critical engineering ownership:*
> - *When the AI suggested a generic browser alert for form errors, I **rejected it** and implemented custom accessible validation matching our exact Figma frames.*
> - *I personally verified keyboard navigation, focus trap behavior, and executed 7 automated unit tests to ensure our conversion formulas never produce `NaN` or `Infinity`.*
>
> *All code is committed with an incremental Git history on GitHub, with production builds passing cleanly.*
>
> *Thank you so much for reviewing my work, and I look forward to discussing this in the follow-up conversation!"*
