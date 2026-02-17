<template>
  <q-page class="bg-grey-2 q-pb-xl">
    <!-- Header Section -->
    <div class="planner-header text-white flex items-center">
      <div class="container q-px-md">
        <h1 class="text-h4 font-weight-bold q-mb-none">
          Trip <span class="text-secondary">Planner</span>
        </h1>
        <p class="text-subtitle1 text-grey-4 q-mb-none">Design your Sri Lankan journey</p>
      </div>
    </div>

    <div class="container q-mt-sm">
      <div class="row q-col-gutter-lg">
        <!-- Input Form -->
        <div class="col-12 col-md-4">
          <q-card flat class="planner-card glass-card shadow-2">
            <q-card-section>
              <div class="text-h5 q-mb-lg font-weight-bold text-primary">Trip Details</div>

              <q-form @submit="handleUpdateRoute" class="q-gutter-md">
                <q-input
                  v-model="trip.origin"
                  label="Start From"
                  placeholder="e.g. Colombo, Negombo"
                  filled
                  color="primary"
                >
                  <template v-slot:prepend>
                    <q-icon name="my_location" color="primary" />
                  </template>
                </q-input>

                <q-input
                  v-model="trip.destination"
                  label="Destination"
                  placeholder="e.g. Ella, Sigiriya, Galle"
                  filled
                  color="primary"
                >
                  <template v-slot:prepend>
                    <q-icon name="place" color="secondary" />
                  </template>
                </q-input>

                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <q-input
                      v-model="trip.date"
                      type="date"
                      label="Start Date"
                      filled
                      stack-label
                    />
                  </div>
                  <div class="col-6">
                    <q-select
                      v-model="trip.travelers"
                      :options="['1 Person', '2 People', 'Family (4+)', 'Group (10+)']"
                      label="Travelers"
                      filled
                    />
                  </div>
                </div>

                <q-select
                  v-model="trip.vehicle"
                  :options="[
                    'Bike / Scooter',
                    'Train',
                    'Public Bus',
                    'Luxury SUV',
                    'Mini Van',
                    'Tourist Coach',
                  ]"
                  label="Preferred Way to Travel"
                  filled
                  color="primary"
                />

                <q-btn
                  label="Show Route & Plan"
                  type="submit"
                  color="secondary"
                  unelevated
                  class="full-width rounded-pill q-py-md font-weight-bold"
                  icon-right="map"
                  :loading="loading"
                />
              </q-form>
            </q-card-section>

            <q-separator inset />

            <q-card-section class="q-pt-md">
              <div class="text-subtitle2 text-grey-7 q-mb-sm">Why plan with SASA?</div>
              <div class="row items-center q-gutter-sm text-caption text-grey-8">
                <q-icon name="verified" color="positive" size="xs" />
                <span>Expert Local Drivers</span>
              </div>
              <div class="row items-center q-gutter-sm text-caption text-grey-8 q-mt-xs">
                <q-icon name="shield" color="positive" size="xs" />
                <span>Full Insurance Coverage</span>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Map Section -->
        <div class="col-12 col-md-8">
          <q-card
            flat
            class="planner-card map-container flex items-center justify-center overflow-hidden shadow-2"
          >
            <div v-if="!showMap" class="text-center q-pa-xl">
              <q-icon name="map" size="100px" color="grey-4" />
              <div class="text-h6 text-grey-5 q-mt-md">Enter your destination to see the route</div>
            </div>
            <iframe
              v-else
              width="100%"
              height="100%"
              style="border: 0"
              loading="lazy"
              allowfullscreen
              :src="currentMapUrl"
            ></iframe>
          </q-card>
        </div>
      </div>

      <!-- Places to Explore along the Route -->
      <div
        v-if="showMap && recommendedPlaces.length"
        class="q-mt-xl animate-fade-in section-reveal"
      >
        <div class="text-center q-mb-lg">
          <div class="text-overline text-primary font-weight-bold">Route Insights</div>
          <h2 class="text-h4 font-weight-bold text-uppercase">
            Exclusive <span class="text-secondary">Stopovers</span>
          </h2>
          <div class="section-underline mx-auto"></div>
          <p class="text-subtitle1 text-grey-7 q-mt-sm">
            Based on your path, we recommend these top-rated local spots from Google Maps data.
          </p>
        </div>

        <div class="row q-col-gutter-xl">
          <div v-for="place in recommendedPlaces" :key="place.name" class="col-12">
            <q-card flat class="place-detail-card row no-wrap overflow-hidden bordered" bordered>
              <div class="col-12 col-md-5">
                <q-img :src="place.image" class="full-height" :ratio="1">
                  <div class="absolute-top-left q-ma-md">
                    <q-chip
                      color="secondary"
                      text-color="white"
                      icon="star"
                      class="text-bold"
                      label="Top Recommendation"
                    />
                  </div>
                </q-img>
              </div>
              <div class="col-12 col-md-7 q-pa-lg flex flex-column justify-between">
                <div>
                  <div class="row items-center justify-between q-mb-sm">
                    <div class="text-h5 font-weight-bold text-primary">{{ place.name }}</div>
                    <div class="row items-center q-gutter-xs">
                      <q-rating v-model="place.rating" size="20px" color="orange" readonly />
                      <span class="text-caption text-grey-7 font-weight-bold text-h6 q-ml-sm">{{
                        place.rating
                      }}</span>
                      <span class="text-caption text-grey-6"
                        >({{ place.reviews }} Google Reviews)</span
                      >
                    </div>
                  </div>

                  <div class="row q-mb-md q-gutter-sm">
                    <q-chip
                      v-for="tag in place.tags"
                      :key="tag"
                      outline
                      color="secondary"
                      dense
                      size="sm"
                      :label="tag"
                      class="text-weight-bold"
                    />
                  </div>

                  <p class="text-body1 text-grey-8 line-height-1-6">{{ place.fullDescription }}</p>

                  <div class="row q-col-gutter-md q-mt-md">
                    <div class="col-6">
                      <div class="row items-center q-gutter-sm bg-grey-1 q-pa-sm rounded-borders">
                        <q-icon name="schedule" color="primary" size="24px" />
                        <div>
                          <div
                            class="text-caption text-grey-6 text-uppercase font-weight-bold"
                            style="font-size: 0.65rem"
                          >
                            Best Timing
                          </div>
                          <div class="text-subtitle2 text-primary">{{ place.bestTime }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row items-center q-gutter-sm bg-grey-1 q-pa-sm rounded-borders">
                        <q-icon name="hourglass_empty" color="primary" size="24px" />
                        <div>
                          <div
                            class="text-caption text-grey-6 text-uppercase font-weight-bold"
                            style="font-size: 0.65rem"
                          >
                            Recommended Stay
                          </div>
                          <div class="text-subtitle2 text-primary">{{ place.duration }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-mt-xl row items-center justify-between">
                  <div class="row items-center q-gutter-md">
                    <div v-for="act in place.activities" :key="act" class="text-center">
                      <q-icon
                        :name="getActivityIcon(act)"
                        color="primary"
                        size="28px"
                        class="q-mb-xs"
                        opacity="0.7"
                      />
                      <div class="text-tiny text-grey-7 capitalize font-weight-bold">{{ act }}</div>
                    </div>
                  </div>
                  <div class="q-gutter-sm">
                    <q-btn
                      flat
                      color="primary"
                      label="Details on Maps"
                      icon="open_in_new"
                      no-caps
                      class="font-weight-bold"
                    />
                    <q-btn
                      unelevated
                      color="secondary"
                      label="Add to My Journey"
                      icon="add"
                      no-caps
                      class="q-px-lg rounded-pill font-weight-bold shadow-2"
                    />
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer to prevent footer overlap -->
    <div class="q-py-xl"></div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const trip = ref({
  origin: '',
  destination: '',
  date: '',
  travelers: '2 People',
  vehicle: 'Bike / Scooter',
})

const showMap = ref(false)
const loading = ref(false)
const recommendedPlaces = ref([])

const mapUrlDemo = computed(() => {
  if (!showMap.value || !trip.value.destination) return null
  const query = `${trip.value.origin ? trip.value.origin + ' to ' : ''}${trip.value.destination}, Sri Lanka`
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
})

const currentMapUrl = computed(() => {
  return mapUrlDemo.value
})

const getActivityIcon = (activity) => {
  const icons = {
    photography: 'photo_camera',
    sightseeing: 'visibility',
    hiking: 'terrain',
    history: 'history_edu',
    wildlife: 'pets',
    safari: 'directions_car',
    surfing: 'waves',
    swimming: 'pool',
    meditation: 'self_improvement',
    rafting: 'sailing',
    aerial: 'flight_takeoff',
  }
  return icons[activity.toLowerCase()] || 'explore'
}

const mockData = {
  ella: [
    {
      name: 'Kitulgala White Water Rafting',
      fullDescription:
        'Located half-way to Ella, Kitulgala is the primary spot for adventure in Lanka. Famous for the filming of "The Bridge on the River Kwai", it offers world-class rafting on the Kelani River.',
      image:
        'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop',
      rating: 4.5,
      reviews: '2,800',
      tags: ['Adventure', 'Rafting', 'River'],
      bestTime: '10 AM - 3 PM',
      duration: '3 Hours',
      activities: ['Rafting', 'Photography'],
    },
    {
      name: 'St. Clairs Falls',
      fullDescription:
        'Commonly known as the "Little Niagara of Sri Lanka", this is one of the widest waterfalls in the country. A breathtaking stopover surrounded by the emerald green St. Clairs Tea Estate.',
      image:
        'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
      rating: 4.7,
      reviews: '1,500',
      tags: ['Waterfall', 'Tea Estate', 'Scenic'],
      bestTime: 'Late Morning',
      duration: '45 mins',
      activities: ['Photography', 'Sightseeing'],
    },
  ],
  sigiriya: [
    {
      name: 'Ethagala (Elephant Rock), Kurunegala',
      fullDescription:
        'Dominating the Kurunegala skyline, this massive rock shaped like an elephant features a towering 88ft Buddha statue at the summit. Offers a panoramic 360 view of the lake and city.',
      image:
        'https://images.unsplash.com/photo-1588596389718-47291a10052c?q=80&w=1200&auto=format&fit=crop',
      rating: 4.6,
      reviews: '3,200',
      tags: ['Viewpoint', 'Hiking', 'Historical'],
      bestTime: 'Sunrise or Sunset',
      duration: '1.5 Hours',
      activities: ['Hiking', 'Sightseeing'],
    },
    {
      name: 'Dambulla Royal Cave Temple',
      fullDescription:
        'A UNESCO World Heritage site located just before Sigiriya. Five separate caves containing 153 Buddha statues and stunning frescoes dating back over 2,000 years.',
      image:
        'https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=1200&auto=format&fit=crop',
      rating: 4.7,
      reviews: '18,200',
      tags: ['UNESCO', 'Historical', 'Buddhist'],
      bestTime: 'Morning (Cooler)',
      duration: '2 Hours',
      activities: ['History', 'Meditation'],
    },
  ],
  galle: [
    {
      name: 'Kosgoda Sea Turtle Hatchery',
      fullDescription:
        'A vital conservation project on the coastal road. See several species of sea turtles from hatchlings to rescued adults, and learn about their journey to the ocean.',
      image:
        'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1200&auto=format&fit=crop',
      rating: 4.4,
      reviews: '4,800',
      tags: ['Wildlife', 'Conservation', 'Nature'],
      bestTime: 'Evening Release',
      duration: '1 Hour',
      activities: ['Wildlife', 'Photography'],
    },
    {
      name: 'Madu River Mangrove Safari',
      fullDescription:
        'A prehistoric mangrove ecosystem in Balapitiya. Boat trips take you through tunnels of mangroves to islands for cinnamon peeling and fish therapy spas.',
      image:
        'https://images.unsplash.com/photo-1544218520-43510e15645e?q=80&w=1200&auto=format&fit=crop',
      rating: 4.5,
      reviews: '6,500',
      tags: ['Safari', 'Mangroves', 'River'],
      bestTime: 'Mid Morning',
      duration: '2 Hours',
      activities: ['Safari', 'Wildlife'],
    },
  ],
  trincomalee: [
    {
      name: 'Habarana (Minneriya Park Entrance)',
      fullDescription:
        'The gateway to the wildlife of the east. Best spot to witness "The Gathering" of wild elephants. An essential stop before reaching the coastal shores of Trinco.',
      image:
        'https://images.unsplash.com/photo-1549405178-68e7f1e78457?q=80&w=1200&auto=format&fit=crop',
      rating: 4.6,
      reviews: '2,500',
      tags: ['Wildlife', 'Safari', 'Elephant'],
      bestTime: 'Mid Afternoon',
      duration: '3.5 Hours',
      activities: ['Safari', 'Wildlife'],
    },
    {
      name: 'Aukana Buddha Statue',
      fullDescription:
        'Carved out of a single granite rock in the 5th century, this 40ft masterpiece of ancient art is one of the most pristine standing Buddhas in the world.',
      image:
        'https://images.unsplash.com/photo-162019767323-b95a89183081?q=80&w=1200&auto=format&fit=crop',
      rating: 4.8,
      reviews: '2,100',
      tags: ['Ancient Ruins', 'Religious', 'Art'],
      bestTime: 'Early Morning',
      duration: '1 Hour',
      activities: ['History', 'Sightseeing'],
    },
  ],
}

function handleUpdateRoute() {
  if (trip.value.destination) {
    loading.value = true
    setTimeout(() => {
      const dest = trip.value.destination.toLowerCase()
      let found = false
      recommendedPlaces.value = []

      for (const key in mockData) {
        if (dest.includes(key)) {
          recommendedPlaces.value = mockData[key]
          found = true
          break
        }
      }

      if (!found) {
        // More sophisticated generic stops for unknown destinations
        recommendedPlaces.value = [
          {
            name: 'Local Spices Garden',
            fullDescription:
              'Sri Lanka is the spice island of the world. Stop over to learn about Cinnamon, Cardamom and Cloves in their natural habitat.',
            image:
              'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
            rating: 4.2,
            reviews: '1,100',
            tags: ['Spices', 'Herbal', 'Garden'],
            bestTime: 'Daytime',
            duration: '1 Hour',
            activities: ['Sightseeing', 'History'],
          },
          {
            name: 'Tea Lounge Stop',
            fullDescription:
              'Enjoy a fresh cup of Ceylon Tea while looking over the rolling hills. A perfect break for any long journey in the island.',
            image:
              'https://images.unsplash.com/photo-1544733310-720dae5f800b?q=80&w=1200&auto=format&fit=crop',
            rating: 4.7,
            reviews: '850',
            tags: ['Tea', 'Relax', 'Lounge'],
            bestTime: 'Afternoon',
            duration: '40 mins',
            activities: ['Photography', 'Sightseeing'],
          },
        ]
      }

      showMap.value = true
      loading.value = false

      setTimeout(() => {
        const el = document.querySelector('.section-reveal')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }, 800)
  }
}
</script>

<style lang="scss" scoped>
.planner-header {
  height: 120px;
  background:
    linear-gradient(rgba(27, 67, 50, 0.9), rgba(0, 119, 182, 0.8)),
    url('https://images.unsplash.com/photo-1544218520-43510e15645e?q=80&w=1934&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.planner-card {
  border-radius: 20px;
  background: white;
  height: 100%;
}

.glass-card {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.map-container {
  min-height: 520px;
  background: #e5e3df;
  border-radius: 24px;
}

.place-detail-card {
  border-radius: 28px;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: white;
  min-height: 380px;
  &:hover {
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  @media (max-width: 960px) {
    flex-direction: column;
    .col-md-5,
    .col-md-7 {
      width: 100%;
      height: auto;
    }
    .q-img {
      height: 250px;
    }
  }
}

.line-height-1-6 {
  line-height: 1.6;
}
.text-tiny {
  font-size: 11px;
}
.capitalize {
  text-transform: capitalize;
}

.section-underline {
  width: 100px;
  height: 5px;
  background: var(--q-primary);
  margin-top: 12px;
  border-radius: 3px;
}

.rounded-pill {
  border-radius: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.shadow-2 {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
}
</style>
