# MATYAG
### Manood. Suriin. Bumoto nang may kaalaman.

**Hackathon Entry — Challenge #3: Transparency, Accountability, and Good Governance**
Aligned with **UN SDG 16 — Peace, Justice and Strong Institutions**


MATYAG is a civic transparency platform that gives every Filipino citizen clear, verified, and up-to-date information about candidates and officials running for or holding national-level positions in the Philippines. The name comes from the Filipino word meaning *"to watch with vigilance"* — exactly what the app empowers citizens to do.

---

## The Problem

The Philippines has a culture of political dynasties, personality-based voting, and a deeply local governance structure. Most voters have *no accessible, unified, and centralized source* to check a political figure's record — let alone compare candidates on actual policy substance.

MATYAG solves this.

---

## Key Features

### 👤 Candidate Profiles
Complete public records for each candidate or official — experience, legislative history, laws authored, filed legal cases, and known political family connections. Every entry is source-linked to official documents.

### 🔍 Search & Discovery
Search by name, position, or political party. Browse full candidate and official lists with fast filters optimized for election season browsing.

### ⚖️ Side-by-Side Comparison
Compare two or more candidates across the same metrics — experience, records, laws, and cases — without switching between profiles.

### 🗳️ Personal Ballot Builder
Select candidates for each national position, generate a personal sample ballot, and share it on social media. Turns private research into a public civic statement.

---

## Covered Positions

| Position | Details |
|---|---|
| 🏛️ President | Head of state — orders, proclamations, governance record |
| 🏛️ Vice President | Elected separately — background, portfolio, public record |
| 🏛️ Senators | 12 elected every 3 years — bills, laws, attendance, voting history |
| 🏛️ Party-list Representatives | Sector representation, org background, legislative contributions |

⚠️ **Scope note:** MATYAG covers **national elected positions only**. Local government, judicial, and appointed cabinet positions are outside the current scope due to inconsistent or non-digital records.


---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/) |
| Language | TypeScript |
| Styling | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native) |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Expo CLI (npm install -g expo-cli)
- Expo Go app on your mobile device, or an iOS/Android simulator

### Installation

# 1. Clone the repository
git clone https://github.com/your-username/matyag.git
cd matyag

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start

### Running the App

| Command | Platform |
|---|---|
| npx expo start | Opens Expo Dev Tools (scan QR with Expo Go) |
| npx expo start --android | Opens in Android emulator |
| npx expo start --ios | Opens in iOS simulator (macOS only) |


## Project Structure

matyag/
├── app/                  # Expo Router screens
├── components/           # Reusable UI components
├── constants/            # Colors, fonts, config
├── hooks/                # Custom React hooks
├── types/                # TypeScript interfaces & types
├── utils/                # Helper functions
├── assets/               # Images, icons, fonts
└── tailwind.config.js    # NativeWind / Tailwind config

---

## Hackathon Context

This project was built for *Challenge #3 — Transparency, Accountability, and Good Governance*, addressing the lack of centralized, verifiable civic information in the Philippine electoral landscape.

*Delimitations (by design):*
- ❌ No local government positions (data inconsistency)
- ❌ No judicial branch (appointed, not elected)
- ❌ No cabinet secretaries (appointed, not elected)
- ❌ No unverified or unofficial claims

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with 🤍 for every Filipino voter.
</p>