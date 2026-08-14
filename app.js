/**
 * ============================================================================
 * PawPals SMU - Pet Care Application Frontend Script
 * Language: Vanilla JavaScript (ES6+)
 * 
 * NOTE FOR READERS:
 * This script is extensively commented so that developers with HTML/CSS
 * experience can easily understand what each JavaScript function does.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// Embedded Fallback Data (Providers around SMU, Pets, Bundles)
// ----------------------------------------------------------------------------
const FALLBACK_PROVIDERS = [
  {
    id: "p1",
    name: "Sarah Tan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    badge: "Top Rated Walker",
    rating: 4.95,
    reviewCount: 48,
    address: "81 Victoria St, Singapore 188065 (SMU Campus / Bras Basah)",
    postalCode: "188065",
    lat: 1.2963,
    lng: 103.8502,
    distanceKm: 0.2,
    services: ["walking", "sitting", "transport"],
    rates: { walking: 28, sitting: 55, grooming: 0, transport: 22 },
    creditsPerService: { walking: 28, sitting: 55, grooming: 0, transport: 22 },
    bio: "Certified canine first-responder and veterinary nurse student located right beside SMU. Passionate about high-energy dogs and structured leash walks through Fort Canning Park.",
    yearsExperience: 5,
    specialties: ["High-energy dogs", "Puppy leash training", "Senior cat sitting", "Medication administration"],
    availability: ["08:00 AM", "10:30 AM", "02:00 PM", "04:30 PM", "06:30 PM"],
    reviews: [
      {
        author: "Dr. Marcus Wei",
        petName: "Buster (Golden Retriever)",
        rating: 5,
        date: "3 days ago",
        comment: "Sarah walked Buster twice a day during my conference at SMU. She provided live GPS routes and photos at Fort Canning. Exceptional care!"
      },
      {
        author: "Chloe Lim",
        petName: "Miso (Shiba Inu)",
        rating: 5,
        date: "1 week ago",
        comment: "Super patient with my stubborn Shiba. Handled his reactivity like an absolute pro."
      }
    ]
  },
  {
    id: "p2",
    name: "David Kumar",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    badge: "Senior Sitter & Groomer",
    rating: 4.88,
    reviewCount: 36,
    address: "200 Victoria St, Singapore 188067 (Bugis Junction)",
    postalCode: "188067",
    lat: 1.2998,
    lng: 103.8553,
    distanceKm: 0.5,
    services: ["walking", "sitting", "grooming"],
    rates: { walking: 30, sitting: 60, grooming: 65, transport: 0 },
    creditsPerService: { walking: 30, sitting: 60, grooming: 65, transport: 0 },
    bio: "Professional pet groomer & home sitter with 7 years of full-time experience. Specialized in low-stress coat styling, sensitive skin hydrobaths, and overnight sitting.",
    yearsExperience: 7,
    specialties: ["Hypoallergenic grooming", "De-shedding", "Anxious pets", "Overnight stays"],
    availability: ["09:00 AM", "11:30 AM", "01:30 PM", "03:30 PM", "05:30 PM"],
    reviews: [
      {
        author: "Seraphina Fong",
        petName: "Snowy (Bichon Frise)",
        rating: 5,
        date: "5 days ago",
        comment: "David's grooming made Snowy look like a fluffy cloud! Very calm demeanor with timid dogs."
      }
    ]
  },
  {
    id: "p3",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    badge: "Behavioral Specialist",
    rating: 4.98,
    reviewCount: 62,
    address: "9 Bras Basah Rd, Singapore 189559 (Rendezvous / Bencoolen)",
    postalCode: "189559",
    lat: 1.2978,
    lng: 103.8509,
    distanceKm: 0.3,
    services: ["walking", "sitting", "grooming", "transport"],
    rates: { walking: 35, sitting: 70, grooming: 75, transport: 25 },
    creditsPerService: { walking: 35, sitting: 70, grooming: 75, transport: 25 },
    bio: "Fear-free certified dog trainer and pet handler based right across from SMU School of Economics. Expert in positive reinforcement walking and reactive canine socialization.",
    yearsExperience: 6,
    specialties: ["Leash reactivity", "Large breeds (>30kg)", "Puppy socialization", "Pet taxi"],
    availability: ["07:30 AM", "10:00 AM", "12:30 PM", "03:00 PM", "05:00 PM", "07:00 PM"],
    reviews: [
      {
        author: "Jessica Ang",
        petName: "Thor (German Shepherd)",
        rating: 5,
        date: "Yesterday",
        comment: "Thor is usually afraid of city noises around Bras Basah, but Elena kept him totally engaged and calm. Incredible trainer!"
      }
    ]
  },
  {
    id: "p4",
    name: "Nurul Huda",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    badge: "Cat & Small Pet Expert",
    rating: 4.92,
    reviewCount: 29,
    address: "68 Orchard Rd, Singapore 238839 (Plaza Singapura / Dhoby Ghaut)",
    postalCode: "238839",
    lat: 1.3005,
    lng: 103.8451,
    distanceKm: 0.7,
    services: ["sitting", "transport"],
    rates: { walking: 0, sitting: 48, grooming: 0, transport: 20 },
    creditsPerService: { walking: 0, sitting: 48, grooming: 0, transport: 20 },
    bio: "Feline behavioral consultant specializing in shy cats, rabbits, and small animals. Offers quiet drop-in visits, litter sanitization, and stress-free vet clinic transport.",
    yearsExperience: 4,
    specialties: ["Feline enrichment", "Senior pet comfort", "Rabbits & guinea pigs", "Post-surgery care"],
    availability: ["08:30 AM", "11:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"],
    reviews: [
      {
        author: "Brendan Teo",
        petName: "Luna & Simba (Persian cats)",
        rating: 5,
        date: "4 days ago",
        comment: "Nurul is the cat whisperer! Even my aloof Persian came out to purr and play feather wand."
      }
    ]
  },
  {
    id: "p5",
    name: "Lucas Chee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    badge: "Active Adventure Walker",
    rating: 4.86,
    reviewCount: 42,
    address: "100 Middle Rd, Singapore 188968 (Midland / Rochor)",
    postalCode: "188968",
    lat: 1.2989,
    lng: 103.8541,
    distanceKm: 0.6,
    services: ["walking", "transport"],
    rates: { walking: 25, sitting: 0, grooming: 0, transport: 20 },
    creditsPerService: { walking: 25, sitting: 0, grooming: 0, transport: 20 },
    bio: "Marathon runner and active pet companion. Conducts energetic pack walks, hill walks up Fort Canning, and waterfront exercise loops around Marina Bay.",
    yearsExperience: 4,
    specialties: ["Trail jogs", "Pack walks", "High-stamina dogs", "GPS tracking"],
    availability: ["07:00 AM", "09:30 AM", "04:00 PM", "06:00 PM"],
    reviews: [
      {
        author: "Amanda Koh",
        petName: "Rocky (Border Collie)",
        rating: 5,
        date: "6 days ago",
        comment: "Rocky always comes home happily exhausted after walks with Lucas. Great communication and water breaks."
      }
    ]
  },
  {
    id: "p6",
    name: "Michelle Goh",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    badge: "Master Groomer & Stylist",
    rating: 4.96,
    reviewCount: 51,
    address: "111 Somerset Rd, Singapore 238164 (Somerset / Orchard)",
    postalCode: "238164",
    lat: 1.3009,
    lng: 103.8378,
    distanceKm: 1.4,
    services: ["grooming", "sitting"],
    rates: { walking: 0, sitting: 65, grooming: 80, transport: 0 },
    creditsPerService: { walking: 0, sitting: 65, grooming: 80, transport: 0 },
    bio: "Award-winning creative pet groomer using natural organic Japanese shampoos, paw balm treatments, and gentle scissor work for all coat types.",
    yearsExperience: 8,
    specialties: ["Asian fusion teddy styling", "Aromatherapy spa", "Flea & tick detox", "Deshedding treatments"],
    availability: ["10:00 AM", "01:00 PM", "03:30 PM", "06:00 PM"],
    reviews: [
      {
        author: "Vernon Seah",
        petName: "Mochi (Poodle Mix)",
        rating: 5,
        date: "1 week ago",
        comment: "The scissor work is pristine and Michelle was so tender with Mochi's sensitive ears."
      }
    ]
  },
  {
    id: "p7",
    name: "Jonathan Tay",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
    badge: "Reliable Pet Transit & Care",
    rating: 4.89,
    reviewCount: 33,
    address: "25 Stamford Rd, Singapore 178957 (Capitol / City Hall)",
    postalCode: "178957",
    lat: 1.2936,
    lng: 103.8519,
    distanceKm: 0.4,
    services: ["walking", "sitting", "transport"],
    rates: { walking: 26, sitting: 52, grooming: 0, transport: 24 },
    creditsPerService: { walking: 26, sitting: 52, grooming: 0, transport: 24 },
    bio: "Spacious air-conditioned pet taxi equipped with crash-tested safety crates, dog seatbelts, and ramp access for senior pets. Available for vet trips, airport pickup, and neighborhood walks.",
    yearsExperience: 5,
    specialties: ["Air-con pet taxi", "Senior pet handling", "Vet appointments", "Drop-in feeding"],
    availability: ["08:00 AM", "11:00 AM", "02:00 PM", "05:00 PM", "07:30 PM"],
    reviews: [
      {
        author: "Valerie Neo",
        petName: "Kopi (Corgi)",
        rating: 5,
        date: "2 weeks ago",
        comment: "Jonathan arrived exactly on time with a clean vehicle and water bowls ready. Super reliable transport service in town."
      }
    ]
  }
];

const FALLBACK_PETS = [
  {
    id: "pet_1",
    name: "Mochi",
    species: "Dog",
    breed: "Pembroke Welsh Corgi",
    size: "Medium (10 - 25 kg)",
    age: 3,
    photo: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
    specialNeeds: "Loves ball fetching. Can get nervous around loud buses at Bras Basah junction; prefers shady grass paths near SMU Li Ka Shing library and Fort Canning. Daily joint supplement in evening meal.",
    emergencyContact: "+65 9123 4567 (Haneeza Said)",
    vetName: "The Animal Clinic @ Katong (+65 6440 4767)"
  },
  {
    id: "pet_2",
    name: "Luna",
    species: "Cat",
    breed: "Ragdoll",
    size: "Small (< 10 kg)",
    age: 2,
    photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    specialNeeds: "Indoor-only cat. Needs daily gentle combing to prevent hairballs. Enjoys feather teaser toy before breakfast. Sensitive to citrus scents.",
    emergencyContact: "+65 9123 4567 (Haneeza Said)",
    vetName: "Mount Pleasant Vet Centre (Orchard)"
  },
  {
    id: "pet_3",
    name: "Bailey",
    species: "Dog",
    breed: "Golden Retriever",
    size: "Large (25 - 40 kg)",
    age: 6,
    photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    specialNeeds: "Gentle swimmer. Slight hip sensitivity on humid afternoons; please ensure plenty of cold water and rest stops under shady trees.",
    emergencyContact: "+65 9876 5432 (Chloe Lim)",
    vetName: "SMU Neighborhood Vet Care"
  }
];

const FALLBACK_BUNDLES = [
  { id: 'b_starter', name: 'Starter Pack', credits: 50, priceSGD: 48, ratePerCredit: 0.96, discountLabel: 'Standard Rate' },
  { id: 'b_popular', name: 'Popular Bundle', credits: 120, priceSGD: 99, ratePerCredit: 0.82, discountLabel: 'Save 18% — Most Popular', popular: true },
  { id: 'b_pro', name: 'Pro Care Pass', credits: 300, priceSGD: 219, ratePerCredit: 0.73, discountLabel: 'Save 27%' },
  { id: 'b_elite', name: 'Elite VIP Club', credits: 700, priceSGD: 449, ratePerCredit: 0.64, discountLabel: 'Save 36% — Best Value' }
];

// ----------------------------------------------------------------------------
// Global Application State
// ----------------------------------------------------------------------------
const AppState = {
  providers: [...FALLBACK_PROVIDERS], // Initialized with fallback to prevent empty state
  pets: [...FALLBACK_PETS],           // User's registered pets
  bookings: [
    {
      id: 'b_init_1',
      providerId: 'p1',
      providerName: 'Sarah Tan',
      petName: 'Mochi',
      serviceType: 'walking',
      date: getTomorrowDateString(),
      timeSlot: '08:00 AM',
      durationMinutes: 60,
      paymentMethod: 'credits',
      creditCost: 28,
      totalAmount: 28,
      status: 'confirmed'
    }
  ],
  creditBundles: [...FALLBACK_BUNDLES],
  userCredits: 150,
  creditHistory: [
    {
      id: 'tx_init_1',
      type: 'purchase',
      bundleName: 'Popular Bundle (+120 credits)',
      credits: 120,
      amountSGD: 99,
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      note: 'Purchased Popular Tier Bundle'
    },
    {
      id: 'tx_init_2',
      type: 'bonus',
      bundleName: 'Welcome Bonus (+30 credits)',
      credits: 30,
      amountSGD: 0,
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      note: 'New Pet Parent Registration Gift'
    }
  ],
  activeTab: 'tab-providers',

  // Current booking draft selection
  bookingDraft: {
    serviceType: 'walking',
    providerId: 'p1',
    petName: 'Mochi',
    date: getTomorrowDateString(),
    timeSlot: '10:30 AM',
    durationMinutes: 60,
    addOns: ['addon-gpstrack'],
    paymentMode: 'credits'
  },

  // Active provider for reviews modal
  selectedProviderForReviews: null,

  // Active bundle for purchase modal
  selectedBundleForPurchase: null,

  // Geocoded search & radius filter state
  searchedLocation: null, // { lat: number, lng: number, formattedAddress: string, query: string }
  searchedRadiusKm: 1.5
};

// ----------------------------------------------------------------------------
// Utility Helper Functions
// ----------------------------------------------------------------------------

/**
 * Calculates distance in kilometers between two GPS coordinates using the Haversine formula.
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || typeof lat2 !== 'number' || typeof lon2 !== 'number') {
    return 0;
  }
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

/**
 * Calculates tomorrow's date formatted as YYYY-MM-DD for the date picker default.
 * @returns {string} Date string in YYYY-MM-DD format
 */
