# LeadZam — UI/UX Product Audit

**Practical Assessment:** LeadZam Product Audit & Improvement  
**Candidate:** Khushi Gupta  
**Role:** UI/UX & Frontend Intern Assessment  
**Date:** 10 October 2026  

---

## 1. Objective

The aim of this audit is to identify areas where LeadZam can make everyday tasks safer, clearer, and easier for its users. 

I reviewed key areas across the public marketing website, authentication flows, account settings, and the authenticated dashboard. My focus was on friction points that affect **account access safety**, the **accuracy of metrics users see on Day 1**, and an administrator's ability to **understand workspace activity**.

The following prioritized findings are based on real observations and evidence collected during the product review.

---

## 2. Key Findings and Priorities

### Finding 1 — Protect Users from Losing Account Access
* **Location:** `Settings → Password & Security → Sign-in methods`
* **Priority:** **High impact** *(Requires interaction & safety validation)*
* **What I Observed:**  
  Google OAuth is connected as the active sign-in method, while the password section explicitly indicates that no password has been set. An actionable **“Disconnect Google”** button is visible.
* **Why It Matters:**  
  If a user disconnects Google when no alternative password or secondary authentication method exists, they risk immediate account lockout. In a SaaS platform where sales leads and client communication must remain accessible, an accidental lockout disrupts daily operations and creates high-friction, avoidable support tickets.
* **Recommended Improvement:**  
  Introduce defensive interaction friction: If Google is the sole authentication method, disable the disconnect action and prompt the user to configure a password first. Require explicit confirmation with explanatory microcopy before disconnecting primary OAuth providers.
* **Evidence:** Settings screenshot showing Google connected, no password set, and the disconnect action visible.

---

### Finding 2 — Make Conversion Metrics Meaningful When There Is No Data *(Selected for Redesign)*
* **Location:** `Admin Dashboard → Conversion Rate KPI`
* **Priority:** **High / Core Product Impact** *(Selected for Deep Redesign & Frontend Implementation)*
* **What I Observed:**  
  On initial entry, the dashboard displays a **`0%` conversion rate**, even though Total Leads and Form Submissions are both zero. The formula shown is `Won ÷ total leads`.
* **Why It Matters:**  
  When Total Leads is zero, calculating Won Leads divided by Total Leads results in an undefined division-by-zero ($0 \div 0$). Displaying a literal `0%` is mathematically inaccurate and sends a false negative signal on Day 1—making new users feel their campaigns or forms are failing when data simply hasn't started flowing yet.
* **Recommended Improvement:**  
  Differentiate between **"No data yet"** and **"Zero conversions"**:
  1. **When Total Leads = 0:** Render an unavailable em dash **`—`** with the headline **`No data yet`**, reassuring copy (*“Your conversion rate will appear once leads are added”*), and a primary inline action: **`+ Add first lead`**.
  2. **When Total Leads > 0 and Won Leads = 0:** Display an authentic **`0%`** with formula transparency (`Won ÷ total leads`, `Won Leads: 0`, *“No leads have converted yet”*).
  3. **When Leads Convert:** Dynamically calculate the accurate percentage with division-by-zero guards.
* **Evidence:** Dashboard screenshot showing 0 Total Leads, 1 Active Form, 0 Submissions, and a misleading 0% conversion rate.

---

### Finding 3 — Make Audit Log Events Human-Readable
* **Location:** `Settings → Audit Log → Action column`
* **Priority:** **Medium**
* **What I Observed:**  
  The Action column in the workspace audit log exposes technical backend event identifiers such as `demo_data.loaded` and `auth.google_provisioned`.
* **Why It Matters:**  
  LeadZam is used by sales managers and telecalling team leads, not just software engineers. Technical system strings increase cognitive load, making it harder for administrators to quickly review team activity, monitor security, or audit pipeline modifications.
* **Recommended Improvement:**  
  Translate system identifiers into clear, human-readable labels (e.g., *“Demo data loaded”*, *“Google account provisioned”*). Retain the raw technical identifier in an expandable detail/metadata drawer for technical troubleshooting.
* **Evidence:** Audit Log screenshot displaying raw database event keys in the Action column.

---

### Finding 4 (Observation) — Keep Trial Messaging Consistent Across Marketing Touchpoints
* **Location:** Marketing Homepage (`leadzam.com`) — Header vs. Hero Section
* **Priority:** **Low / Copy Polish**
* **What I Observed:**  
  The top navigation header displays **“Start Free Trial”**, while the primary hero button displays **“Start 14-Day Free Trial”**.
* **Why It Matters:**  
  While both buttons lead into the same onboarding funnel, inconsistent trial length messaging can introduce momentary hesitation regarding trial terms and commitments.
* **Recommended Improvement:**  
  Standardize copy across primary conversion touchpoints to consistently state the trial duration (*“Start 14-Day Free Trial”*).
* **Observation Note:** The login page also displays a sign-up link. I kept this as an observation rather than an issue because its presence alone does not indicate that new users face registration friction.

---

## 3. Prioritization & Selection Rationale

### Why Finding 2 Was Selected for Redesign & Implementation:
While Finding 1 addresses a potential authentication edge-case that requires backend policy rules, **Finding 2 directly impacts the core product experience for 100% of new users on Day 1**.

1. **Center of Executive Experience:** The Admin Dashboard KPI summary is the first screen every business owner and sales manager lands on after signup.
2. **Eliminates False Failure Anxiety:** Greeting users with 0% damages trust in data integrity before they have even sent their first campaign.
3. **High Leverage for Activation:** By replacing an empty card with a contextual `+ Add first lead` action and an accessible modal dialog, we convert passive confusion into immediate platform activation.
4. **Feasibility & Craftsmanship:** It provided the ideal canvas to demonstrate UX architecture, mathematical edge-case handling, accessible modal design, and responsive frontend implementation in React + TypeScript.

---

## 4. AI Usage Notes & Critical Reflection

* **Tools Used:** ChatGPT (for initial audit structuring) and Gemini / Antigravity (for code implementation and test verification).
* **Assistance Provided:** Helped organize observations logically, structure recommendations, and scaffold component types.
* **Critical Decision & Change:** When reviewing the login and signup flows, I rejected classifying the signup link on the login page as a usability flaw because standard SaaS convention supports dual entry points. I only retained findings backed by clear evidence.
* **Personal Verification:** Every finding was verified against live screenshots and product flows. The frontend implementation was manually tested across desktop and mobile (~390px) to verify responsive behavior, keyboard support, and edge-case calculation safety.
