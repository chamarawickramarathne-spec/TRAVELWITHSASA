<template>
  <q-page>
    <!-- Hero Section -->
    <div class="hero-section flex items-center justify-center text-center text-white relative">
      <div class="hero-overlay"></div>
      <div class="hero-content container q-px-md z-top">
        <h1 class="text-h2 font-weight-bold animate-fade-in text-uppercase tracking-tighter">
          Unveil the Secrets of <span class="text-secondary">Sri Lanka</span>
        </h1>
        <p class="text-h5 q-mt-md text-grey-3 max-width-700 mx-auto">
          From ancient stone citadels to the rhythmic waves of the Indian Ocean—Explore the pearl of
          the Orient with the locals who know it best.
        </p>
        <div class="q-mt-xl q-gutter-md">
          <q-btn
            size="lg"
            color="primary"
            label="Plan My Trip"
            unelevated
            class="rounded-pill q-px-xl shadow-hex"
            @click="$router.push('/plan')"
          />
          <q-btn
            size="lg"
            color="white"
            outline
            label="Our Destinations"
            class="rounded-pill q-px-xl"
            icon="explore"
          />
        </div>
      </div>
      <div class="scroll-indicator">
        <q-icon name="expand_more" size="lg" class="animate-bounce" />
      </div>
    </div>

    <!-- Features / Stats Section -->
    <div class="bg-dark text-white q-py-xl border-bottom-secondary">
      <div class="container row text-center q-col-gutter-lg">
        <div class="col-6 col-md-3">
          <q-icon name="history_edu" color="secondary" size="40px" class="q-mb-sm" />
          <div class="text-h4 text-positive font-weight-bold">2500+</div>
          <div class="text-subtitle1 text-grey-5">Years of History</div>
        </div>
        <div class="col-6 col-md-3">
          <q-icon name="forest" color="secondary" size="40px" class="q-mb-sm" />
          <div class="text-h4 text-positive font-weight-bold">15+</div>
          <div class="text-subtitle1 text-grey-5">National Parks</div>
        </div>
        <div class="col-6 col-md-3">
          <q-icon name="waves" color="secondary" size="40px" class="q-mb-sm" />
          <div class="text-h4 text-positive font-weight-bold">1300km</div>
          <div class="text-subtitle1 text-grey-5">Golden Coastline</div>
        </div>
        <div class="col-6 col-md-3">
          <q-icon name="hiking" color="secondary" size="40px" class="q-mb-sm" />
          <div class="text-h4 text-positive font-weight-bold">8+</div>
          <div class="text-subtitle1 text-grey-5">UNESCO Sites</div>
        </div>
      </div>
    </div>

    <!-- Travel Your Way Section (Backpacker Focus) -->
    <div class="q-py-xl bg-grey-2">
      <div class="container">
        <div class="text-center q-mb-xl">
          <div class="text-overline text-primary font-weight-bold">The Real Experience</div>
          <h2 class="text-h3 font-weight-bold">
            Travel <span class="text-secondary">Your Way</span>
          </h2>
          <p class="text-subtitle1 text-grey-7 q-mt-sm">
            We specialize in authentic Sri Lankan travel for every style.
          </p>
        </div>

        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4">
            <q-card flat class="transport-card text-center q-pa-lg shadow-1 h-100">
              <q-avatar
                size="80px"
                font-size="40px"
                color="primary"
                text-white
                icon="directions_bike"
                class="q-mb-md"
              />
              <div class="text-h5 font-weight-bold q-mb-md">Biking & Scooters</div>
              <p class="text-grey-7">
                Feel the wind and the tropical sun. Rent a bike to explore coastal paths, paddy
                fields, and hidden village roads at your own pace.
              </p>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card flat class="transport-card text-center q-pa-lg shadow-1 h-100">
              <q-avatar
                size="80px"
                font-size="40px"
                color="secondary"
                text-white
                icon="train"
                class="q-mb-md"
              />
              <div class="text-h5 font-weight-bold q-mb-md">Scenic Railways</div>
              <p class="text-grey-7">
                Experience the world-famous Kandy to Ella train ride. We help you secure tickets and
                find the best observation spots for the tea country views.
              </p>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card flat class="transport-card text-center q-pa-lg shadow-1 h-100">
              <q-avatar
                size="80px"
                font-size="40px"
                color="dark"
                text-white
                icon="directions_bus"
                class="q-mb-md"
              />
              <div class="text-h5 font-weight-bold q-mb-md">Local Bus Adventure</div>
              <p class="text-grey-7">
                Navigate the vibrant public bus network. An affordable and authentic way to travel
                between major hubs and distant towns.
              </p>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Destinations Section -->
    <div class="q-py-xl container">
      <div class="text-center q-mb-xl">
        <div class="text-overline text-primary font-weight-bold">Curated for You</div>
        <h2 class="text-h3 font-weight-bold">Top Destinations</h2>
        <div class="section-underline mx-auto"></div>
      </div>

      <div class="row q-col-gutter-lg">
        <!-- Sigiriya -->
        <div class="col-12 col-md-6">
          <q-card flat class="destination-card overflow-hidden cursor-pointer" bordered>
            <q-img
              src="https://images.unsplash.com/photo-1588596389718-47291a10052c?q=80&w=2070&auto=format&fit=crop"
              style="height: 400px"
            >
              <div class="absolute-bottom custom-caption text-white">
                <div class="row items-center justify-between">
                  <div>
                    <div class="text-h5 font-weight-bold">Ancient Citadel of Sigiriya</div>
                    <div class="text-subtitle2 decoration-secondary font-weight-bold">
                      UNESCO World Heritage
                    </div>
                  </div>
                  <q-chip
                    color="secondary"
                    text-color="white"
                    icon="history"
                    dense
                    label="History"
                  />
                </div>
              </div>
            </q-img>
          </q-card>
        </div>

        <!-- Ella -->
        <div class="col-12 col-md-6">
          <q-card flat class="destination-card overflow-hidden cursor-pointer" bordered>
            <q-img
              src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2070&auto=format&fit=crop"
              style="height: 400px"
            >
              <div class="absolute-bottom custom-caption text-white">
                <div class="row items-center justify-between">
                  <div>
                    <div class="text-h5 font-weight-bold">The Nine Arch Bridge, Ella</div>
                    <div class="text-subtitle2">Misty Mountains & Colonial Architecture</div>
                  </div>
                  <q-chip color="primary" text-color="white" icon="terrain" dense label="Nature" />
                </div>
              </div>
            </q-img>
          </q-card>
        </div>

        <!-- Galle -->
        <div class="col-12 col-md-4">
          <q-card flat class="destination-card overflow-hidden cursor-pointer" bordered>
            <q-img
              src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=1974&auto=format&fit=crop"
              style="height: 300px"
            >
              <div class="absolute-bottom custom-caption text-white">
                <div class="text-h6">Dutch Fort, Galle</div>
                <div class="text-caption">Coastal History & Modern Vibes</div>
              </div>
            </q-img>
          </q-card>
        </div>

        <!-- Yala -->
        <div class="col-12 col-md-4">
          <q-card flat class="destination-card overflow-hidden cursor-pointer" bordered>
            <q-img
              src="https://images.unsplash.com/photo-1549405178-68e7f1e78457?q=80&w=1935&auto=format&fit=crop"
              style="height: 300px"
            >
              <div class="absolute-bottom custom-caption text-white">
                <div class="text-h6">Yala National Park</div>
                <div class="text-caption">The Kingdom of the Leopard</div>
              </div>
            </q-img>
          </q-card>
        </div>

        <!-- Kandy -->
        <div class="col-12 col-md-4">
          <q-card flat class="destination-card overflow-hidden cursor-pointer" bordered>
            <q-img
              src="https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=2070&auto=format&fit=crop"
              style="height: 300px"
            >
              <div class="absolute-bottom custom-caption text-white">
                <div class="text-h6">Sacred City of Kandy</div>
                <div class="text-caption">The Spiritual Heart of Lanka</div>
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section q-py-xl flex items-center justify-center text-center text-white">
      <div class="container z-top">
        <h2 class="text-h3 font-weight-bold">Real Lanka. real SASA.</h2>
        <p class="text-h6 q-mt-lg text-grey-3 max-width-700 mx-auto">
          Don't just be a tourist. Be a traveler. Join us for a journey that goes beyond the
          guidebook.
        </p>
        <q-btn
          size="lg"
          color="secondary"
          label="Start Planning Now"
          unelevated
          class="rounded-pill q-px-xl q-mt-lg"
          @click="$router.push('/plan')"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
//
</script>

<style lang="scss" scoped>
.hero-section {
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.4),
    rgba(27, 67, 50, 0.8)
  );
}

.max-width-700 {
  max-width: 700px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.rounded-pill {
  border-radius: 50px;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
}

.section-underline {
  width: 80px;
  height: 4px;
  background-color: var(--q-primary);
  margin-top: 10px;
  border-radius: 2px;
}

.destination-card {
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 16px;

  &:hover {
    transform: translateY(-10px);
    .custom-caption {
      background: rgba(27, 67, 50, 0.9);
    }
  }
}

.custom-caption {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  width: 100%;
  padding: 20px;
  transition: background 0.3s ease;
}

.cta-section {
  height: 60vh;
  background-image: url('https://images.unsplash.com/photo-1544218520-43510e15645e?q=80&w=1934&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