function getTomorrowDateString() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

/**
 * Displays a temporary toast notification message at the bottom right.
 * @param {string} message - The text to display
 * @param {string} type - 'success', 'info', or 'error'
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '✅';
  if (type === 'error') icon = '⚠️';
  if (type === 'info') icon = 'ℹ️';

  toast.innerHTML = `<span aria-hidden="true">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Automatically remove toast after 3.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ----------------------------------------------------------------------------
// Initialization: Runs when the HTML Document is ready
// ----------------------------------------------------------------------------
function initApp() {
  setupNavigationTabs();
  setupFilterControls();
  setupGoogleMapWidget();
  setupBookingFormListeners();
  setupPetManagerListeners();
  setupCreditSystemListeners();
  setupAiConciergeListeners();
  setupModalDismissals();

  // Load initial data from server APIs (with built-in fallback)
  loadInitialData();

  // Initialize booking date to tomorrow
  const dateInput = document.getElementById('booking-date-input');
  if (dateInput) {
    dateInput.value = AppState.bookingDraft.date;
    dateInput.min = new Date().toISOString().split('T')[0];
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ----------------------------------------------------------------------------
// 1. Data Fetching & Sync Functions
// ----------------------------------------------------------------------------

/**
 * Loads providers, pets, credit packages, and booking state from server.
 */
async function loadInitialData() {
  try {
    // 1. Fetch Providers
    const provRes = await fetch('/api/providers');
    if (provRes.ok) {
      const data = await provRes.json();
      if (Array.isArray(data.providers) && data.providers.length > 0) {
        AppState.providers = data.providers;
      }
    }
  } catch (err) {
    console.warn('Using local fallback for providers:', err);
  }

  try {
    // 2. Fetch Pets
    const petRes = await fetch('/api/pets');
    if (petRes.ok) {
      const data = await petRes.json();
      if (Array.isArray(data.pets) && data.pets.length > 0) {
        AppState.pets = data.pets;
      }
    }
  } catch (err) {
    console.warn('Using local fallback for pets:', err);
  }

  try {
    // 3. Fetch Credits
    const credRes = await fetch('/api/credits');
    if (credRes.ok) {
      const data = await credRes.json();
      if (Array.isArray(data.bundles) && data.bundles.length > 0) {
        AppState.creditBundles = data.bundles;
      }
      if (data.balance !== undefined) {
        AppState.userCredits = data.balance;
      }
      if (Array.isArray(data.history) && data.history.length > 0) {
        AppState.creditHistory = data.history;
      }
    }
  } catch (err) {
    console.warn('Using local fallback for credits:', err);
  }

  try {
    // 4. Fetch Bookings
    const bkRes = await fetch('/api/bookings');
    if (bkRes.ok) {
      const data = await bkRes.json();
      if (Array.isArray(data.bookings) && data.bookings.length > 0) {
        AppState.bookings = data.bookings;
      }
    }
  } catch (err) {
    console.warn('Using local fallback for bookings:', err);
  }

  // Render all UI components with the loaded state
  renderProvidersList();
  renderPetsList();
  populateBookingDropdowns();
  renderCreditBundles();
  renderCreditHistoryTable();
  updateCreditBalanceDisplays();
  recalculateBookingSummary();
}

// ----------------------------------------------------------------------------
// 2. Navigation Tabs System
// ----------------------------------------------------------------------------

/**
 * Sets up tab clicking behavior to switch between main views.
 */
function setupNavigationTabs() {
  const tabButtons = document.querySelectorAll('.nav-tab-button');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');
      switchTab(targetTabId);
    });
  });

  // Top header credit button opens the Credit Packages tab
  const headerWalletBtn = document.getElementById('header-wallet-btn');
  if (headerWalletBtn) {
    headerWalletBtn.addEventListener('click', () => {
      switchTab('tab-credits');
    });
  }
}

/**
 * Switches the active tab view and updates button states.
 * @param {string} tabId - ID of the tab section (e.g. 'tab-providers', 'tab-booking')
 */
