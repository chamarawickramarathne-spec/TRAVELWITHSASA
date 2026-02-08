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
          <div class="text-overline text-primary font-weight-bold">Along Your Route</div>
          <h2 class="text-h4 font-weight-bold text-uppercase">
            Exclusive <span class="text-secondary">Stopovers</span>
          </h2>
          <div class="section-underline mx-auto"></div>
          <p class="text-subtitle1 text-grey-7 q-mt-sm">
            Hand-picked locations that you shouldn't miss on this journey.
          </p>
        </div>

        <div class="row q-col-gutter-xl">
          <div v-for="place in recommendedPlaces" :key="place.name" class="col-12">
            <q-card flat class="place-detail-card row no-wrap overflow-hidden bordered" bordered>
              <div class="col-12 col-md-5">
                <q-img :src="place.image" class="full-height">
                  <div class="absolute-top-left q-ma-md">
                    <q-chip
                      color="secondary"
                      text-color="white"
                      icon="star"
                      class="text-bold"
                      label="Top Rated"
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
                      <span class="text-caption text-grey-7">({{ place.reviews }})</span>
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
                    />
                  </div>

                  <p class="text-body1 text-grey-8">{{ place.fullDescription }}</p>

                  <div class="row q-col-gutter-md q-mt-md">
                    <div class="col-6">
                      <div class="row items-center q-gutter-sm">
                        <q-icon name="schedule" color="primary" size="20px" />
                        <div>
                          <div class="text-caption text-grey-6">Best Time</div>
                          <div class="text-subtitle2">{{ place.bestTime }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row items-center q-gutter-sm">
                        <q-icon name="hourglass_empty" color="primary" size="20px" />
                        <div>
                          <div class="text-caption text-grey-6">Duration</div>
                          <div class="text-subtitle2">{{ place.duration }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-mt-xl row items-center justify-between">
                  <div class="row items-center q-gutter-md">
                    <div v-for="act in place.activities" :key="act" class="text-center">
                      <q-icon :name="getActivityIcon(act)" color="grey-6" size="24px" />
                      <div class="text-tiny text-grey-6 capitalize">{{ act }}</div>
                    </div>
                  </div>
                  <div class="q-gutter-sm">
                    <q-btn
                      flat
                      color="primary"
                      label="Read More"
                      no-caps
                      class="font-weight-bold"
                    />
                    <q-btn
                      unelevated
                      color="secondary"
                      label="Include in Plan"
                      icon="add"
                      no-caps
                      class="q-px-lg rounded-pill"
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
  }
  return icons[activity.toLowerCase()] || 'explore'
}

