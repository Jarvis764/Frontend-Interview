## Styling Requirements

The application is styled using **Tailwind CSS** with a scalable, theme-driven design system.

### Styling Framework
- Tailwind CSS is used as the primary styling framework
- Utility-first approach for consistent and maintainable styles
- `tailwindcss-animate` plugin is used for smooth UI animations

### Theme & Design System
- Centralized color system using CSS variables (`hsl(var(--*))`) for easy theming
- Semantic color tokens are defined for:
  - primary, secondary, accent
  - muted, destructive
  - background, foreground, card, popover
- Custom category-based colors are supported (finance, career, tech, skills, regulations)
- Global border radius values are controlled via CSS variables for visual consistency

### Typography
- Default font stack uses **Inter** with system font fallbacks
- Font family is configured globally through Tailwind theme extension

### Layout & Responsiveness
- Responsive container layout with centered content
- Consistent horizontal padding across screen sizes
- Optimized layout for large screens with a max width of `1400px` on 2XL displays
- Fully responsive design across desktop and smaller viewports

### Animations & Interactions
- Custom animations implemented for:
  - Accordion open/close transitions
  - Loading shimmer effects
- Smooth, lightweight animations using Tailwind keyframes

### Dark Mode Support
- Dark mode is supported using a **class-based strategy**
- Theme can be toggled without modifying component styles

### Reusability & Maintainability
- Styling is component-driven and reusable
- No inline styles; all styles are managed via Tailwind utility classes
- Design tokens allow easy future theme updates