function switchTab(tabId) {
  AppState.activeTab = tabId;

  // Update tab buttons
  document.querySelectorAll('.nav-tab-button').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  // Update tab pane visibility
  document.querySelectorAll('.tab-pane').forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------------------------------------------------------
// 3. Sitter & Walker Directory Component
// ----------------------------------------------------------------------------

/**
 * Renders the cards for each pet care provider based on active filter settings.
 */
function renderProvidersList() {
  const container = document.getElementById('providers-list-container');
  if (!container) return;

  // Read filter values
  const activeServiceChip = document.querySelector('.service-chip.active');
  const serviceFilter = activeServiceChip ? activeServiceChip.getAttribute('data-service') : 'all';
  const priceFilter = document.getElementById('filter-price-select')?.value || 'all';
  const searchFilter = (document.getElementById('filter-search-input')?.value || '').toLowerCase().trim();

  // Filter providers array
  const filtered = AppState.providers.filter(provider => {
    // 1. Service Type filter
    if (serviceFilter !== 'all' && !provider.services.includes(serviceFilter)) {
      return false;
    }

    // 2. Price filter
    if (priceFilter !== 'all') {
      const maxPrice = Number(priceFilter);
      const lowestRate = Math.min(...Object.values(provider.rates).filter(r => r > 0));
      if (lowestRate > maxPrice) return false;
    }

    // 3. Radius filter (if geocoded location active)
    if (AppState.searchedLocation) {
      const dist = calculateDistanceKm(AppState.searchedLocation.lat, AppState.searchedLocation.lng, provider.lat, provider.lng);
      provider.searchedDistanceKm = dist;
      if (dist > AppState.searchedRadiusKm) {
        return false;
      }
    } else if (searchFilter) {
      // 4. Keyword search fallback (if not geocoded)
      const matchName = provider.name.toLowerCase().includes(searchFilter);
      const matchAddress = provider.address.toLowerCase().includes(searchFilter);
      const matchPostal = provider.postalCode.includes(searchFilter);
      const matchBio = provider.bio.toLowerCase().includes(searchFilter);
      if (!matchName && !matchAddress && !matchPostal && !matchBio) return false;
    }

    return true;
  });

  // If geocoded location is active, sort by closest distance to searched location
  if (AppState.searchedLocation) {
    filtered.sort((a, b) => (a.searchedDistanceKm || 0) - (b.searchedDistanceKm || 0));
  }

  if (filtered.length === 0) {
    const isSearched = Boolean(AppState.searchedLocation);
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 36px 24px; text-align: center; background: #fff; border-radius: 12px; border: 1px solid var(--md-sys-color-outline-variant); box-shadow: var(--md-elevation-1);">
        <p style="font-size: 2rem; margin: 0 0 8px 0;">📍</p>
        <p style="font-size: 1.125rem; font-weight: 700; color: var(--md-sys-color-on-surface); margin: 0 0 6px 0;">
          ${isSearched ? `No verified providers found within 1.5 km of "${AppState.searchedLocation.formattedAddress}"` : 'No providers found matching your criteria'}
        </p>
        <p style="font-size: 0.875rem; color: var(--md-sys-color-outline); margin: 0 auto 16px auto; max-width: 480px;">
          ${isSearched ? 'Try resetting to the central SMU campus or searching another nearby neighborhood (e.g. Bugis, Bras Basah, Dhoby Ghaut, Orchard).' : 'Try selecting "All Services" or clearing your search term.'}
        </p>
        ${isSearched ? `
          <button type="button" class="btn-primary" onclick="window.clearSearchedLocation()" style="padding: 8px 20px; font-size: 0.875rem;">
            Reset to All SMU Providers
          </button>
        ` : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(provider => {
    const servicesHtml = provider.services.map(s => `<span class="service-tag">${capitalize(s)}</span>`).join(' ');
    const primaryRate = provider.rates.walking || provider.rates.sitting || provider.rates.grooming || provider.rates.transport || 25;

    const distanceDisplay = AppState.searchedLocation && typeof provider.searchedDistanceKm === 'number'
      ? `<span class="provider-distance highlight" style="color:#0284c7;font-weight:700;">📍 ${provider.searchedDistanceKm.toFixed(2)} km from search</span>`
      : `<span class="provider-distance">(${provider.distanceKm} km from SMU)</span>`;

    return `
      <article class="provider-card" id="card-${provider.id}" data-provider-id="${provider.id}">
        <div class="provider-header">
          <img src="${provider.avatar}" alt="Photo of ${provider.name}" class="provider-avatar" loading="lazy">
          <div class="provider-meta">
            <span class="provider-badge">${provider.badge}</span>
            <h3 class="provider-name">${provider.name}</h3>
            <div class="provider-rating-row">
              <span class="star-icon" aria-hidden="true">★</span>
              <strong>${provider.rating}</strong>
              <button type="button" class="btn-text-link view-reviews-btn" data-provider-id="${provider.id}" style="background:none;border:none;color:var(--md-sys-color-primary);font-size:0.8125rem;cursor:pointer;text-decoration:underline;">
                (${provider.reviewCount} reviews)
              </button>
            </div>
          </div>
        </div>

        <div class="provider-address">
          <span aria-hidden="true">📍</span>
          <span>${provider.address}</span>
          ${distanceDisplay}
        </div>

        <p class="provider-bio">${provider.bio}</p>

        <div class="provider-tags">
          ${servicesHtml}
        </div>

        <div class="provider-pricing-bar">
          <div>
            <span class="price-main">$${primaryRate}</span>
            <span class="price-sub">SGD / hr</span>
          </div>
          <span class="credit-equiv">or ${primaryRate} credits</span>
        </div>

        <div class="provider-actions">
          <button type="button" class="btn-locate locate-map-btn" data-provider-id="${provider.id}" data-address="${encodeURIComponent(provider.address)}" data-name="${provider.name}" aria-label="Locate ${provider.name} on map">
            <span aria-hidden="true">🗺️</span> Map
          </button>
          <button type="button" class="btn-primary book-provider-btn" data-provider-id="${provider.id}">
            Book Service
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach event listeners to card buttons
  container.querySelectorAll('.locate-map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const providerId = btn.getAttribute('data-provider-id');
      const address = btn.getAttribute('data-address');
      const name = btn.getAttribute('data-name');
      locateProviderOnMap(providerId, address, name);
    });
  });

  container.querySelectorAll('.book-provider-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const providerId = btn.getAttribute('data-provider-id');
      startBookingWithProvider(providerId);
    });
  });

  container.querySelectorAll('.view-reviews-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const providerId = btn.getAttribute('data-provider-id');
      openReviewsModal(providerId);
    });
  });
}

/**
 * Capitalizes a word (e.g. 'walking' -> 'Walking')
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Executes server-side geocoding on the searched address/postal code
 * and centers the map + filters providers to 1.5 km service radius.
 */
async function handleGeocodeSearch() {
  const searchInput = document.getElementById('filter-search-input');
  const submitBtn = document.getElementById('filter-search-submit-btn');
  const clearBtn = document.getElementById('filter-search-clear-btn');
  const errorEl = document.getElementById('search-geocode-error');
  const badge = document.getElementById('radius-filter-badge');

  const query = (searchInput?.value || '').trim();

  // Clear previous errors
  if (errorEl) {
    errorEl.style.display = 'none';
    errorEl.textContent = '';
  }

  if (!query) {
    clearSearchedLocation();
    return;
  }

  // Show loading indicator
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" style="width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;display:inline-block;animation:spin 0.8s linear infinite;" aria-hidden="true"></span> Geocoding...';
  }

  try {
    const res = await fetch(`/api/geocode?address=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (res.ok && data.success && data.location) {
      // Successfully geocoded!
      AppState.searchedLocation = {
        lat: Number(data.location.lat),
        lng: Number(data.location.lng),
        formattedAddress: data.formattedAddress,
        query: query
      };

      if (badge) badge.style.display = 'inline-flex';
      if (clearBtn) clearBtn.style.display = 'flex';

      // Update map location, drop pin, and draw 1.5km circle
      applySearchedLocationOnMap(data.location, data.formattedAddress);

      // Re-filter and render provider cards
      renderProvidersList();
      renderProviderMarkers();

      const matchingCount = AppState.providers.filter(p => {
        const d = calculateDistanceKm(data.location.lat, data.location.lng, p.lat, p.lng);
        return d <= AppState.searchedRadiusKm;
      }).length;

      showToast(`Found ${matchingCount} provider(s) within 1.5 km of ${data.formattedAddress}`, matchingCount > 0 ? 'success' : 'info');
    } else {
      // Geocoding failed
      if (errorEl) {
        errorEl.textContent = `⚠️ ${data.error || `Unable to find coordinates for "${query}". Please check the address or postal code in Singapore (e.g. 188065, Bras Basah, Bugis, Orchard).`}`;
        errorEl.style.display = 'flex';
      }
      if (badge) badge.style.display = 'none';
      renderProvidersList();
    }
  } catch (err) {
    console.error('Geocode search error:', err);
    if (errorEl) {
      errorEl.textContent = `⚠️ Network error while geocoding "${query}". Please try again.`;
      errorEl.style.display = 'flex';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span aria-hidden="true">🔍</span> Search';
    }
  }
}

/**
 * Clears active geocode search and resets provider list & map.
 */
function clearSearchedLocation() {
  AppState.searchedLocation = null;
  const searchInput = document.getElementById('filter-search-input');
  if (searchInput) searchInput.value = '';

  const clearBtn = document.getElementById('filter-search-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';

  const badge = document.getElementById('radius-filter-badge');
  if (badge) badge.style.display = 'none';

  const errorEl = document.getElementById('search-geocode-error');
  if (errorEl) {
    errorEl.style.display = 'none';
    errorEl.textContent = '';
  }

  if (MapState.searchedMarker) {
    MapState.searchedMarker.setMap(null);
    MapState.searchedMarker = null;
  }
  if (MapState.radiusCircle) {
    MapState.radiusCircle.setMap(null);
    MapState.radiusCircle = null;
  }

  renderProvidersList();
  renderProviderMarkers();

  if (MapState.map) {
    fitAllProvidersOnMap();
  }
}
window.clearSearchedLocation = clearSearchedLocation;

/**
 * Initializes filter inputs and service chip clicks.
 */
function setupFilterControls() {
  const serviceChips = document.querySelectorAll('.service-chip');
  serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      serviceChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderProvidersList();
      renderProviderMarkers();
    });
  });

  const priceSelect = document.getElementById('filter-price-select');
  if (priceSelect) {
    priceSelect.addEventListener('change', () => {
      renderProvidersList();
      renderProviderMarkers();
    });
  }

  const searchForm = document.getElementById('provider-filter-form');
  const searchInput = document.getElementById('filter-search-input');
  const clearBtn = document.getElementById('filter-search-clear-btn');

  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleGeocodeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (clearBtn) {
        clearBtn.style.display = val ? 'flex' : 'none';
      }
      if (!val && AppState.searchedLocation) {
        clearSearchedLocation();
      } else if (!AppState.searchedLocation) {
        renderProvidersList();
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleGeocodeSearch();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearSearchedLocation();
    });
  }
}

// ----------------------------------------------------------------------------
// 4. Interactive Google Maps Platform Integration
// ----------------------------------------------------------------------------

const MapState = {
  apiKey: '',
  map: null,
  markers: [],
  searchedMarker: null,
  radiusCircle: null,
  infoWindow: null,
  smuMarker: null,
  routePolyline: null,
  isApiLoaded: false,
  isRouteVisible: false,
  smuCenter: { lat: 1.2963, lng: 103.8502 },
  parkRouteCoords: [
    { lat: 1.2963, lng: 103.8502, title: 'SMU Campus Green Hub' },
    { lat: 1.2974, lng: 103.8488, title: 'Fort Canning Tree Tunnel' },
    { lat: 1.2965, lng: 103.8465, title: 'Fort Canning Green Hilltop' },
    { lat: 1.2941, lng: 103.8475, title: 'Spice Garden & Shaded Trails' },
    { lat: 1.2938, lng: 103.8496, title: 'Armenian Street Dog-Friendly Cafe Strip' },
    { lat: 1.2963, lng: 103.8502, title: 'SMU Li Ka Shing Library Return' }
  ]
};

// Expose booking and reviews modal handlers globally for InfoWindow buttons
window.startBookingWithProvider = startBookingWithProvider;
window.openReviewsModal = openReviewsModal;

/**
 * Detects Google Maps API key from environment, config endpoint, or window.
 */
