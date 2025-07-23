# Portfolio Website Color Theme

This document outlines the recommended color palette for your portfolio website, derived from the visual style of the provided PDF. Each color includes its hexadecimal code and a suggested CSS variable name for consistent implementation.

## Color Palette

| Category              | Description                                                                           | Hex Code  | CSS Variable               |
| --------------------- | ------------------------------------------------------------------------------------- | --------- | -------------------------- |
| **Primary**           | Main accent color, used for buttons, links, key UI elements.                          | `#00BCD4` | `--color-primary`          |
| **Secondary**         | Complementary accent, used for secondary actions, highlights.                         | `#FFC107` | `--color-secondary`        |
| **Background Light**  | Main background color for sections and pages in light theme.                          | `#FFFFFF` | `--color-bg-light`         |
| **Background Subtle** | Used for cards, subtle section breaks, or hover states in light theme.                | `#F5F5F5` | `--color-bg-subtle`        |
| **Text Dark**         | Primary text color for headings and body copy in light theme.                         | `#212121` | `--color-text-dark`        |
| **Text Muted**        | Secondary text color, for descriptions, captions, less prominent text in light theme. | `#757575` | `--color-text-muted`       |
| **Success/Info**      | Used for success messages, positive indicators.                                       | `#8BC34A` | `--color-success`          |
| **Error/Danger**      | Used for error messages, warnings, destructive actions.                               | `#F44336` | `--color-error`            |
| **Border/Divider**    | For subtle borders, lines, and separators.                                            | `#E0E0E0` | `--color-border`           |
| **Background Dark**   | Main background color for sections and pages in dark theme.                           | `#1A202C` | `--color-bg-dark`          |
| **Background Darker** | Used for cards, subtle section breaks, or hover states in dark theme.                 | `#2D3748` | `--color-bg-darker`        |
| **Text Light**        | Primary text color for headings and body copy in dark theme.                          | `#F7FAFC` | `--color-text-light`       |
| **Text Light Muted**  | Secondary text color, for descriptions, captions, less prominent text in dark theme.  | `#A0AEC0` | `--color-text-light-muted` |

---

## Usage Guidelines

- **Primary (`--color-primary`)**:  
  This teal/cyan is the signature color. Use it for your main call-to-action buttons, active navigation links, progress bars, and important icons. It generally works well on both light and dark backgrounds, but ensure sufficient contrast in dark mode.

- **Secondary (`--color-secondary`)**:  
  The orange provides a warm contrast. Use it sparingly for secondary buttons, highlight elements, or to draw attention to specific features without overpowering the primary color. Ensure sufficient contrast in dark mode.

- **Backgrounds (Light Theme - `--color-bg-light`, `--color-bg-subtle`)**:  
  Maintain a clean and spacious feel with these light backgrounds. Use `--color-bg-subtle` to differentiate content blocks or cards.

- **Backgrounds (Dark Theme - `--color-bg-dark`, `--color-bg-darker`)**:  
  These dark tones provide a sleek and modern look. Use `--color-bg-dark` as the primary dark background, and `--color-bg-darker` for card elements, subtle sections, or hover states within the dark theme.

- **Text (Light Theme - `--color-text-dark`, `--color-text-muted`)**:  
  Ensure high readability by using `--color-text-dark` for most text. `--color-text-muted` is great for less critical information or subheadings.

- **Text (Dark Theme - `--color-text-light`, `--color-text-light-muted`)**:  
  These light text colors are designed for optimal readability against the dark backgrounds. Use `--color-text-light` for primary text and headings, and `--color-text-light-muted` for secondary or less prominent text.

- **System Colors (`--color-success`, `--color-error`)**:  
  Reserve these for feedback messages to the user. They are generally versatile enough for both themes, but always check for sufficient contrast.

- **Borders (`--color-border`)**:  
  Use this for subtle visual separation without adding too much visual weight. You might consider a slightly darker border color for the dark theme if `--color-border` doesn't provide enough contrast.

---

This expanded palette aims to capture the clean, professional, and slightly vibrant aesthetic of your provided PDF, ensuring a cohesive look for your portfolio across both light and dark themes.
