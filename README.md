# LondonHome Super-App 🇬🇧

A London-first, all-in-one home services mobile platform inspired by the super-app model (e.g., Careem/Grab). This platform is architected to scale from basic home services to a full city-level lifestyle ecosystem.

## 🧱 Product Roadmap

- **Phase 1 (Current MVP):** Home Cleaning, Handyman, and At-Home Beauty.
- **Phase 2:** Laundry, Subscriptions, and Wallet Retention.
- **Phase 3:** Boiler/AC Servicing, Appliance Repair, and Property Bundles.
- **Phase 4:** Childcare (DBS Verified), Tutoring, and Wellness.
- **Phase 5:** Car Valeting, Personal Errands, and Concierge Services.

## 🛠 Tech Stack

- **Frontend:** React 19 (ESM), Tailwind CSS
- **AI Engine:** Google Gemini 3 Flash (AI Concierge)
- **State Management:** React Hooks (useState, useMemo)
- **Deployment Ready:** Clean architecture for Flutter/React Native migration.

## 🚀 Getting Started

### Prerequisites
- Node.js (for local development environment)
- A valid **Google Gemini API Key** (set in your environment variables as `API_KEY`).

### Local Development
1. Clone the repository.
2. Ensure you have an environment where `process.env.API_KEY` is accessible.
3. Open `index.html` in a modern browser (using a local server like Live Server).

## 📂 Project Structure

- `App.tsx`: The main application logic containing User, Provider, and Admin views.
- `components/`: UI components and the AI Concierge module.
- `services/`: Integration with the Gemini API.
- `constants.tsx`: Centralized service catalog and mock data.
- `types.ts`: TypeScript definitions for the entire ecosystem.

## 🔒 Security & Compliance
- **UK Focused:** Integrated logic for DBS checks (Phase 4).
- **Escrow Payments:** Wallet logic designed for Stripe UK compliance.

---
*Developed by a Senior Technical Partner team.*