async function resolveGoogleMapsApiKey() {
  let key = '';
  try {
    if (typeof process !== 'undefined' && process.env) {
      key = process.env.GOOGLE_MAPS_PLATFORM_KEY || process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_PLATFORM_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';
    }
  } catch (e) {
    // Ignore
  }

  if (!key && typeof window !== 'undefined') {
    key = window.GOOGLE_MAPS_PLATFORM_KEY || window.GOOGLE_MAPS_API_KEY || '';
  }

  if (!key) {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        if (data.mapsKey) {
          key = data.mapsKey;
        }
      }
    } catch (err) {
      console.warn('Could not fetch /api/config:', err);
    }
  }

  return key.trim();
}

/**
 * Initializes Google Maps widget and loads Google Maps JavaScript SDK if key exists.
 */
async function setupGoogleMapWidget() {
  setupMapToolbarButtons();

  const key = await resolveGoogleMapsApiKey();
  MapState.apiKey = key;

  if (key && key !== 'MY_GOOGLE_MAPS_KEY') {
    loadGoogleMapsApiScript(key);
  } else {
    // Render in-place fallback map canvas without static iframe
    renderFallbackMapCanvas();
  }
}

/**
 * Dynamically injects Google Maps JavaScript API script.
 */
function loadGoogleMapsApiScript(apiKey) {
  if (window.google && window.google.maps) {
    MapState.isApiLoaded = true;
    initInteractiveMap();
    return;
  }

  const existingScript = document.getElementById('google-maps-api-script');
  if (existingScript) return;

  const script = document.createElement('script');
  script.id = 'google-maps-api-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&v=weekly`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    MapState.isApiLoaded = true;
    initInteractiveMap();
  };
  script.onerror = (err) => {
    console.warn('Failed to load Google Maps SDK, falling back to in-place canvas:', err);
    renderFallbackMapCanvas();
  };

  document.head.appendChild(script);
}

/**
 * Initializes the full interactive Google Map instance with markers.
 */
function initInteractiveMap() {
  const canvas = document.getElementById('google-map-canvas');
  if (!canvas || !window.google || !window.google.maps) return;

  canvas.style.display = 'block';
  updateStatusPill(true);

  // Initialize Map with attribution metadata
  MapState.map = new google.maps.Map(canvas, {
    center: MapState.smuCenter,
    zoom: 15,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    internalUsageAttributionIds: ['gmp_mcp_codeassist_v1_aistudio']
  });

  MapState.infoWindow = new google.maps.InfoWindow();

  // Add SMU Campus Landmark pin
  MapState.smuMarker = new google.maps.Marker({
    position: MapState.smuCenter,
    map: MapState.map,
    title: 'Singapore Management University (SMU Campus)',
    icon: createSmuPinIcon(),
    zIndex: 100
  });

  MapState.smuMarker.addListener('click', () => {
    MapState.infoWindow.setContent(`
      <div class="map-iw-card">
        <div class="map-iw-header">
          <div>
            <h4 class="map-iw-name">🎓 SMU Campus (Li Ka Shing)</h4>
            <span class="map-iw-badge">Central Pet Care Hub</span>
          </div>
        </div>
        <p class="map-iw-address">📍 81 Victoria St, Singapore 188065</p>
        <p style="font-size:0.75rem; color:#475569; margin:0 0 8px 0;">
          Meeting and pickup focal point for student & faculty pet parents. Shaded lawns and Fort Canning connectivity.
        </p>
        <button type="button" class="map-iw-btn map-iw-btn-primary" style="width:100%" onclick="window.fitAllProvidersOnMap()">
          View Nearby Sitters
        </button>
      </div>
    `);
    MapState.infoWindow.open(MapState.map, MapState.smuMarker);
  });

  // Render provider markers
  renderProviderMarkers();

  // If there is already a searched location, drop its pin and radius circle
  if (AppState.searchedLocation) {
    applySearchedLocationOnMap(AppState.searchedLocation, AppState.searchedLocation.formattedAddress);
  }

  // Update target label
  const targetLabel = document.getElementById('map-target-label');
  if (targetLabel) targetLabel.textContent = 'SMU Hub & Verified Providers';
}

/**
 * Creates SVG icon for SMU Campus Marker.
 */
function createSmuPinIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
      <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z" fill="#0f172a" stroke="#f59e0b" stroke-width="2.5"/>
      <circle cx="20" cy="19" r="14" fill="#fef3c7"/>
      <text x="20" y="24" font-size="14" text-anchor="middle" font-family="system-ui, sans-serif">🎓</text>
    </svg>
  `;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(40, 50),
    anchor: new google.maps.Point(20, 50)
  };
}

/**
 * Creates SVG icon for Searched Geocoded Location Marker.
 */
function createSearchedPinIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="52" viewBox="0 0 42 52">
      <path d="M21 0C9.4 0 0 9.4 0 21c0 16 21 31 21 31s21-15 21-31C42 9.4 32.6 0 21 0z" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>
      <circle cx="21" cy="20" r="14" fill="#ffffff"/>
      <text x="21" y="25" font-size="14" text-anchor="middle" font-family="system-ui, sans-serif">📍</text>
    </svg>
  `;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(42, 52),
    anchor: new google.maps.Point(21, 52)
  };
}

/**
 * Creates SVG pin for provider markers based on service type.
 */
function createProviderPinIcon(serviceType) {
  let color = '#0284c7';
  let emoji = '🐾';

  if (serviceType === 'walking') {
    color = '#059669';
    emoji = '🐕';
  } else if (serviceType === 'sitting') {
    color = '#0284c7';
    emoji = '🏠';
  } else if (serviceType === 'grooming') {
    color = '#7c3aed';
    emoji = '✂️';
  } else if (serviceType === 'transport') {
    color = '#d97706';
    emoji = '🚗';
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="46" viewBox="0 0 36 46">
      <path d="M18 0C8.1 0 0 8.1 0 18c0 13.5 18 28 18 28s18-14.5 18-28C36 8.1 27.9 0 18 0z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
      <circle cx="18" cy="17" r="12" fill="#ffffff"/>
      <text x="18" y="21" font-size="12" text-anchor="middle" font-family="system-ui, sans-serif">${emoji}</text>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(36, 46),
    anchor: new google.maps.Point(18, 46)
  };
}

/**
 * Applies a searched geocoded location to the interactive map:
 * - Drops a distinctive searched marker
 * - Draws a 1.5 km service radius circle
 * - Centers and zooms the map
 */
function applySearchedLocationOnMap(location, formattedAddress) {
  if (!MapState.map || !window.google) {
    updateEmbeddedMapIframe(`${location.lat},${location.lng}`, `Search: ${formattedAddress}`);
    return;
  }

  // Clear previous searched marker and circle
  if (MapState.searchedMarker) {
    MapState.searchedMarker.setMap(null);
    MapState.searchedMarker = null;
  }
  if (MapState.radiusCircle) {
    MapState.radiusCircle.setMap(null);
    MapState.radiusCircle = null;
  }

  const pos = { lat: Number(location.lat), lng: Number(location.lng) };

  // Drop searched marker
  MapState.searchedMarker = new google.maps.Marker({
    position: pos,
    map: MapState.map,
    title: `Searched Location: ${formattedAddress}`,
    icon: createSearchedPinIcon(),
    zIndex: 200,
    animation: google.maps.Animation.DROP
  });

  MapState.searchedMarker.addListener('click', () => {
    MapState.infoWindow.setContent(`
      <div class="map-iw-card">
        <div class="map-iw-header">
          <div>
            <h4 class="map-iw-name">📍 Searched Address</h4>
            <span class="map-iw-badge" style="background:#fee2e2;color:#991b1b;border-color:#fecaca;">Search Center</span>
          </div>
        </div>
        <p class="map-iw-address">${formattedAddress}</p>
        <p style="font-size:0.75rem; color:#0369a1; font-weight:600; margin:0 0 6px 0;">
          Showing verified caregivers within 1.5 km radius.
        </p>
      </div>
    `);
    MapState.infoWindow.open(MapState.map, MapState.searchedMarker);
  });

  // Draw 1.5 km radius circle
  MapState.radiusCircle = new google.maps.Circle({
    map: MapState.map,
    center: pos,
    radius: 1500, // 1.5 km in meters
    strokeColor: '#0284c7',
    strokeOpacity: 0.85,
    strokeWeight: 2,
    fillColor: '#38bdf8',
    fillOpacity: 0.12
  });

  // Center on searched location
  MapState.map.panTo(pos);
  MapState.map.setZoom(15);

  const targetLabel = document.getElementById('map-target-label');
  if (targetLabel) {
    targetLabel.textContent = `Search: ${formattedAddress} (1.5km)`;
  }
}

/**
 * Renders markers for active providers on the Google Map.
 */
function renderProviderMarkers() {
  if (!MapState.map || !window.google) return;

  // Clear existing markers
  MapState.markers.forEach(item => {
    if (item.marker) item.marker.setMap(null);
  });
  MapState.markers = [];

  const activeServiceChip = document.querySelector('.service-chip.active');
  const serviceFilter = activeServiceChip ? activeServiceChip.getAttribute('data-service') : 'all';
  const priceFilter = document.getElementById('filter-price-select')?.value || 'all';

  const visibleProviders = AppState.providers.filter(provider => {
    if (serviceFilter !== 'all' && !provider.services.includes(serviceFilter)) return false;
    if (priceFilter !== 'all') {
      const maxPrice = Number(priceFilter);
      const lowestRate = Math.min(...Object.values(provider.rates).filter(r => r > 0));
      if (lowestRate > maxPrice) return false;
    }
    if (AppState.searchedLocation) {
      const dist = calculateDistanceKm(AppState.searchedLocation.lat, AppState.searchedLocation.lng, provider.lat, provider.lng);
      if (dist > AppState.searchedRadiusKm) return false;
    }
    return true;
  });

  visibleProviders.forEach(provider => {
    if (!provider.lat || !provider.lng) return;

    const primaryService = provider.services[0] || 'sitting';
    const marker = new google.maps.Marker({
      position: { lat: provider.lat, lng: provider.lng },
      map: MapState.map,
      title: `${provider.name} (${provider.badge || 'Verified'})`,
      icon: createProviderPinIcon(primaryService),
      animation: google.maps.Animation.DROP
    });

    marker.addListener('click', () => {
      openProviderInfoWindow(provider, marker);
    });

    MapState.markers.push({
      providerId: provider.id,
      marker: marker,
      provider: provider
    });
  });

  const countElem = document.getElementById('map-provider-count');
  if (countElem) countElem.textContent = MapState.markers.length;
}

