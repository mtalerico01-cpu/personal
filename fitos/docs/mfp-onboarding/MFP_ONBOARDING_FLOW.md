# MyFitnessPal Onboarding Flow — Full Documentation
> Observed: 2026-07-01 | Profile: Michael, 30, Male, US, Very Active, Gain Muscle + Increase Steps

---

## Flow Architecture

MFP's onboarding is a **linear multi-step wizard** with:
- A persistent **progress bar** at the top (fills across all steps)
- A centered **card UI** on a white background with a subtle dotted/graphic backdrop
- Consistent **BACK / NEXT** CTA pattern (BACK = outlined, NEXT = filled blue)
- **Per-goal branching**: after the goals screen, each selected goal gets its own sub-branch (options screen → affirmation screen), then merges back
- **Motivational affirmation screens** inserted after each goal sub-section (no user input — just copy + Next)
- Account creation happens **after all onboarding data is collected** (email/password is the last step)

---

## Step-by-Step Reference

### Step 01 — Name
- **URL**: `/account/create/input-name`
- **Headline**: "What's your first name?"
- **Subtext**: "We're happy you're here. Let's get to know a little about you."
- **Input**: Single text field — First Name
- **CTA**: BACK / NEXT

---

### Step 02 — Goals
- **URL**: `/account/create/goals`
- **Headline**: "Thanks [Name]! Now for your goals."
- **Subtext**: "Select up to 3 that are important to you, including one weight goal."
- **Input**: Multi-select button grid (max 3, requires ≥1 weight goal)
- **Options**:
  - Lose weight *(weight goal)*
  - Maintain weight *(weight goal)*
  - Gain weight *(weight goal)*
  - Gain muscle
  - Modify my diet
  - Manage stress
  - Increase step count
- **Branch logic**: Each selected goal generates a `/goals/[goal-slug]/options` + `/goals/[goal-slug]/affirmation` sub-step

---

### Step 03 — Goal Bridge (motivational)
- **URL**: `/account/create/goals/big-step`
- **Headline**: "Great! You've just taken a big step on your journey."
- **Body**: Dynamic copy referencing primary goal (e.g., muscle: "Nutrition is critical to help you build muscle. Track your food…")
- **Subtext**: "Now, let's talk about your goal to [next goal]."
- **Input**: None — informational only

---

### Step 04 — Gain Muscle: Sub-options
- **URL**: `/account/create/goals/gain-muscle/options`
- **Headline**: "What results do you want to achieve from gaining muscle?"
- **Subtext**: "Select all that apply."
- **Input**: Multi-select button list
- **Options**:
  - Tone up – you want visible muscles with as little mass as possible
  - Bulk up – you want large, well-defined muscles, with a low percentage of body fat
  - Get strong – you want to lift the maximum amount of weight and are not concerned with body fat or muscle definition

---

### Step 05 — Gain Muscle: Affirmation
- **URL**: `/account/create/goals/gain-muscle/affirmation`
- **Headline**: "Great, we can help you get the look you want."
- **Body**: "You can build your own workout routines and track your progress over time. We also recommend tracking your macronutrients to make sure you're getting enough protein."
- **Subtext**: "Now, let's talk about your goal to increase your step count."
- **Input**: None — informational only

---

### Step 06 — Increase Steps: Current Step Count
- **URL**: `/account/create/goals/increase-steps/options`
- **Headline**: "How many steps do you take per day now?"
- **Subtext**: "Select one."
- **Input**: Single-select button list
- **Options**:
  - Less than 1,000
  - 1,000 to 3,000
  - 3,000 to 7,000
  - More than 7,000
  - I don't know

---

### Step 07 — Increase Steps: Affirmation
- **URL**: `/account/create/goals/increase-steps/affirmation`
- **Headline**: Dynamic based on answer (e.g., "WOW! You're a mover and a shaker." for >7,000)
- **Body**: "Try one of our more challenging walking plans to help you reach your step goal."
- **Subtext**: "Let's get into the specifics so we can build your personalized plan."
- **Input**: None — informational only

---

### Step 08 — Activity Level
- **URL**: `/account/create/activity-level`
- **Headline**: "What is your baseline activity level?"
- **Subtext**: "Not including workouts–we count that separately"
- **Input**: Single-select with title + description format
- **Options** (default pre-selected: Not Very Active):
  - **Not Very Active** — Spend most of the day sitting (e.g., bank teller, desk job)
  - **Lightly Active** — Spend a good part of the day on your feet (e.g., teacher, salesperson)
  - **Active** — Spend a good part of the day doing some physical activity (e.g., food server, postal carrier)
  - **Very Active** — Spend a good part of the day doing heavy physical activity (e.g., bike messenger, carpenter)