const mockData = {
  ella: [
    {
      name: 'Ravana Falls',
      description: 'Experience the thunderous beauty of the mists.',
      fullDescription:
        'One of the widest waterfalls in Sri Lanka, Ravana Falls is a must-visit. Legend says King Ravana hid Princess Sita in the caves behind this waterfall, which are reachable for adventurous hikers.',
      image:
        'https://images.unsplash.com/photo-1588612140410-6c9f2852b75a?q=80&w=1200&auto=format&fit=crop',
      rating: 4.8,
      reviews: '1.2k',
      tags: ['Waterfall', 'Photography', 'Heritage'],
      bestTime: 'Early Mornings',
      duration: '45 mins',
      activities: ['Photography', 'Sightseeing'],
    },
    {
      name: 'Little Adams Peak',
      description: 'Golden hour views across the central highlands.',
      fullDescription:
        'An easy hike that rewards you with 360-degree views of the Ella Gap. It is named after the sacred Adams Peak due to its similar shape but much easier accessibility.',
      image:
        'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
      rating: 4.9,
      reviews: '2.5k',
      tags: ['Hiking', 'Nature', 'Easy'],
      bestTime: 'Sunrise or Sunset',
      duration: '1-2 Hours',
      activities: ['Hiking', 'Photography'],
    },
    {
      name: 'Nine Arch Bridge',
      description: 'Iconic colonial engineering amidst lush tea.',
      fullDescription:
        'Hidden in a dense jungle, this majestic colonial-era railway bridge is built entirely out of stone and bricks without a single piece of steel. A masterpiece of local engineering.',
      image:
        'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
      rating: 4.7,
      reviews: '3.1k',
      tags: ['History', 'Railways', 'Design'],
      bestTime: 'Best for Train Timing',
      duration: '1 Hour',
      activities: ['History', 'Photography'],
    },
  ],
  sigiriya: [
    {
      name: 'Dambulla Cave Temple',
      description: 'Ancient spiritual art in a rock cavern.',
      fullDescription:
        'A UNESCO World Heritage site, this Cave Temple complex is the largest and best-preserved in Sri Lanka. It houses 153 Buddha statues and stunning ceiling frescoes.',
      image:
        'https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=1200&auto=format&fit=crop',
      rating: 4.6,
      reviews: '1.8k',
      tags: ['Spiritual', 'UNESCO', 'Art'],
      bestTime: '8 AM - 10 AM',
      duration: '1.5 Hours',
      activities: ['Meditation', 'History'],
    },
    {
      name: 'Pidurangala Rock',
      description: 'The absolute best perspective of the Lion Rock.',
      fullDescription:
        'While thousands climb Sigiriya, the real view is from Pidurangala. This challenging climb offers the perfect panoramic view of the Fortress of Sigiriya against the horizon.',
      image:
        'https://images.unsplash.com/photo-1588596389718-47291a10052c?q=80&w=1200&auto=format&fit=crop',
      rating: 4.9,
      reviews: '950',
      tags: ['Adventure', 'Viewpoint', 'Sunrise'],
      bestTime: 'Sunrise (5:30 AM)',
      duration: '2 Hours',
      activities: ['Hiking', 'Photography'],
    },
    {
      name: 'Minneriya Safari',
      description: 'The largest gathering of wild elephants at dusk.',
      fullDescription:
        'Known for "The Gathering", Minneriya is where hundreds of wild elephants congregate around the tank. It is an unparalleled wildlife experience in Asia.',
      image:
        'https://images.unsplash.com/photo-1549405178-68e7f1e78457?q=80&w=1200&auto=format&fit=crop',
      rating: 4.8,
      reviews: '1.4k',
      tags: ['Wildlife', 'Animals', 'Jeep'],
      bestTime: 'Late Afternoon',
      duration: '3 Hours',
      activities: ['Wildlife', 'Safari'],
    },
  ],
  galle: [
    {
      name: 'Unawatuna Beach',
      description: 'Sun-drenched golden sands and reef waves.',
      fullDescription:
        'A world-famous beach shaped like a crescent. Its calm waters make it perfect for swimming and snorkeling, with a vibrant nightlife along the shore.',
      image:
        'https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=1200&auto=format&fit=crop',
      rating: 4.5,
      reviews: '4k',
      tags: ['Scuba', 'Beach', 'Leisure'],
      bestTime: 'November - April',
      duration: 'All Day',
      activities: ['Swimming', 'Photography'],
    },
    {
      name: 'Koggala Lake',
      description: 'Serene boat rides and traditional stilt fishing.',
      fullDescription:
        'One of the largest lakes in the south, famous for its bird islands and cinnamon plantations. Here you can witness the traditional stilt fishermen of Lanka.',
      image:
        'https://images.unsplash.com/photo-1544218520-43510e15645e?q=80&w=1200&auto=format&fit=crop',
      rating: 4.3,
      reviews: '600',
      tags: ['Culture', 'Boating', 'Peaceful'],
      bestTime: 'Late Morning',
      duration: '2 Hours',
      activities: ['Sightseeing', 'Photography'],
    },
    {
      name: 'Hikkaduwa Reef',
      description: 'Turquoise waters teeming with marine life.',
      fullDescription:
        'A sanctuary for turtles and colorful fish. Take a glass-bottom boat or go snorkeling to explore the shallow coral gardens clearly visible through the water.',
      image:
        'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
      rating: 4.4,
      reviews: '2.1k',
      tags: ['Marine', 'Snorkeling', 'Turtles'],
      bestTime: 'Morning (High Visibility)',
      duration: '2 Hours',
      activities: ['Swimming', 'Wildlife'],
    },
  ],
}

function handleUpdateRoute() {
  if (trip.value.destination) {
    loading.value = true
    setTimeout(() => {
      const dest = trip.value.destination.toLowerCase()
      let found = false
      for (const key in mockData) {
        if (dest.includes(key)) {
          recommendedPlaces.value = mockData[key]
          found = true
          break
        }
      }
      if (!found) {
        recommendedPlaces.value = [
          {
            name: 'Local Village Tour',
            description: 'Authentic encounters with local traditions.',
            fullDescription:
              'Experience the heartbeat of rural Sri Lanka. Visit traditional homes, watch pottery being made, and enjoy a meal cooked over a wood fire by village locals.',
            image:
              'https://images.unsplash.com/photo-1544218520-43510e15645e?q=80&w=1200&auto=format&fit=crop',
            rating: 4.7,
            reviews: '300',
            tags: ['Village', 'Authentic', 'Culture'],
            bestTime: 'Morning',
            duration: '3 Hours',
            activities: ['History', 'Sightseeing'],
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
  min-height: 500px;
  background: #e5e3df;
}

.place-detail-card {
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: white;
  &:hover {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.text-tiny {
  font-size: 10px;
}
.capitalize {
  text-transform: capitalize;
}

.section-underline {
  width: 80px;
  height: 4px;
  background: var(--q-primary);
  margin-top: 10px;
  border-radius: 2px;
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
    transform: translateY(40px);
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
</style>