/**
 * Opens rich InfoWindow on the selected provider marker.
 */
function openProviderInfoWindow(provider, marker) {
  if (!MapState.infoWindow || !MapState.map) return;

  const primaryRate = provider.rates.walking || provider.rates.sitting || provider.rates.grooming || provider.rates.transport || 25;
  const servicesList = provider.services.map(s => capitalize(s)).join(', ');

  const distText = AppState.searchedLocation && typeof provider.searchedDistanceKm === 'number'
    ? `${provider.searchedDistanceKm.toFixed(2)} km from search`
    : `${provider.distanceKm || '0.5'} km from SMU`;

  const content = `
    <div class="map-iw-card">
      <div class="map-iw-header">
        <img class="map-iw-avatar" src="${provider.avatar}" alt="${provider.name}" onerror="this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'">
        <div>
          <h4 class="map-iw-name">${provider.name}</h4>
          <span class="map-iw-badge">${provider.badge || 'Verified Caregiver'}</span>
        </div>
      </div>
      <div class="map-iw-rating">⭐ ${provider.rating} (${provider.reviewCount} verified reviews)</div>
      <p class="map-iw-address">📍 ${provider.address}</p>
      <div style="font-size:0.75rem; color:#0369a1; font-weight:600; margin-bottom:6px;">
        📍 Distance: ${distText}
      </div>
      <div style="font-size:0.75rem; color:#475569; margin-bottom:6px;">
        <strong>Services:</strong> ${servicesList}
      </div>
      <div style="font-size:0.8125rem; font-weight:700; color:#0f172a; margin-bottom:8px;">
        Rate: $${primaryRate} SGD / session <span style="font-weight:400; color:#64748b;">(${primaryRate} credits)</span>
      </div>
      <div class="map-iw-actions">
        <button type="button" class="map-iw-btn map-iw-btn-primary" onclick="window.startBookingWithProvider('${provider.id}')">
          Book Sitter
        </button>
        <button type="button" class="map-iw-btn map-iw-btn-secondary" onclick="window.openReviewsModal('${provider.id}')">
          View Reviews
        </button>
      </div>
    </div>
  `;

  MapState.infoWindow.setContent(content);
  MapState.infoWindow.open(MapState.map, marker);

  const targetLabel = document.getElementById('map-target-label');
  if (targetLabel) targetLabel.textContent = `${provider.name} (${distText})`;
}

/**
 * Locates and centers the map on a provider.
 */
function locateProviderOnMap(providerId, address, name) {
  const targetLabel = document.getElementById('map-target-label');

  if (MapState.map && MapState.isApiLoaded) {
    const item = MapState.markers.find(m => m.providerId === providerId);
    if (item) {
      MapState.map.panTo(item.marker.getPosition());
      MapState.map.setZoom(16);
      openProviderInfoWindow(item.provider, item.marker);
      showToast(`Located ${name} on interactive map`, 'info');
      return;
    }
  }

  // If interactive JS API is not active, update the embedded Google Map
  updateEmbeddedMapIframe(`${name}, ${address}`, name);
  showToast(`Viewing ${name} on Google Maps`, 'info');
}

/**
 * Fits bounds of all verified providers and SMU hub.
 */
function fitAllProvidersOnMap() {
  if (!MapState.map || !window.google) {
    showToast('Interactive map is initializing...', 'info');
    return;
  }

  const bounds = new google.maps.LatLngBounds();
  bounds.extend(MapState.smuCenter);

  if (AppState.searchedLocation) {
    bounds.extend(AppState.searchedLocation);
  }

  MapState.markers.forEach(item => {
    if (item.marker) bounds.extend(item.marker.getPosition());
  });

  MapState.map.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });
  showToast('Viewing verified caregivers around SMU', 'info');

  const targetLabel = document.getElementById('map-target-label');
  if (targetLabel) targetLabel.textContent = 'All Providers around SMU';
}
window.fitAllProvidersOnMap = fitAllProvidersOnMap;

/**
 * Toggles the Fort Canning / SMU shaded dog walking park loop.
 */
function toggleParkWalkRoute() {
  if (!MapState.map || !window.google) return;

  if (MapState.routePolyline) {
    if (MapState.isRouteVisible) {
      MapState.routePolyline.setMap(null);
      MapState.isRouteVisible = false;
      document.getElementById('map-btn-toggle-route')?.classList.remove('active');
      showToast('Hidden dog walking park route', 'info');
    } else {
      MapState.routePolyline.setMap(MapState.map);
      MapState.isRouteVisible = true;
      document.getElementById('map-btn-toggle-route')?.classList.add('active');
      showToast('Showing shaded Fort Canning Dog Walk Loop (1.8 km)', 'success');
    }
    return;
  }

  // Create polyline route
  MapState.routePolyline = new google.maps.Polyline({
    path: MapState.parkRouteCoords.map(c => ({ lat: c.lat, lng: c.lng })),
    geodesic: true,
    strokeColor: '#059669',
    strokeOpacity: 0.85,
    strokeWeight: 5,
    map: MapState.map
  });

  MapState.isRouteVisible = true;
  document.getElementById('map-btn-toggle-route')?.classList.add('active');

  const bounds = new google.maps.LatLngBounds();
  MapState.parkRouteCoords.forEach(pt => bounds.extend(pt));
  MapState.map.fitBounds(bounds, 40);

  showToast('Showing shaded Fort Canning Dog Walk Loop (1.8 km)', 'success');
}

/**
 * Sets up map controls toolbar buttons.
 */
function setupMapToolbarButtons() {
  document.getElementById('map-btn-fit-all')?.addEventListener('click', fitAllProvidersOnMap);

  document.getElementById('map-btn-center-smu')?.addEventListener('click', () => {
    if (MapState.map) {
      MapState.map.panTo(MapState.smuCenter);
      MapState.map.setZoom(16);
      if (MapState.smuMarker) {
        google.maps.event.trigger(MapState.smuMarker, 'click');
      }
      showToast('Centered on SMU Campus Central Hub', 'info');
    }
  });

  document.getElementById('map-btn-toggle-route')?.addEventListener('click', toggleParkWalkRoute);
}

/**
 * Updates map header status badge.
 */
function updateStatusPill(isLive) {
  const pill = document.getElementById('map-status-pill');
  const title = document.getElementById('map-mode-title');
  if (!pill) return;

  if (isLive) {
    pill.textContent = 'Live Google Map';
    pill.className = 'map-status-pill';
    if (title) title.textContent = 'Interactive SMU Care Map';
  } else {
    pill.textContent = 'In-Place Care Map';
    pill.className = 'map-status-pill fallback';
    if (title) title.textContent = 'SMU Provider Location Map';
  }
}

/**
 * Fallback canvas renderer if Google Maps JavaScript SDK is not yet configured.
 * Embeds a real interactive Google Maps iframe directly within the page container.
 */
function renderFallbackMapCanvas(customLocation = 'Singapore Management University 188065', label = 'SMU Li Ka Shing Hub') {
  const canvas = document.getElementById('google-map-canvas');
  if (!canvas) return;

  updateStatusPill(false);
  canvas.style.display = 'block';
  canvas.style.padding = '0';
  canvas.style.background = '#e5e3df';

  const encoded = encodeURIComponent(customLocation);
  canvas.innerHTML = `
    <iframe 
      id="interactive-embedded-google-map"
      title="Embedded Google Map of ${label}"
      src="https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed" 
      style="width: 100%; height: 100%; border: 0; display: block;" 
      loading="lazy" 
      allowfullscreen>
    </iframe>
  `;

  const targetLabel = document.getElementById('map-target-label');
  if (targetLabel) targetLabel.textContent = label;
}

/**
 * Helper to update the embedded Google Map iframe location dynamically.
 */
