# Space Tourism Website 🚀

A modern, fully responsive space tourism website showcasing destinations, crew members, and cutting-edge space technology. Built with vanilla HTML, CSS, and JavaScript, featuring smooth animations, accessibility features, and optimal performance.

![Space Tourism Website](./assets/shared/logo.svg)

## ✨ Features

### Core Functionality
- 🌍 **Interactive Destinations** - Explore Moon, Mars, Europa, and Titan with detailed information
- 👨‍🚀 **Crew Profiles** - Meet your expert space crew members
- 🚀 **Technology Showcase** - Learn about launch vehicles, spaceports, and space capsules
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- ♿ **Accessible** - WCAG compliant with keyboard navigation and screen reader support

### Visual Effects & Animations
- ✨ **Twinkling Star Background** - Dynamic animated starfield with parallax scrolling
- 🎭 **Smooth Page Transitions** - Seamless navigation with loading indicators
- 🎪 **Scroll Reveal Animations** - Elements fade in as you scroll
- 🎯 **Interactive Hover Effects** - Enhanced feedback on buttons and links with ripple effects
- 🖼️ **Image Hover Effects** - Smooth scale and translate transformations
- 🎨 **Staggered List Animations** - Sequential fade-in for navigation indicators

### User Experience
- 🔝 **Back to Top Button** - Quick navigation on long pages
- 📊 **Progress Indicator** - Visual scroll progress bar with gradient effect
- 💡 **Tooltips** - Hover information on navigation items
- 🎨 **Loading Animations** - Smooth transitions between pages with "Preparing for launch..." indicator
- ⚡ **Lazy Loading** - Images load as needed with skeleton screens
- 🎪 **Animated Counters** - Numbers animate when scrolling into view

### Technical Features
- 🎯 **Tab Navigation** - Accessible tab interface with keyboard support (Arrow keys)
- 📱 **Mobile Navigation** - Hamburger menu with smooth transitions, click-outside to close, and Escape key support
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, robots.txt, and sitemap.xml
- 🚀 **Performance Monitoring** - Core Web Vitals tracking (development mode)
- 📝 **PWA Ready** - Web app manifest included
- 🎨 **Design System** - Dedicated design system page showcasing colors, typography, and components

## 🛠 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Custom Properties, Animations, Backdrop Filters)
- **JavaScript (ES6+)** - Vanilla JS with modern patterns (IntersectionObserver, PerformanceObserver)
- **Vite** - Fast development server and optimized builds

## 📋 Prerequisites

- Node.js (v18.0.0 or higher)
- npm

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/forbiddenlink/space-travel-website.git
cd space-travel-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
# or
npm start
```

4. **Open your browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
space-tourism-website/
├── assets/                   # Images and media files
│   ├── crew/                # Crew member images (PNG/WebP)
│   ├── destination/         # Destination images (PNG/WebP)
│   ├── home/                # Home page backgrounds
│   ├── shared/              # Shared assets (logo, icons)
│   ├── technology/          # Technology images
│   └── favicon-32x32.png    # Site favicon
├── index.html               # Home page
├── destination.html         # Destinations page with tabs
├── destination-*.html       # Individual destination pages
├── crew.html                # Crew page with tabs
├── crew-*.html              # Individual crew member pages
├── technology.html          # Technology page with tabs
├── technology-*.html        # Individual technology pages
├── design-system.html       # Design system showcase
├── index.css                # Main stylesheet
├── navigation.js            # Mobile navigation logic
├── tabs.js                  # Tab interface functionality
├── transitions.js           # Page transition effects
├── utils.js                 # Utility functions (back-to-top, parallax, tooltips, progress indicator)
├── enhancements.js          # Advanced animations (scroll reveal, counters, ripples, image effects)
├── data.json                # Content data (destinations, crew, technology)
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── manifest.json            # PWA manifest
├── robots.txt               # SEO robots file
├── sitemap.xml              # SEO sitemap
├── CONTRIBUTING.md          # Contribution guidelines
├── LICENSE                  # MIT License
└── .gitignore               # Git ignore rules
```

## 🎨 Design System

The project includes a dedicated [design-system.html](design-system.html) page that showcases:

### Color Palette
- **Dark:** `hsl(230, 35%, 7%)` / `#0B0D17` - Primary background
- **Light/Accent:** `hsl(231, 77%, 90%)` / `#D0D6F9` - Accent text
- **White:** `hsl(0, 0%, 100%)` / `#FFFFFF` - Primary text

### Typography
- **Serif:** Bellefair - Headings and large text
- **Sans Condensed:** Barlow Condensed - Navigation and labels
- **Sans Normal:** Barlow - Body text

### Responsive Breakpoints
- Mobile: < 35rem (560px)
- Tablet: 35rem - 45rem (560px - 720px)
- Desktop: > 45rem (720px+)

## 🎯 JavaScript Modules

### navigation.js
- Hamburger menu toggle for mobile
- Click outside to close menu
- Escape key to close menu
- ARIA attributes for accessibility

### tabs.js
- Keyboard navigation with Arrow keys
- ARIA-compliant tab panels
- Synchronizes content and images
- Supports both dot indicators and number indicators

### transitions.js
- Page transition overlays
- Loading indicator with "Preparing for launch..." message
- Entrance animations for main content
- Prevents same-page reloads

### utils.js
- Back-to-top button with smooth scroll
- Parallax effect for background elements
- Lazy loading for images with fade-in
- Tooltip system
- Scroll progress indicator

### enhancements.js
- Scroll reveal animations with IntersectionObserver
- Animated counter for statistics
- Image hover effects (scale and translate)
- Ripple effects on buttons
- Enhanced progress indicator with gradient
- Image skeleton screens
- Staggered list animations
- Performance monitoring (Core Web Vitals in development)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels, roles, and attributes (aria-controls, aria-expanded, aria-selected)
- Skip to content link
- Keyboard navigation support (Tab, Escape, Arrow keys)
- Focus visible states
- Screen reader friendly
- Hidden decorative elements with aria-hidden
- Sufficient color contrast

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (560px - 720px)
- Desktops (720px+)

## 🔧 Development

### Data Structure

Content is stored in [data.json](data.json) with the following structure:
- **destinations**: Array of destination objects (name, images, description, distance, travel time)
- **crew**: Array of crew member objects (name, images, role, bio)
- **technology**: Array of technology objects (name, images, description)

All images are available in both PNG and WebP formats for optimal performance.

## 🔒 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Additional Resources

- [Design System](design-system.html) - Visual style guide and component showcase
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute to this project

## 🙏 Acknowledgments

- Google Fonts for Barlow and Bellefair typefaces