- **Note**: Workouts are counted separately (important distinction from overall activity)

---

### Step 09 — Demographics Part 1
- **URL**: `/account/create/demographic-1`
- **Combined screen** — 3 sub-sections:

#### Sex
- **Headline**: "Please select which sex we should use to calculate your calorie needs."
- **Input**: Radio buttons — Male / Female
- **Helper link**: "Which one should I choose?" (expandable tooltip)

#### Date of Birth
- **Headline**: "When were you born?"
- **Input**: Date picker — MM / DD / YYYY spinners + calendar icon

#### Location
- **Headline**: "Where do you live?"
- **Input**: Country dropdown (pre-filled: United States) + Zip code text field

- **Footer note**: "We use this information to calculate an accurate calorie goal for you."

---

### Step 10 — Demographics Part 2 (Body Stats)
- **URL**: `/account/create/demographic-2`
- **Combined screen** — 3 sub-sections:

#### Height
- **Headline**: "How tall are you?"
- **Input**: Two text fields — Height (feet) + Height (inches) with ft/in labels
- **Toggle**: "Change units to centimeters" link

#### Current Weight
- **Headline**: "How much do you weigh?"
- **Subtext**: "It's OK to estimate. You can update this later."
- **Input**: Single text field — Current weight (lbs)
- **Toggle**: "Change units to kilograms/stone" link

#### Goal Weight
- **Headline**: "What's your goal weight?"
- **Subtext**: "Don't worry. This doesn't affect your daily calorie goal and you can always change it later."
- **Input**: Single text field — Goal weight (lbs)
- **Note**: Auto-populates to current weight when goal is "Gain muscle" (not "Gain/Lose weight")

---

### Step 11 — Account Creation (Wall)
- **URL**: `/account/create`
- **Headline**: "Almost there! Create your account."
- **Input**:
  - Email address text field
  - Password text field (show/hide toggle, 10+ chars, no spaces)
  - Terms & Conditions checkbox
- **CTAs**:
  - Continue (primary, blue)
  - Continue with Google (social SSO)
  - Continue with Facebook (social SSO)
- **Note**: "We will never post anything without your permission"
- **This is the account wall — all onboarding data collection happens BEFORE account creation**

### Step 12 — Username
- **URL**: `/account/create/username`
- **Headline**: "Create a username."
- **Input**: Single text field — pre-populated with email prefix
- **CTA changes**: "Next" → **"Finish"** (signals this is the final step)

---

### Step 13 — Plan Reveal / Congratulations
- **URL**: `/en/account/create/nutrition-goal?weightChangeGoal=gain_muscle`
- **Headline**: "Congratulations!"
- **Subtext**: "Your daily net calorie goal is:"
- **Display**: Large calorie number (**3,670**) — primary output of the entire onboarding
- **"calories" button**: Tappable — likely opens macro breakdown or edit modal
- **Expected outcome**: "With this plan, you should: Gain 0 lbs by September 9" — goal delta + projected date
- **Email opt-in**: Pre-checked checkbox for marketing emails
- **CTA**: "Explore MyFitnessPal" (single, full-width blue button)
- **Key insight**: Only **calories** shown here — macros are hidden until Goals page

---

### Step 14 — Dashboard (My Home)
- **URL**: `/` (after clicking "Explore MyFitnessPal")
- **Immediate action**: **Premium upsell modal fires on first login** (2-slide carousel)
  - Slide 1: `"With Premium, go from 'I think' to 'I know.'"` — crown icon, yellow CTA
  - Slide 2: Free vs Premium comparison table (Easier logging tools / Flexible macro goals / Smarter patterns / Priority support / Ad-free logging)
- **Dashboard layout**:
  - Large ad banner directly below nav
  - Streak counter ("1 Day Streak")
  - **Calories widget**: Ring showing remaining, formula `Remaining = Goal - Food + Exercise`, Base Goal + Food + Exercise breakdown
  - **Macros widget**: Blurred behind "Go Premium" paywall — **macros require Premium on dashboard**
  - Heart Healthy / Low Carb / Custom Summary widgets below

---