function updateEmbeddedMapIframe(query, label) {
  const iframe = document.getElementById('interactive-embedded-google-map');
  const targetLabel = document.getElementById('map-target-label');
  
  if (iframe) {
    const encoded = encodeURIComponent(query);
    iframe.src = `https://maps.google.com/maps?q=${encoded}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  } else {
    renderFallbackMapCanvas(query, label);
  }

  if (targetLabel) {
    targetLabel.textContent = label || query;
  }
}

// ----------------------------------------------------------------------------
// 5. Service Booking Flow & Double-Booking Protection
// ----------------------------------------------------------------------------

/**
 * Sets up all booking flow event handlers.
 */
function setupBookingFormListeners() {
  // Service Type radio card options
  const serviceCards = document.querySelectorAll('.service-option-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');

      AppState.bookingDraft.serviceType = card.getAttribute('data-type');
      populateBookingDropdowns();
      renderTimeSlots();
      recalculateBookingSummary();
    });
  });

  // Provider dropdown change
  const providerSelect = document.getElementById('booking-provider-select');
  if (providerSelect) {
    providerSelect.addEventListener('change', (e) => {
      AppState.bookingDraft.providerId = e.target.value;
      renderTimeSlots();
      recalculateBookingSummary();
    });
  }

  // Pet dropdown change
  const petSelect = document.getElementById('booking-pet-select');
  if (petSelect) {
    petSelect.addEventListener('change', (e) => {
      AppState.bookingDraft.petName = e.target.value;
    });
  }

  // Date picker change
  const dateInput = document.getElementById('booking-date-input');
  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      AppState.bookingDraft.date = e.target.value;
      renderTimeSlots();
    });
  }

  // Duration select change
  const durationSelect = document.getElementById('booking-duration-select');
  if (durationSelect) {
    durationSelect.addEventListener('change', (e) => {
      AppState.bookingDraft.durationMinutes = Number(e.target.value);
      recalculateBookingSummary();
    });
  }

  // Addons checkboxes
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      AppState.bookingDraft.addOns = Array.from(addonCheckboxes)
        .filter(c => c.checked)
        .map(c => c.id);
      recalculateBookingSummary();
    });
  });

  // Payment mode toggle buttons (Credits vs Card)
  const payCreditsBtn = document.getElementById('pay-mode-credits-btn');
  const payCardBtn = document.getElementById('pay-mode-card-btn');

  if (payCreditsBtn && payCardBtn) {
    payCreditsBtn.addEventListener('click', () => {
      payCreditsBtn.classList.add('active');
      payCardBtn.classList.remove('active');
      AppState.bookingDraft.paymentMode = 'credits';
      recalculateBookingSummary();
    });

    payCardBtn.addEventListener('click', () => {
      payCardBtn.classList.add('active');
      payCreditsBtn.classList.remove('active');
      AppState.bookingDraft.paymentMode = 'card';
      recalculateBookingSummary();
    });
  }

  // Confirm booking button
  const confirmBtn = document.getElementById('confirm-booking-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', handleBookingSubmit);
  }
}

/**
 * Pre-selects a provider and transitions directly to the booking tab.
 * @param {string} providerId - ID of the selected provider
 */
function startBookingWithProvider(providerId) {
  AppState.bookingDraft.providerId = providerId;
  populateBookingDropdowns();
  renderTimeSlots();
  recalculateBookingSummary();
  switchTab('tab-booking');
  showToast('Provider selected. Please choose your date and time slot.', 'info');
}

/**
 * Populates provider and pet selection dropdowns in the booking form.
 */
function populateBookingDropdowns() {
  const providerSelect = document.getElementById('booking-provider-select');
  const petSelect = document.getElementById('booking-pet-select');

  if (providerSelect) {
    providerSelect.innerHTML = AppState.providers.map(p => {
      const isSelected = p.id === AppState.bookingDraft.providerId ? 'selected' : '';
      const rate = p.rates[AppState.bookingDraft.serviceType] || p.rates.walking || 28;
      return `<option value="${p.id}" ${isSelected}>${p.name} ($${rate}/hr) — ${p.address}</option>`;
    }).join('');

    if (!AppState.bookingDraft.providerId && AppState.providers.length > 0) {
      AppState.bookingDraft.providerId = AppState.providers[0].id;
    }
  }

  if (petSelect) {
    petSelect.innerHTML = AppState.pets.map(pet => {
      return `<option value="${pet.name}">${pet.name} (${pet.breed} - ${pet.size})</option>`;
    }).join('');

    if (AppState.pets.length > 0) {
      AppState.bookingDraft.petName = AppState.pets[0].name;
    }
  }
}

/**
 * Renders available time slots and disables already booked slots (Double-booking protection).
 */
function renderTimeSlots() {
  const container = document.getElementById('booking-slots-container');
  if (!container) return;

  const currentProviderId = AppState.bookingDraft.providerId || (AppState.providers[0]?.id);
  const currentDate = AppState.bookingDraft.date;
  const provider = AppState.providers.find(p => p.id === currentProviderId);

  const defaultSlots = provider?.availability || ["08:00 AM", "10:00 AM", "12:30 PM", "02:30 PM", "04:30 PM", "06:30 PM"];

  // Find existing bookings for this provider on this specific date
  const bookedSlots = AppState.bookings
    .filter(b => b.providerId === currentProviderId && b.date === currentDate && b.status !== 'cancelled')
    .map(b => b.timeSlot);

  container.innerHTML = defaultSlots.map(slot => {
    const isBooked = bookedSlots.includes(slot);
    const isSelected = AppState.bookingDraft.timeSlot === slot;

    if (isBooked) {
      return `
        <button type="button" class="time-slot-btn" disabled title="Slot already booked for this provider">
          ${slot} (Booked)
        </button>
      `;
    }

    return `
      <button type="button" class="time-slot-btn ${isSelected ? 'selected' : ''}" data-slot="${slot}">
        ${slot}
      </button>
    `;
  }).join('');

  // Attach slot click listeners
  container.querySelectorAll('.time-slot-btn:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      AppState.bookingDraft.timeSlot = btn.getAttribute('data-slot');
      recalculateBookingSummary();
    });
  });

  // Default to first open slot if current selection is invalid
  if (!AppState.bookingDraft.timeSlot || bookedSlots.includes(AppState.bookingDraft.timeSlot)) {
    const firstOpen = defaultSlots.find(s => !bookedSlots.includes(s));
    if (firstOpen) {
      AppState.bookingDraft.timeSlot = firstOpen;
      const firstBtn = container.querySelector(`[data-slot="${firstOpen}"]`);
      if (firstBtn) firstBtn.classList.add('selected');
    }
  }
}

/**
 * Dynamically computes base price, duration multiplier, add-ons, and credit equivalent.
 */
function recalculateBookingSummary() {
  const provider = AppState.providers.find(p => p.id === AppState.bookingDraft.providerId) || AppState.providers[0];
  const serviceType = AppState.bookingDraft.serviceType;
  const durationMinutes = AppState.bookingDraft.durationMinutes || 60;

  // 1. Base rate
  let baseRate = 28;
  if (provider && provider.rates) {
    baseRate = provider.rates[serviceType] || provider.rates.walking || 28;
  }

  // 2. Duration factor (60 mins = 1.0, 30 mins = 0.6, 90 mins = 1.5, 120 mins = 2.0)
  let durationFactor = durationMinutes / 60;
  if (durationMinutes === 30) durationFactor = 0.65;
  const durationAdjustedBase = baseRate * durationFactor;

  // 3. Add-ons sum
  let addonsSum = 0;
  let addonsCreditSum = 0;
  document.querySelectorAll('.addon-checkbox:checked').forEach(chk => {
    addonsSum += Number(chk.getAttribute('data-price') || 0);
    addonsCreditSum += Number(chk.getAttribute('data-credits') || 0);
  });

  // 4. Total calculation
  const totalSGD = durationAdjustedBase + addonsSum;
  const totalCredits = Math.round(totalSGD);

  // Update summary DOM nodes
  const basePriceElem = document.getElementById('summary-base-price');
  const durationTextElem = document.getElementById('summary-duration-text');
  const addonsPriceElem = document.getElementById('summary-addons-price');
  const totalPriceElem = document.getElementById('summary-total-price');
  const creditsPriceElem = document.getElementById('summary-credits-price');
  const balanceAfterElem = document.getElementById('checkout-balance-after-text');

  if (basePriceElem) basePriceElem.textContent = `$${baseRate.toFixed(2)} SGD / hr`;
  if (durationTextElem) durationTextElem.textContent = `${durationMinutes} mins (${durationFactor.toFixed(1)}x)`;
  if (addonsPriceElem) addonsPriceElem.textContent = `$${addonsSum.toFixed(2)} SGD`;
  if (totalPriceElem) totalPriceElem.textContent = `$${totalSGD.toFixed(2)} SGD`;
  if (creditsPriceElem) creditsPriceElem.textContent = `${totalCredits} Credits`;

  if (balanceAfterElem) {
    const afterBalance = AppState.userCredits - totalCredits;
    if (AppState.bookingDraft.paymentMode === 'credits') {
      if (afterBalance >= 0) {
        balanceAfterElem.textContent = `Balance after booking: ${afterBalance} credits`;
        balanceAfterElem.style.color = 'var(--md-sys-color-on-surface)';
      } else {
        balanceAfterElem.textContent = `Insufficient credits (Short by ${Math.abs(afterBalance)} credits). Please top up your bundle.`;
        balanceAfterElem.style.color = 'var(--md-sys-color-error)';
      }
    } else {
      balanceAfterElem.textContent = `Paying via Card ($${totalSGD.toFixed(2)} SGD). Credit balance unchanged.`;
      balanceAfterElem.style.color = 'var(--md-sys-color-on-surface)';
    }
  }

  // Store calculated values in draft
  AppState.bookingDraft.totalAmount = totalSGD;
  AppState.bookingDraft.creditCost = totalCredits;
}

/**
 * Handles booking form validation and posts to server API.
 */
async function handleBookingSubmit() {
  const { providerId, petName, serviceType, date, timeSlot, durationMinutes, addOns, paymentMode, totalAmount, creditCost } = AppState.bookingDraft;

  // Validation
  if (!providerId) {
    showToast('Please select a provider.', 'error');
    return;
  }
  if (!timeSlot) {
    showToast('Please select an available time slot.', 'error');
    return;
  }
  if (!date) {
    showToast('Please choose a valid booking date.', 'error');
    return;
  }

  // If paying with credits, verify sufficient balance
  if (paymentMode === 'credits' && AppState.userCredits < creditCost) {
    showToast(`Insufficient credits balance (${AppState.userCredits} available, ${creditCost} needed). Please top up first.`, 'error');
    switchTab('tab-credits');
    return;
  }

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        providerId,
        petName: petName || 'My Pet',
        serviceType,
        date,
        timeSlot,
        durationMinutes,
        addOns,
        paymentMethod: paymentMode,
        creditCost,
        totalAmount
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      showToast(result.error || 'Failed to complete booking.', 'error');
      return;
    }

    // Success: Update state
    AppState.bookings.push(result.booking);
    if (result.remainingCredits !== undefined) {
      AppState.userCredits = result.remainingCredits;
    }

    // Reload credit history
    await loadInitialData();

    // Show Confirmation Receipt Modal
    openBookingSuccessModal(result.booking);

  } catch (err) {
    console.error('Booking submission error:', err);
    showToast('Network error while booking. Please try again.', 'error');
  }
}

/**
 * Displays the booking confirmation receipt modal.
 */
function openBookingSuccessModal(booking) {
  const modal = document.getElementById('modal-booking-success');
  const receiptContent = document.getElementById('booking-receipt-content');
  if (!modal || !receiptContent) return;

  receiptContent.innerHTML = `
    <div class="pet-notes-box" style="line-height: 1.6;">
      <p style="font-size: 1.0625rem; font-weight: 700; color: var(--md-sys-color-primary); margin-bottom: 8px;">
        Reservation Ref: #${booking.id}
      </p>
      <p><strong>Service:</strong> ${capitalize(booking.serviceType)} (${booking.durationMinutes} minutes)</p>
      <p><strong>Provider:</strong> ${booking.providerName}</p>
      <p><strong>Pet:</strong> ${booking.petName}</p>
      <p><strong>Date & Time:</strong> ${booking.date} at ${booking.timeSlot}</p>
      <p><strong>Payment:</strong> ${booking.paymentMethod === 'credits' ? `${booking.creditCost} Credits Redeemed` : `$${booking.totalAmount.toFixed(2)} SGD (Card)`}</p>
      <p style="margin-top: 8px; font-size: 0.8125rem; color: var(--md-sys-color-outline);">
        📍 Location: SMU Downtown service area with live GPS tracking enabled.
      </p>
    </div>
  `;

  modal.classList.add('open');
}

// ----------------------------------------------------------------------------
// 6. Pet Profile Management (CRUD)
// ----------------------------------------------------------------------------

/**
 * Sets up Pet Profile manager buttons and modal form submissions.
 */
function setupPetManagerListeners() {
  const openModalBtn = document.getElementById('add-pet-modal-open-btn');
  const modal = document.getElementById('modal-pet-form');
  const form = document.getElementById('pet-profile-editor-form');

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
      // Reset form for creating new pet
      document.getElementById('pet-edit-id').value = '';
      document.getElementById('pet-name-input').value = '';
      document.getElementById('pet-breed-input').value = '';
      document.getElementById('pet-needs-input').value = '';
      document.getElementById('pet-form-modal-title').textContent = 'Add New Pet';
      modal.classList.add('open');
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleSavePetProfile();
    });
  }
}

/**
 * Handles adding or editing a pet and saving to the server / local state.
 */
async function handleSavePetProfile() {
  const id = document.getElementById('pet-edit-id').value;
  const name = document.getElementById('pet-name-input').value.trim();
  const species = document.getElementById('pet-species-select').value;
  const breed = document.getElementById('pet-breed-input').value.trim();
  const size = document.getElementById('pet-size-select').value;
  const age = Number(document.getElementById('pet-age-input').value) || 2;
  const specialNeeds = document.getElementById('pet-needs-input').value.trim();
  const emergencyContact = document.getElementById('pet-emergency-input').value.trim();

  if (!name || !breed) {
    showToast('Please enter both a pet name and breed.', 'error');
    return;
  }

  try {
    const res = await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id || undefined,
        name,
        species,
        breed,
        size,
        age,
        specialNeeds,
        emergencyContact
      })
    });

    const result = await res.json();
    if (result.success) {
      showToast(result.message || 'Pet profile saved!', 'success');
      document.getElementById('modal-pet-form').classList.remove('open');
      await loadInitialData();
    } else {
      showToast(result.error || 'Failed to save pet.', 'error');
    }
  } catch (err) {
    console.error('Error saving pet:', err);
    showToast('Network error while saving pet profile.', 'error');
  }
}

/**
 * Renders the pet profile cards.
 */
function renderPetsList() {
  const container = document.getElementById('pets-list-container');
  if (!container) return;

  if (AppState.pets.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 32px; text-align: center; background: #fff; border-radius: 12px;">
        <p>No pets registered yet. Click "Add New Pet" above to add your furry friend!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.pets.map(pet => {
    const photo = pet.photo || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80';

    return `
      <article class="pet-profile-card" id="pet-card-${pet.id}">
        <img src="${photo}" alt="${pet.name} the ${pet.breed}" class="pet-photo" loading="lazy">
        <div class="pet-content">
          <div class="pet-name-badge">
            <h3 class="pet-title">${pet.name}</h3>
            <span class="pet-species-chip">${pet.breed}</span>
          </div>

          <div class="pet-detail-row">
            <strong>Size:</strong> ${pet.size} | <strong>Age:</strong> ${pet.age} years old
          </div>

          <div class="pet-notes-box">
            <strong>Care & Health Notes:</strong><br>
            ${pet.specialNeeds || 'Standard care routine.'}
          </div>

          <div class="pet-detail-row" style="font-size: 0.8125rem; color: var(--md-sys-color-outline); margin-top: 4px;">
            Emergency: ${pet.emergencyContact || '+65 9123 4567'}
          </div>

          <div class="pet-card-actions">
            <button type="button" class="btn-secondary pet-ai-brief-btn" data-pet-id="${pet.id}" title="Generate Gemini AI Care Briefing">
              ✨ AI Briefing
            </button>
            <button type="button" class="btn-primary pet-book-btn" data-pet-name="${pet.name}">
              Book Care
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach action buttons
  container.querySelectorAll('.pet-ai-brief-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const petId = btn.getAttribute('data-pet-id');
      const pet = AppState.pets.find(p => p.id === petId);
      if (pet) {
        requestAiCareSummary(pet);
      }
    });
  });

  container.querySelectorAll('.pet-book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const petName = btn.getAttribute('data-pet-name');
      AppState.bookingDraft.petName = petName;
      switchTab('tab-booking');
    });
  });
}

