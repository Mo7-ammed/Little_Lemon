# Little Lemon — Meta Front-End Developer Capstone

A responsive table-booking web application for the **Little Lemon** Mediterranean restaurant in Chicago, built in accordance with the official wireframes, style guide specifications, and course modules.

---

## Tech Stack

- **React 19** with **Vite**
- **Vanilla CSS** with **CSS Grid** & responsive breakpoints
- **Vitest** + **React Testing Library** + **Jest-DOM** + **User Event**
- **Google Fonts**: Markazi Text (Headings) and Karla (Body)
- **HTML5 Semantic Elements** & **ARIA accessibility standards**

---

## Project Structure

```
├── public/
│   └── icons_assets/           # Restaurant media, icons, logos from style guide
├── src/
│   ├── api/
│   │   └── bookingApi.js       # Mock API module exporting fetchAPI & submitAPI
│   ├── components/
│   │   ├── About.jsx           # Chicago restaurant story and founder photography
│   │   ├── BookingForm.jsx     # Form with real-time validation & accessible inputs
│   │   ├── BookingPage.jsx     # Reservation management and confirmation screen
│   │   ├── Footer.jsx          # Doormat navigation, contact, and social links
│   │   ├── Header.jsx          # Semantic header with responsive navigation menu
│   │   ├── Hero.jsx            # Hero section with CTA button
│   │   ├── Specials.jsx        # Weekly specials cards matching wireframe
│   │   └── Testimonials.jsx    # Customer review cards with star ratings
│   ├── reducers/
│   │   └── bookingReducer.js   # State reducer updating available times
│   ├── App.jsx                 # Application root & view controller
│   ├── App.test.jsx            # Unit test suite
│   ├── index.css               # Design tokens, CSS Grid layout, and styling
│   ├── main.jsx                # React DOM entry point
│   └── setupTests.js           # Vitest setup with jest-dom
├── index.html                  # HTML5 shell, Open Graph tags, and Google Fonts
├── vite.config.js              # Vite & Vitest configuration
└── package.json
```

---

## Setup & Running Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Clone & Install
```bash
git clone <repository-url>
cd "Little Lemon"
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Running Unit Tests
Execute the unit tests:
```bash
npm test
```

### 4. Production Build
Create an optimized production bundle:
```bash
npm run build
```

---

## Mock API & Swapping for Real Backend

The reservation availability and submission logic is abstracted inside [`src/api/bookingApi.js`](src/api/bookingApi.js):

- `fetchAPI(date)`: Returns an array of available reservation times for a given date.
- `submitAPI(formData)`: Validates payload and returns boolean indicating success.

To connect a real REST backend:
1. Replace `fetchAPI` with an asynchronous `fetch()` call pointing to `GET /api/reservations?date=${date}`.
2. Replace `submitAPI` with a `POST /api/reservations` request transmitting JSON data.
