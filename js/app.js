/**
 * Main Logic for TravelBlog MVP
 */

import { renderPostCard, renderSuggestionCard, renderDetailedPost } from './render.js'

class TravelApp {
  constructor() {
    this.posts = []
    this.fuse = null
    this.init()
  }

  async init() {
    try {
      const response = await fetch('data/posts.json')
      this.posts = await response.json()

      // Initialize Fuse.js for searching
      if (window.Fuse) {
        this.fuse = new Fuse(this.posts, {
          keys: ['title', 'excerpt', 'tags', 'category', 'location'],
          threshold: 0.3,
        })
      }

      this.route()
    } catch (error) {
      console.error('Initialisation failed:', error)
    }
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
    const searchResults = document.getElementById('search-results')

    if (postGrid) {
      this.renderPosts(this.posts, postGrid)
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value
        if (query.length > 2) {
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
