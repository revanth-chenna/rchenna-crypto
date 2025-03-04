Build and Deploy
Once your documentation is complete, build it using:
   ```sh
   npm run build
   ```
Deploy it using a static hosting service such as **GitHub Pages**, **Vercel**, or **Netlify**.

## API Integration
The web app fetches live cryptocurrency prices using the **CoinGecko API**:
```sh
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,cardano,solana
```
- The API returns JSON data containing cryptocurrency names, prices, and other details.
- **Axios** is used to fetch the data inside the Next.js component.

## State Management
This project uses **React Query** for state management because:
- It simplifies data fetching and caching.
- It provides automatic **caching, background updates, and refetching**.
- It enhances performance and reduces redundant API calls.

## Challenges & Solutions
### 1. Handling API Rate Limits
- Used **React Query caching** to avoid unnecessary API requests.
- Added a **manual refresh button** to update prices only when needed.

### 2. UI Responsiveness
- Used **TailwindCSS** for a responsive design.
- Ensured proper layout and usability on both mobile and desktop screens.

### 3. Search & Filtering
- Implemented a **search bar** to filter cryptocurrencies dynamically.
- Used **React's useState** to manage search input.