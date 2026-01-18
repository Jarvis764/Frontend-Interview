## Styling Requirements

The application is styled using **Tailwind CSS** with a theme-driven and component-based design approach.

### Styling Framework
- Tailwind CSS is used as the primary styling framework
- Utility-first styling combined with reusable component classes
- Global styles are organized using Tailwind’s `@layer` system
- `tailwindcss-animate` plugin is used for lightweight UI animations

### Theme & Design System
- A centralized design system is implemented using **CSS variables**
- Semantic color tokens are defined for:
  - background, foreground
  - primary, secondary, accent
  - muted, destructive
  - card, popover, border, input, ring
- Category-specific color tokens are supported:
  - finance, career, tech, skills, regulations
- Border radius is controlled globally using CSS variables for consistency

### Typography
- **Inter** font is used as the primary typeface via Google Fonts
- Font configuration is applied globally through Tailwind
- Clean typographic hierarchy for headings, paragraphs, and lists

### Layout & Responsiveness
- Responsive container layout with centered content
- Consistent spacing and padding across screen sizes
- Layout optimized for large screens with a max width of 1400px on 2XL displays
- Fully responsive design for desktop and smaller viewports

### Dark Mode Support
- Dark mode is configured using Tailwind’s **class-based strategy**
- Light and dark color schemes are defined using CSS variables
- The project is structured to support dark mode theming if enabled in the future

### Reusable UI Patterns
- Reusable utility
