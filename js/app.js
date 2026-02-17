/**
 * Main Logic for TravelBlog MVP
 */

import { renderPostCard, renderSuggestionCard, renderDetailedPost } from './render.js'

class TravelApp {
  constructor() {
    this.posts = []
    this.fuse = null
    this.lang = localStorage.getItem('appLang') || 'en'
    this.init()
  }

  async init() {
    try {
      const response = await fetch('data/posts.json')
      this.posts = await response.json()

      // Initialize Fuse.js for searching
      if (window.Fuse) {
        this.fuse = new Fuse(this.posts, {
          keys: [
            'en.title',
            'si.title',
            'en.excerpt',
            'si.excerpt',
            'en.category',
            'si.category',
            'tags',
          ],
          threshold: 0.3,
        })
      }

      this.setupLangSwitcher()
      this.updateLabels()
      this.route()
    } catch (error) {
      console.error('Initialisation failed:', error)
    }
  }

  setupLangSwitcher() {
    const btn = document.getElementById('lang-toggle')
    if (btn) {
      btn.textContent = this.lang === 'en' ? 'SI' : 'EN'
      btn.onclick = () => {
        this.lang = this.lang === 'en' ? 'si' : 'en'
        localStorage.setItem('appLang', this.lang)
        window.location.reload()
      }
    }
  }

  updateLabels() {
    // Simple label updates for non-dynamic parts
    const labels = {
      en: {
        search: "Search destinations like 'Ella'...",
        explore: 'Explore',
        destinations: 'Destinations',
        discover: 'DISCOVER',
        tagline:
          'Explore the pearl of the Orient through the eyes of locals. Authenticity guaranteed.',
      },
      si: {
        search: 'පිවිසීමට බලාපොරොත්තු වන ස්ථානය සොයන්න...',
        explore: 'සොයන්න',
        destinations: 'ස්ථාන',
        discover: 'අලුත් තැන්',
        tagline: 'ශ්‍රී ලංකාවේ සුන්දරත්වය සැබෑ දේශීය අත්දැකීමක් ලෙස විඳින්න.',
      },
    }

    const current = labels[this.lang]
    const searchInput = document.getElementById('search-input')
    if (searchInput) searchInput.placeholder = current.search

    const exploreBtn = document.querySelector('button.bg-primary')
    if (exploreBtn) exploreBtn.textContent = current.explore

    const discoverLabel = document.querySelector('h2.text-white')
    if (discoverLabel) {
      discoverLabel.innerHTML = `${current.discover} <span class="text-secondary">${this.lang === 'si' ? 'විස්මිත ස්ථාන' : 'DESTINATIONS'}</span>`
    }

    const tagline = document.querySelector('p.text-gray-300')
    if (tagline) tagline.textContent = current.tagline
  }

  route() {
    const path = window.location.pathname
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get('id')

    if (path.includes('blog-detail.html') && postId) {
      this.handleBlogPost(postId)
    } else {
      this.handleHome()
    }

    // Always refresh icons
    if (window.lucide) {
      lucide.createIcons()
    }
  }

  handleHome() {
    const postGrid = document.getElementById('post-grid')
    const searchInput = document.getElementById('search-input')

    if (postGrid) {
      this.renderPosts(this.posts, postGrid)
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value
        if (query.length > 1) {
          const results = this.fuse ? this.fuse.search(query).map((r) => r.item) : []
          this.renderPosts(results, postGrid)
        } else if (query.length === 0) {
          this.renderPosts(this.posts, postGrid)
        }
      })
    }
  }

  handleBlogPost(postId) {
    const post = this.posts.find((p) => p.id === postId)
    const container = document.getElementById('post-content')

    if (post && container) {
      container.innerHTML = renderDetailedPost(post)
      this.renderNearby(post)
    } else if (container) {
      container.innerHTML = `<div class="p-20 text-center text-white">Post not found</div>`
    }
  }

  renderPosts(postsToRender, container) {
    if (!container) return

    if (postsToRender.length === 0) {
      container.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500">No destinations found matching your search.</div>`
      return
    }

    container.innerHTML = postsToRender.map((post) => renderPostCard(post)).join('')
    lucide.createIcons()
  }

  renderNearby(currentPost) {
    const suggestionContainer = document.getElementById('nearby-suggestions')
    if (!suggestionContainer) return

    // Simple logic: same location cluster or shared tags
    const suggested = this.posts
      .filter((p) => p.id !== currentPost.id)
      .filter(
        (p) =>
          p.location_cluster === currentPost.location_cluster ||
          p.tags.some((t) => currentPost.tags.includes(t)),
      )
      .slice(0, 4)

    if (suggested.length > 0) {
      suggestionContainer.innerHTML = suggested.map((post) => renderSuggestionCard(post)).join('')
    } else {
      suggestionContainer.innerHTML = `<p class="text-gray-500 text-sm">More adventures coming soon...</p>`
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TravelApp()
})