### Goals Page
- **URL**: `/account/my-goals`
- **Headline**: "Your Fitness Goals"
- **"View Guided Setup"** link — re-runs the wizard
- **Daily Nutrition Goals** table (with EDIT link):
  - Calories: 3,670
  - Carbohydrates: 459g — 50%
  - Fat: 122g — 30%
  - Protein: 184g — 20%
  - Custom Daily Goals: 🔒 Premium locked
- **Calories by Meal**: Breakfast / Lunch — 🔒 Premium locked
- **Key insight**: MFP uses a **50/30/20 default macro split** (carb-heavy) for muscle gain — not protein-optimized

---

### Food Diary
- **URL**: `/en/food/diary`
- **Date nav**: Day-by-day navigation with calendar picker
- **Meal sections**: Breakfast / Lunch / Dinner / Snacks — each with "Add Food | Quick Tools"
- **Column headers**: Calories / Carbs / Fat / Protein / **Sodium / Sugar** — broader micronutrient tracking by default
- **Large ad** above fold on free tier
- **Sub-nav**: Food Diary / Database / My Foods / My Meals / Recipes / Settings

---

## Key Design Observations

### Pattern: Goal-per-branch sub-flow
Each goal selected spawns 2 extra screens: an options screen (sub-goal detail) and an affirmation screen (emotional copy). This is a powerful engagement technique — each goal gets personalized validation.

### Pattern: Motivational micro-copy
Every affirmation screen uses **personalized, dynamic copy** that references the specific answer just given (e.g., "WOW! You're a mover and a shaker" for high step counts). This maintains momentum and emotional buy-in.

### Pattern: Activity vs. workouts separated
Activity level explicitly excludes workouts ("Not including workouts — we count that separately"). This is a key UX detail — cleaner BMR calculation.

### Pattern: Goal weight decoupled from calorie math
The goal weight screen explicitly says "This doesn't affect your daily calorie goal." MFP separates motivational tracking from actual calorie computation. Calorie goal is driven by current stats + activity level + rate preference.

### Pattern: Account wall at the END
All 10 data collection steps happen BEFORE the user creates an account. This reduces friction and maximizes conversion — users are invested before they have to commit credentials.

### Pattern: Combined demographic screens
Demographics are grouped intelligently into 2 combined screens (demographic-1: identity/location, demographic-2: body stats), reducing perceived step count.

### Pattern: Unit toggles everywhere
Height and weight both have immediate "Change units" links — non-intrusive, accessible without a separate settings screen.

### What MFP DOES NOT ask during onboarding:
- Experience level / training history
- Current workout routine or split preference
- Dietary restrictions or food preferences
- Meal frequency or timing
- Sleep / recovery / stress
- Coach preferences or communication style
- Any form of AI personalization

---

## Comparison: MFP vs. Form Theory

| Dimension | MFP | Form Theory |
|-----------|-----|-------------|
| Primary product | Calorie/macro tracker | AI fitness coach |
| Onboarding depth | Shallow (goals + body stats) | Deep (30+ steps) |
| Goal branching | Per-goal mini-flows | Aggregated in one goals step |
| Motivational copy | Heavy — affirmation screens after each sub-goal | Minimal |
| Activity vs. workouts | Separated explicitly | Combined in activity level |
| Account wall | After all data collection | N/A (social sign-in) |
| Workout/training config | Not asked in onboarding | Core part of onboarding |
| Diet preferences | Not asked in onboarding | Full dietary style + restriction flow |
| AI/coach config | Not present | Full coach preference section |
| Unit toggle | Inline links | Not yet implemented |
| Goal weight note | "Doesn't affect calorie goal" | Not shown |

---

## Actionable Insights for Form Theory

1. **Add per-goal affirmation screens** — After each goal selected, show a brief 1-screen motivational bridge with dynamic copy. High emotional impact, zero friction.

2. **Separate baseline activity from workouts** — Make it explicit that the activity level question excludes gym sessions. Add clarifying subtext.

3. **Move account creation to after onboarding** (if applicable) — MFP collects everything before asking for email/password. Reduces drop-off.

4. **Goal weight disclaimer** — Show "this doesn't affect your daily calorie goal" note when goal weight is collected. Reduces user confusion.

5. **Inline unit toggles** — Add ft/in ↔ cm and lbs ↔ kg toggle links directly on the body stats step rather than requiring settings.

6. **Consider goal sub-type questions** — MFP asks "what kind of muscle gain?" (tone/bulk/strength). This could map to Form Theory's training split selection.
