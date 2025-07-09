# Food Recipe App

[Live Demo →](https://foodrecipes-mealdb.web.app)

This is a responsive web-application based on the mealDB API.
Users can voice-search a recipe by ingredient in the image, name and the category of the food-item. I implemented the voice-search using the speech-recognition API from npm react team. While basic react state-hooks and javascript mapping code was written for fetching and connecting APIs with the UI logics. 
Hope you have fun exploring the project! :)

---

## Voice Assistant (Bonus Feature)

- Powered by [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition)
- Click the mic button in the search bar to search recipes by voice (Chrome/Safari supported)
- Visual feedback when listening (button glows/pulses)
- Works for searching by name, ingredient, or category

---

## Demo / Screenshot

| Screenshot | Description |
|---|---|
| <img src="src/assets/searchScreenByIng.png" alt="Search by Ingredient and Voice" width="350"/> | **Search & Voice Assistant:** Demonstrates searching for recipes by ingredient using both text and voice input. |

---

## Project Structure

```
food-recipe/
  ├── public/
  ├── src/
  │   ├── assets/           # Images and static assets
  │   ├── components/       # Reusable UI components (Header, MealCard)
  │   ├── network/          # API functions
  │   ├── pages/            # Main screens (HomeScreen, SearchScreen, DetailScreen)
  │   ├── styles/           # CSS files
  │   ├── voiceassistant/   # Voice search logic
  │   ├── App.js            # App entry point
  │   └── index.js          # React root
  ├── .github/workflows/    # GitHub Actions workflows
  ├── package.json
  └── README.md
```

---

## Usage

- **Browse:** Home page shows all recipes. Scroll or use category tabs/dropdown.
- **Filter:** Select a category to filter recipes.
- **Search:** Type in the search bar to find recipes by name, ingredient, or tag.
- **Voice Search:** Click the mic button and speak your query. (Supported in Chrome/Safari)
- **View Details:** (Planned) Click a recipe card to view full details, instructions, and video.

---

## Features

- Browse all available food items
- Filter by category (e.g., Seafood, Vegetarian, Pasta)
- Search for a food item by text input
- Voice assistant for voice-based search (see above)
- Responsive, mobile-friendly UI

---

## API Endpoints

- Search by Name:
  - `GET https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`
- Filter by Category:
  - `GET https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`
- List All Categories:
  - `GET https://www.themealdb.com/api/json/v1/1/list.php?c=list`
- Other Used Endpoints:
  - Filter by ingredient, area, and get full meal details as needed.

---

## Tech Stack

- Frontend: React 19, React Router
- Styling: CSS Modules, custom animations
- Voice: react-speech-recognition
- APIs: TheMealDB
- Deployment: Firebase Hosting

---

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
```bash
cd food-recipe
npm install
```

---

## Running Locally
```bash
npm start
```
App will be available at [http://localhost:3000](http://localhost:3000)

---

## Building for Production
```bash
npm run build
```
Builds the app for production to the `build/` folder.

---

## Deployment

This project is deployed using Firebase Hosting. To deploy your own:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login and initialize (if not already):
   ```bash
   firebase login
   firebase init hosting
   ```
3. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

Or use the provided GitHub Actions workflow for automatic deployment on push to `main`.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License. 