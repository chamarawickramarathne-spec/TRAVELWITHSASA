<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-glass text-white" height-hint="98">
      <q-toolbar class="container q-py-sm">
        <div class="logo-container flex items-center cursor-pointer" @click="$router.push('/')">
          <!-- Perfectly matching the user's provided logo style -->
          <svg
            width="45"
            height="45"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="q-mr-sm"
          >
            <path
              d="M50 5C50 5 20 45 20 72C20 88 33.5 100 50 100C66.5 100 80 88 80 72C80 45 50 5 50 5Z"
              fill="url(#drop-grad)"
            />
            <path
              d="M20 72C28 62 38 82 50 72C62 62 72 82 80 72"
              stroke="white"
              stroke-width="5"
              stroke-linecap="round"
            />
            <defs>
              <linearGradient
                id="drop-grad"
                x1="50"
                y1="5"
                x2="50"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1B4332" />
                <stop offset="1" stop-color="#00B4D8" />
              </linearGradient>
            </defs>
          </svg>
          <div class="text-h6 text-uppercase text-bold tracking-tighter" style="font-size: 1.4rem">
            TRAVEL WITH <span class="text-secondary">SASA</span>
          </div>
        </div>

        <q-space />

        <div class="gt-sm q-gutter-md">
          <q-btn flat no-caps label="Home" color="white" @click="$router.push('/')" />
          <q-btn flat no-caps label="Destinations" color="white" />
          <q-btn flat no-caps label="Tours" color="white" />
          <q-btn flat no-caps label="About Us" color="white" />
          <q-btn
            unelevated
            no-caps
            label="Plan My Trip"
            color="secondary"
            class="rounded-borders q-px-md"
            @click="$router.push('/plan')"
          />
        </div>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="lt-md"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      class="bg-dark text-white"
    >
      <q-list padding>
        <q-item-label header class="text-grey-5">Explore Sri Lanka</q-item-label>
        <q-item clickable v-ripple @click="$router.push('/')">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple text-primary>
          <q-item-section avatar><q-icon name="explore" /></q-item-section>
          <q-item-section>Destinations</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="$router.push('/plan')">
          <q-item-section avatar><q-icon name="map" /></q-item-section>
          <q-item-section>Plan My Trip</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <footer class="bg-dark text-white q-pa-xl">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-4">
          <div class="text-h5 q-mb-md">Travel with SASA</div>
          <p class="text-grey-5">
            Discover the hidden gems of the pearl of the Indian Ocean. Expertly guided tours,
            authentic experiences, and memories for a lifetime.
          </p>
        </div>
        <div class="col-6 col-md-4">
          <div class="text-subtitle1 q-mb-sm">Quick Links</div>
          <q-list dense dark>
            <q-item clickable><q-item-section>Privacy Policy</q-item-section></q-item>
            <q-item clickable><q-item-section>Terms & Conditions</q-item-section></q-item>
            <q-item clickable><q-item-section>Contact Support</q-item-section></q-item>
          </q-list>
        </div>
        <div class="col-6 col-md-4">
          <div class="text-subtitle1 q-mb-sm">Follow Us</div>
          <div class="q-gutter-sm">
            <q-btn round flat icon="facebook" />
            <q-btn round flat icon="instagram" />
            <q-btn round flat icon="twitter" />
          </div>
        </div>
      </div>
      <div class="text-center q-mt-xl text-grey-7">
        &copy; 2024 Travel with SASA. All Rights Reserved.
      </div>
    </footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss">
.bg-glass {
  background: rgba(27, 67, 50, 0.8) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.tracking-tighter {
  letter-spacing: -0.05em;
}

.font-weight-bold {
  font-weight: 800;
}
</style>
