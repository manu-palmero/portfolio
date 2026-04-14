# Portfolio Manu Palmero - SPEC.md

## 1. Project Overview

- **Project name**: portfolio-manu-palmero
- **Type**: Single Page Application (SPA) - Portfolio website
- **Core functionality**: Personal portfolio showcasing developer profile, projects, and contact information
- **Target users**: Recruiters, potential clients, fellow developers

## 2. UI/UX Specification

### Layout Structure

**Sections (top to bottom):**
1. **Navbar** - Fixed top navigation
2. **Hero** - Full viewport intro section
3. **About** - Bio and location
4. **Skills** - Tech stack visualization
5. **Projects** - GitHub repositories showcase
6. **Stats** - GitHub statistics
7. **Contact** - Social links
8. **Footer** - Copyright

**Responsive Breakpoints:**
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (two columns where applicable)
- Desktop: > 1024px (full layout)

### Visual Design

**Color Palette:**
- Background: `#0a0a0f` (deep dark)
- Surface: `#12121a` (card backgrounds)
- Primary: `#00d9ff` (cyan accent)
- Secondary: `#ff6b6b` (coral accent)
- Text Primary: `#e8e8e8`
- Text Secondary: `#888899`
- Border: `#2a2a3a`

**Typography:**
- Headings: "Outfit" (Google Fonts) - bold, modern geometric
- Body: "DM Sans" (Google Fonts) - clean readability
- Sizes: H1: 4rem, H2: 2.5rem, H3: 1.5rem, Body: 1rem

**Spacing System:**
- Section padding: 80px vertical
- Card padding: 24px
- Gap between elements: 16px standard

**Visual Effects:**
- Glassmorphism cards with subtle backdrop blur
- Gradient borders using primary/secondary colors
- Subtle glow effects on hover
- Smooth scroll behavior
- Entrance animations with stagger

### Components

1. **Navbar**
   - Logo/name on left
   - Navigation links (About, Skills, Projects, Contact)
   - Transparent with blur on scroll

2. **Hero Section**
   - Animated typing effect for tagline
   - Floating geometric shapes background
   - CTA button to projects

3. **About Card**
   - Avatar placeholder (gradient circle with initials)
   - Bio text
   - Location with icon
   - "Available for work" badge

4. **Skills Grid**
   - Technology badges with icons
   - Categories: Languages, Tools, Platforms

5. **Project Cards**
   - Title, description, language badge
   - Stars and forks count
   - Link to repo
   - Hover lift effect

6. **Stats Section**
   - Animated counters for: Repos, Stars, Followers
   - GitHub trophy reference

7. **Contact/Social**
   - GitHub, LinkedIn, Email links
   - Icon buttons with hover effects

## 3. Functionality Specification

### Core Features

- **Smooth scroll navigation**: Click nav links to scroll to sections
- **Responsive design**: Works on all device sizes
- **Static content**: All data hardcoded (no API calls)
- **Animations**: CSS-based entrance animations, hover effects

### User Interactions

- Navbar links → smooth scroll to section
- Project cards → hover shows elevated effect + click opens GitHub
- Social buttons → hover glow effect + click opens link in new tab

### Data (Static)

**Projects (from GitHub):**
1. Patch-Recovery (Python) - CI service for Samsung devices
2. dotfiles (Shell) - Config files
3. Tarea-git-programación, tarea-git, tareaGitRamas (learning exercises)

**Tech Stack:**
- Languages: Kotlin, Java, Python, Shell
- Tools: Git, Docker, VSCode
- Platforms: Android, Linux/Debian

## 4. Acceptance Criteria

- [ ] Page loads without errors
- [ ] All 7+ sections visible and properly styled
- [ ] Navigation scrolls smoothly to sections
- [ ] Responsive on mobile (< 768px)
- [ ] Animations play on page load
- [ ] External links open in new tabs
- [ ] All fonts load correctly
- [ ] No console errors