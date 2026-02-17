/**
 * Rendering Logic for TravelBlog MVP
 */

export const renderPostCard = (post) => {
  return `
        <div class="post-card group cursor-pointer overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20" onclick="window.location.href='blog-detail.html?id=${post.id}'">
            <div class="relative h-64 overflow-hidden">
                <img src="${post.image}" alt="${post.title}" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-primary/80 text-white backdrop-blur-sm uppercase tracking-wider">${post.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">${post.title}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-3">${post.excerpt}</p>
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${post.tags
                      .slice(0, 3)
                      .map(
                        (tag) =>
                          `<span class="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10">#${tag}</span>`,
                      )
                      .join('')}
                </div>
            </div>
        </div>
    `
}

export const renderSuggestionCard = (post) => {
  return `
        <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group" onclick="window.location.href='blog-detail.html?id=${post.id}'">
            <div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                <img src="${post.image}" alt="${post.title}" class="h-full w-full object-cover transition-transform group-hover:scale-110">
            </div>
            <div>
                <h4 class="text-sm font-semibold text-white line-clamp-1 group-hover:text-primary transition-colors">${post.title}</h4>
                <p class="text-xs text-gray-500 mt-1">${post.location}</p>
            </div>
        </div>
    `
}

export const renderDetailedPost = (post) => {
  return `
        <div class="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <header class="relative h-[60vh] min-h-[400px] w-full">
                <img src="${post.image}" alt="${post.title}" class="absolute inset-0 h-full w-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
                <div class="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <div class="max-w-4xl">
                        <span class="inline-block px-4 py-1 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-widest mb-4">${post.category}</span>
                        <h1 class="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-2xl">${post.title}</h1>
                        <div class="flex items-center justify-center gap-4 text-white/80 text-sm md:text-base">
                            <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-4 h-4"></i> ${post.location}</span>
                            <span class="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                            <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-4 h-4"></i> ${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main class="container mx-auto px-6 -mt-20 relative z-10 pb-20">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <article class="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
                        <div class="prose prose-invert prose-lg max-w-none">
                            ${post.content
                              .split('\n\n')
                              .map((p) => `<p class="mb-6 text-gray-300 leading-relaxed">${p}</p>`)
                              .join('')}
                        </div>

                        <div class="mt-12 pt-12 border-t border-white/10">
                            <h3 class="text-lg font-bold text-white mb-4">Tags</h3>
                            <div class="flex flex-wrap gap-2 text-sm">
                                ${post.tags.map((tag) => `<span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400">#${tag}</span>`).join('')}
                            </div>
                        </div>
                    </article>

                    <aside class="space-y-8">
                        <div class="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
                            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <i data-lucide="compass" class="text-primary w-6 h-6"></i>
                                Explore Nearby
                            </h3>
                            <div id="nearby-suggestions" class="space-y-4">
                                <!-- Suggestions rendered here -->
                                <p class="text-gray-500 text-sm animate-pulse">Finding hidden gems nearby...</p>
                            </div>
                        </div>

                        <div class="bg-primary/10 border border-primary/20 p-8 rounded-3xl relative overflow-hidden group">
                           <div class="relative z-10">
                                <h3 class="text-xl font-bold text-white mb-4">Plan Your Journey</h3>
                                <p class="text-gray-300 text-sm mb-6">Want to visit ${post.location}? Let us help you plan an authentic adventure.</p>
                                <button class="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20">Get Custom Itinerary</button>
                           </div>
                           <div class="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                               <i data-lucide="map" class="w-40 h-40"></i>
                           </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    `
}