// ----------------------------------------------------------------------------
// 7. Credit Package System (Bundles, Purchasing & History)
// ----------------------------------------------------------------------------

/**
 * Sets up credit bundle interactions and top-up modal.
 */
function setupCreditSystemListeners() {
  const confirmPurchaseBtn = document.getElementById('confirm-purchase-btn');
  if (confirmPurchaseBtn) {
    confirmPurchaseBtn.addEventListener('click', handleConfirmCreditPurchase);
  }
}

/**
 * Renders tiered discount credit bundle cards.
 */
function renderCreditBundles() {
  const container = document.getElementById('credit-bundles-container');
  if (!container) return;

  const bundles = AppState.creditBundles.length > 0 ? AppState.creditBundles : [
    { id: 'b_starter', name: 'Starter Pack', credits: 50, priceSGD: 48, ratePerCredit: 0.96, discountLabel: 'Standard Rate' },
    { id: 'b_popular', name: 'Popular Bundle', credits: 120, priceSGD: 99, ratePerCredit: 0.82, discountLabel: 'Save 18% — Most Popular', popular: true },
    { id: 'b_pro', name: 'Pro Care Pass', credits: 300, priceSGD: 219, ratePerCredit: 0.73, discountLabel: 'Save 27%' },
    { id: 'b_elite', name: 'Elite VIP Club', credits: 700, priceSGD: 449, ratePerCredit: 0.64, discountLabel: 'Save 36% — Best Value' }
  ];

  container.innerHTML = bundles.map(bundle => {
    return `
      <div class="bundle-card ${bundle.popular ? 'popular' : ''}" id="bundle-${bundle.id}">
        ${bundle.popular ? '<span class="popular-ribbon">Most Popular</span>' : ''}
        <h4 class="bundle-name">${bundle.name}</h4>
        <div class="bundle-credits">💎 ${bundle.credits} <span style="font-size: 1rem; font-weight: 500;">Credits</span></div>
        <div class="bundle-price-row">
          <span class="bundle-price">$${bundle.priceSGD} SGD</span>
          <span class="bundle-rate">$${bundle.ratePerCredit.toFixed(2)}/cr</span>
        </div>
        <div class="bundle-discount-tag">${bundle.discountLabel}</div>
        <button type="button" class="btn-primary buy-bundle-btn" data-bundle-id="${bundle.id}" style="margin-top: auto;">
          Top Up ${bundle.credits} Cr
        </button>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.buy-bundle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bundleId = btn.getAttribute('data-bundle-id');
      const bundle = bundles.find(b => b.id === bundleId);
      if (bundle) openPurchaseModal(bundle);
    });
  });
}

/**
 * Opens the purchase confirmation dialog.
 */
function openPurchaseModal(bundle) {
  AppState.selectedBundleForPurchase = bundle;
  const modal = document.getElementById('modal-purchase-credits');
  const detailsBox = document.getElementById('purchase-bundle-details-box');
  
  if (detailsBox) {
    detailsBox.innerHTML = `
      <h4 style="font-size: 1.125rem; color: var(--md-sys-color-primary); font-weight: 700; margin-bottom: 6px;">
        ${bundle.name}
      </h4>
      <p><strong>Credits Added:</strong> +${bundle.credits} Credits</p>
      <p><strong>Total Price:</strong> $${bundle.priceSGD}.00 SGD</p>
      <p><strong>Effective Rate:</strong> $${bundle.ratePerCredit.toFixed(2)} SGD per credit (${bundle.discountLabel})</p>
    `;
  }

  if (modal) modal.classList.add('open');
}

/**
 * Submits the credit purchase request to the backend server.
 */
async function handleConfirmCreditPurchase() {
  const bundle = AppState.selectedBundleForPurchase;
  if (!bundle) return;

  try {
    const res = await fetch('/api/credits/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bundleId: bundle.id })
    });

    const result = await res.json();
    if (result.success) {
      showToast(result.message || `Added ${bundle.credits} credits!`, 'success');
      document.getElementById('modal-purchase-credits').classList.remove('open');
      await loadInitialData();
    } else {
      showToast(result.error || 'Purchase failed.', 'error');
    }
  } catch (err) {
    console.error('Credit purchase error:', err);
    showToast('Network error during purchase.', 'error');
  }
}

/**
 * Updates all credit balance widgets across the UI.
 */
function updateCreditBalanceDisplays() {
  const headerElem = document.getElementById('header-credits-display');
  const heroElem = document.getElementById('hero-credits-amount');
  const checkoutElem = document.getElementById('checkout-balance-display');

  if (headerElem) headerElem.textContent = `${AppState.userCredits} Credits`;
  if (heroElem) heroElem.textContent = `${AppState.userCredits}`;
  if (checkoutElem) checkoutElem.textContent = `${AppState.userCredits} credits`;
}

/**
 * Renders the credit ledger transaction history table.
 */
function renderCreditHistoryTable() {
  const tbody = document.getElementById('credit-history-tbody');
  if (!tbody) return;

  if (AppState.creditHistory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px;">No transactions recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = AppState.creditHistory.map(tx => {
    const dateFormatted = new Date(tx.timestamp).toLocaleDateString('en-SG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const isPositive = tx.credits > 0;
    const creditClass = isPositive ? 'tx-positive' : 'tx-negative';
    const creditSign = isPositive ? `+${tx.credits}` : `${tx.credits}`;

    return `
      <tr>
        <td>${dateFormatted}</td>
        <td><strong>${tx.bundleName}</strong><br><span style="font-size:0.75rem;color:var(--md-sys-color-outline);">${tx.note || ''}</span></td>
        <td><span class="service-tag">${capitalize(tx.type)}</span></td>
        <td class="${creditClass}">${creditSign} cr</td>
        <td>${tx.amountSGD > 0 ? `$${tx.amountSGD} SGD` : '—'}</td>
      </tr>
    `;
  }).join('');
}

// ----------------------------------------------------------------------------
// 8. AI Care Concierge (Gemini 3.7 Flash Serverless Integration)
// ----------------------------------------------------------------------------

/**
 * Sets up AI panel form submission and quick-action triggers.
 */
function setupAiConciergeListeners() {
  // Integrated quick buttons on providers directory
  document.getElementById('ai-quick-recommend-btn')?.addEventListener('click', () => {
    const selectedPet = AppState.pets[0] || { name: 'Mochi', breed: 'Corgi' };
    requestAiRecommendation(selectedPet);
  });

  document.getElementById('ai-quick-itinerary-btn')?.addEventListener('click', () => {
    const selectedPet = AppState.pets[0] || { name: 'Mochi', breed: 'Corgi' };
    requestAiItinerary(selectedPet);
  });

  document.getElementById('ai-quick-care-summary-btn')?.addEventListener('click', () => {
    const selectedPet = AppState.pets[0] || { name: 'Mochi', breed: 'Corgi' };
    requestAiCareSummary(selectedPet);
  });

  // Prompt form on directory tab
  document.getElementById('ai-prompt-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('ai-custom-input')?.value.trim();
    if (query) runAiCustomQuery(query, 'ai-result-text', 'ai-response-container', 'ai-loading-indicator');
  });

  // Full AI Desk tab listeners
  document.getElementById('ai-desk-walker-match')?.addEventListener('click', () => {
    const pet = AppState.pets[0] || { name: 'Mochi', breed: 'Corgi' };
    requestAiRecommendation(pet, 'ai-desk-output-content');
  });

  document.getElementById('ai-desk-care-summary')?.addEventListener('click', () => {
    const pet = AppState.pets[0] || { name: 'Mochi', breed: 'Corgi' };
    requestAiCareSummary(pet, 'ai-desk-output-content');
  });

  document.getElementById('ai-desk-smu-route')?.addEventListener('click', () => {
    const pet = AppState.pets[0] || { name: 'Mochi', breed: 'Corgi' };
    requestAiItinerary(pet, 'ai-desk-output-content');
  });

  document.getElementById('ai-desk-safety-check')?.addEventListener('click', () => {
    runAiCustomQuery('Give me a tropical heat safety checklist for dog walking around Bras Basah & Fort Canning Park in Singapore.', 'ai-desk-output-content');
  });

  document.getElementById('ai-desk-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('ai-desk-input')?.value.trim();
    if (query) runAiCustomQuery(query, 'ai-desk-output-content');
  });
}

/**
 * Sends a recommendation request to the Gemini AI server-side API.
 */
async function requestAiRecommendation(pet, targetResultId = 'ai-result-text') {
  showAiLoading(true, targetResultId);

  try {
    const res = await fetch('/api/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'recommend_walker',
        pet: pet,
        serviceType: AppState.bookingDraft.serviceType,
        date: AppState.bookingDraft.date
      })
    });

    const result = await res.json();
    renderAiStructuredResult(result.data, targetResultId);

  } catch (err) {
    console.error('AI recommendation error:', err);
    showToast('AI service currently busy. Please try again.', 'error');
  } finally {
    showAiLoading(false, targetResultId);
  }
}

/**
 * Sends a pet care summary request to the Gemini API.
 */
async function requestAiCareSummary(pet, targetResultId = 'ai-result-text') {
  showAiLoading(true, targetResultId);

  try {
    const res = await fetch('/api/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'care_summary',
        pet: pet
      })
    });

    const result = await res.json();
    renderAiStructuredResult(result.data, targetResultId);

  } catch (err) {
    console.error('AI care summary error:', err);
    showToast('Failed to generate AI care summary.', 'error');
  } finally {
    showAiLoading(false, targetResultId);
  }
}

/**
 * Sends an itinerary generation request to the Gemini API.
 */
async function requestAiItinerary(pet, targetResultId = 'ai-result-text') {
  showAiLoading(true, targetResultId);

  // Automatically activate park route polyline on map if available
  if (MapState.map && !MapState.isRouteVisible) {
    toggleParkWalkRoute();
  }

  try {
    const res = await fetch('/api/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'itinerary',
        pet: pet
      })
    });

    const result = await res.json();
    renderAiStructuredResult(result.data, targetResultId);

  } catch (err) {
    console.error('AI itinerary error:', err);
    showToast('Failed to generate itinerary.', 'error');
  } finally {
    showAiLoading(false, targetResultId);
  }
}

/**
 * Runs a custom text query through the Gemini server endpoint.
 */
async function runAiCustomQuery(query, targetResultId = 'ai-result-text') {
  showAiLoading(true, targetResultId);

  try {
    const res = await fetch('/api/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'custom',
        query: query,
        pet: AppState.pets[0]
      })
    });

    const result = await res.json();
    renderAiStructuredResult(result.data, targetResultId);

  } catch (err) {
    console.error('AI query error:', err);
    showToast('Failed to process AI query.', 'error');
  } finally {
    showAiLoading(false, targetResultId);
  }
}

/**
 * Toggles the AI loading spinner.
 */
function showAiLoading(isLoading, targetResultId) {
  const box = document.getElementById('ai-response-container');
  const indicator = document.getElementById('ai-loading-indicator');
  const resultDiv = document.getElementById(targetResultId);

  if (box) box.classList.add('visible');
  if (indicator && targetResultId === 'ai-result-text') {
    indicator.style.display = isLoading ? 'flex' : 'none';
  }

  if (isLoading && resultDiv) {
    resultDiv.innerHTML = `<p style="color:var(--md-sys-color-primary);font-style:italic;">Processing with Gemini 3.7 Flash...</p>`;
  }
}

/**
 * Formats and renders the structured AI JSON response.
 */
function renderAiStructuredResult(data, targetResultId = 'ai-result-text') {
  const container = document.getElementById(targetResultId);
  if (!container || !data) return;

  let html = `
    <h4 class="ai-result-title">${data.title || 'AI Care Consultation'}</h4>
    <p class="ai-result-summary">${data.summary || ''}</p>
  `;

  // Render provider recommendations if available
  if (data.recommendations && data.recommendations.length > 0) {
    html += `
      <ul class="ai-recom-list">
        ${data.recommendations.map(r => `
          <li class="ai-recom-item">
            <div class="ai-recom-provider">
              <span>${r.providerName}</span>
              <span class="ai-score-pill">${r.matchScore || 'Top Match'}</span>
            </div>
            <p style="font-size: 0.875rem; margin-top: 4px; color: var(--md-sys-color-on-surface-variant);">${r.reason}</p>
          </li>
        `).join('')}
      </ul>
    `;
  }

  // Render key points / briefing checklist if available
  if (data.keyPoints && data.keyPoints.length > 0) {
    html += `
      <ul class="ai-keypoint-list" style="margin-top: 8px;">
        ${data.keyPoints.map(kp => `
          <li style="font-size: 0.875rem; display: flex; gap: 6px; align-items: baseline;">
            <span style="color: var(--md-sys-color-primary);">✔</span> <span>${kp}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }

  // Render timeline if available
  if (data.timeline && data.timeline.length > 0) {
    html += `
      <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
        ${data.timeline.map(item => `
          <div style="background: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.875rem; border-left: 3px solid var(--md-sys-color-secondary);">
            <strong>${item.time}:</strong> ${item.activity}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Render safety tips if available
  if (data.safetyTips && data.safetyTips.length > 0) {
    html += `
      <div style="margin-top: 10px; padding: 8px; background: #fff8e1; border-radius: 6px; font-size: 0.8125rem;">
        <strong>⚠️ Singapore Climate & Location Safety Tips:</strong>
        <ul style="padding-left: 16px; margin-top: 4px;">
          ${data.safetyTips.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  container.innerHTML = html;
}

// ----------------------------------------------------------------------------
// 9. Reviews & Ratings Modal System
// ----------------------------------------------------------------------------

/**
 * Opens reviews modal for a specific provider.
 */
function openReviewsModal(providerId) {
  const provider = AppState.providers.find(p => p.id === providerId);
  if (!provider) return;

  AppState.selectedProviderForReviews = provider;

  const modal = document.getElementById('modal-reviews');
  const title = document.getElementById('reviews-modal-title');
  const list = document.getElementById('reviews-list-container');
  const idInput = document.getElementById('review-provider-id');

  if (title) title.textContent = `Reviews for ${provider.name} (${provider.rating} ★)`;
  if (idInput) idInput.value = provider.id;

  if (list) {
    const reviews = provider.reviews || [];
    if (reviews.length === 0) {
      list.innerHTML = `<p style="padding: 16px 0; color: var(--md-sys-color-outline);">No written reviews yet. Be the first to leave a review!</p>`;
    } else {
      list.innerHTML = reviews.map(r => `
        <div style="border-bottom: 1px solid var(--md-sys-color-outline-variant); padding: 12px 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <strong>${r.author}</strong>
            <span style="color: #f59e0b;">${'★'.repeat(r.rating || 5)}</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--md-sys-color-outline);">${r.petName} • ${r.date}</div>
          <p style="font-size: 0.875rem; margin-top: 4px;">${r.comment}</p>
        </div>
      `).join('');
    }
  }

  if (modal) modal.classList.add('open');
}

// ----------------------------------------------------------------------------
// 10. Modal Dismissal Helpers
// ----------------------------------------------------------------------------

/**
 * Sets up closing handlers for all modals when clicking cancel, close (X), or the backdrop.
 */
function setupModalDismissals() {
  document.querySelectorAll('.btn-close, .modal-footer .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
    });
  });

  // Success modal Done button switches to Bookings view
  document.getElementById('success-modal-done-btn')?.addEventListener('click', () => {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
    switchTab('tab-providers');
  });

  // Click on background backdrop closes modal
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });

  // Review submission handler
  const reviewForm = document.getElementById('add-review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const providerId = document.getElementById('review-provider-id').value;
      const author = document.getElementById('review-author-input').value.trim();
      const petName = document.getElementById('review-pet-input').value.trim();
      const rating = document.getElementById('review-rating-select').value;
      const comment = document.getElementById('review-comment-input').value.trim();

      try {
        const res = await fetch(`/api/providers/${providerId}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ author, petName, rating, comment })
        });

        const result = await res.json();
        if (result.success) {
          showToast('Thank you! Your review was posted.', 'success');
          reviewForm.reset();
          await loadInitialData();
          openReviewsModal(providerId);
        }
      } catch (err) {
        console.error('Error submitting review:', err);
        showToast('Failed to post review.', 'error');
      }
    });
  }
}
