# Breach Notification Timeline Explorer

A demo web application that helps visualize and understand cybersecurity breach notification obligations and regulatory timelines across multiple jurisdictions.

## Overview

This interactive tool allows users to input breach incident details and automatically calculates applicable regulatory notification requirements based on incident type, data involved, and affected regions. The application maps incidents to their corresponding deadlines under frameworks like GDPR, CCPA/CPRA, HIPAA, NY SHIELD Act, and contractual obligations.

**Important:** This tool is for educational and illustrative purposes only and does not constitute legal advice. Always consult with qualified legal counsel for actual breach response scenarios.

## Features

- **Interactive Incident Form** - Input discovery time, incident type, data categories, and affected regions
- **Real-Time Obligation Matching** - Automatically identifies applicable regulatory requirements
- **Timeline Visualization** - Displays all deadlines sorted by urgency with color-coded status badges
- **Multi-Jurisdiction Support** - Covers EU (GDPR), California (CCPA/CPRA), New York (NY SHIELD), and other US jurisdictions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Client-Side Processing** - All calculations happen in the browser (no data sent to servers)

## Technologies

- **Next.js 16.0.8** - React framework with App Router
- **React 19.2.1** - UI component library
- **TypeScript 5.9.3** - Static type checking
- **Tailwind CSS 4.1.17** - Utility-first styling
- **Node.js** - Runtime environment

## Project Structure

```
├── app/                            # Next.js App Router pages
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page (main explorer)
│   ├── resume/page.tsx            # Resume page
│   └── globals.css                # Global styles
├── components/                     # React components
│   ├── Header.tsx                 # Navigation header
│   ├── BreachTimelineExplorer.tsx # Main explorer container
│   ├── IncidentForm.tsx           # Incident input form
│   └── TimelineResults.tsx        # Timeline display
├── lib/                           # Utility libraries
│   ├── rules.ts                   # Regulatory rules engine
│   ├── datetime.ts                # Date/time utilities
│   └── hooks.ts                   # Custom React hooks
├── public/                        # Static assets
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies
```

## Supported Regulatory Frameworks

| Framework | Notification Window | Trigger Conditions | Notify |
|-----------|---------------------|-------------------|---------|
| **GDPR** | 72 hours | EU region + PII/employee/payment data | EU Supervisory Authority |
| **CCPA/CPRA** | 30 days | California + customer PII | California consumers + AG |
| **HIPAA** | 60 days | Health/PHI data | Individuals, HHS, media |
| **NY SHIELD Act** | 30 days | NY region + customer PII | NY residents, NYAG |
| **Contractual** | 24 hours | Vendor breach incidents | Upstream customer |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "C:\Users\jadam\Job Template"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Set Discovery Time** - Choose when the incident was discovered (defaults to current time)
2. **Select Incident Type** - Choose from:
   - Ransomware attack
   - Lost/stolen device
   - Vendor/third-party breach
   - Phishing incident
3. **Select Data Types** - Check all that apply:
   - Customer PII
   - Health/PHI data
   - Payment card data
   - Employee data
4. **Select Regions** - Check all affected jurisdictions:
   - EU (GDPR)
   - California (CCPA/CPRA)
   - New York (NY SHIELD)
   - Other US states
5. **View Results** - The timeline automatically updates showing:
   - Most urgent obligation (highlighted)
   - All matched obligations with deadlines
   - Status indicators (overdue, upcoming, etc.)
   - Who needs to be notified

## Key Components

### IncidentForm Component
Collects user input for incident details with:
- Datetime picker for discovery time
- Radio buttons for incident type
- Checkboxes for data types and regions
- Real-time validation

### TimelineResults Component
Displays calculated obligations with:
- Highlighted most urgent requirement
- Sortable table of all obligations
- Color-coded status badges
- Deadline timestamps with relative time display

### Rules Engine (lib/rules.ts)
Core business logic that:
- Matches incidents to regulatory frameworks
- Calculates notification deadlines
- Sorts obligations by urgency
- Handles complex triggering conditions

### DateTime Utilities (lib/datetime.ts)
Handles:
- Deadline calculations
- Time formatting
- Hydration-safe rendering
- Human-readable time deltas

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint

### TypeScript Configuration

The project uses strict TypeScript settings with:
- Strict null checks
- No implicit any
- ES2022 target
- Path aliasing (@/* → ./*)

## License & Disclaimer

This application is provided for educational and demonstration purposes only. It does not constitute legal advice and should not be relied upon as the sole basis for breach notification decisions.

Always consult with qualified legal counsel and compliance professionals when responding to actual security incidents. Regulatory requirements vary significantly based on specific circumstances, jurisdictions, and evolving regulations.

## Contributing

This is a demonstration project. For questions or suggestions, please open an issue in the repository.

## Contact

For more information about the project, please refer to the project documentation or reach out through the repository.
