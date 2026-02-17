/**
 * Rendering Logic for TravelBlog MVP
 */

const getLang = () => localStorage.getItem('appLang') || 'en'

export const renderPostCard = (post) => {
  const lang = getLang()
  const data = post[lang] || post['en']

  return `
        <div class="post-card group cursor-pointer overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20" onclick="window.location.href='blog-detail.html?id=${post.id}'">
            <div class="relative h-64 overflow-hidden">
                <img src="${post.image}" alt="${data.title}" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-primary/80 text-white backdrop-blur-sm uppercase tracking-wider">${data.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">${data.title}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-3">${data.excerpt}</p>
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
  const lang = getLang()
  const data = post[lang] || post['en']

  return `
        <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group" onclick="window.location.href='blog-detail.html?id=${post.id}'">
            <div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                <img src="${post.image}" alt="${data.title}" class="h-full w-full object-cover transition-transform group-hover:scale-110">
            </div>
            <div>
                <h4 class="text-sm font-semibold text-white line-clamp-1 group-hover:text-primary transition-colors">${data.title}</h4>
                <p class="text-xs text-gray-500 mt-1">${data.location}</p>
            </div>
        </div>
    `
}

export const renderDetailedPost = (post) => {
  const lang = getLang()
  const data = post[lang] || post['en']
  const images = post.gallery || [post.image]

  return `
        <div class="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <header class="relative h-[70vh] min-h-[500px] w-full">
                <img src="${post.image}" alt="${data.title}" class="absolute inset-0 h-full w-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/95"></div>
                <div class="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <div class="max-w-4xl">
                        <span class="inline-block px-4 py-1 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-widest mb-6 border border-white/10">${data.category}</span>
                        <h1 class="text-5xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl tracking-tighter">${data.title}</h1>
                        <div class="flex items-center justify-center gap-6 text-white/80 text-sm md:text-lg font-medium">
                            <span class="flex items-center gap-2"><i data-lucide="map-pin" class="w-5 h-5 text-secondary"></i> ${data.location}</span>
                            <span class="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                            <span class="flex items-center gap-2"><i data-lucide="calendar" class="w-5 h-5 text-secondary"></i> ${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main class="container mx-auto px-6 -mt-32 relative z-10 pb-20">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <article class="lg:col-span-2 space-y-12">
                        <div class="bg-black/60 backdrop-blur-2xl border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <!-- Content -->
                            <div class="prose prose-invert prose-xl max-w-none relative z-10">
                                ${data.content
                                  .split('\n\n')
                                  .map((p, i) => {
                                    // Inject a gallery image after the second paragraph if available
                                    let imgHtml = ''
                                    if (i === 1 && images.length > 1) {
                                      imgHtml = `
                                            <div class="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                ${images
                                                  .slice(1, 3)
                                                  .map(
                                                    (img) => `
                                                    <div class="group overflow-hidden rounded-2xl aspect-[4/3] border border-white/10">
                                                        <img src="${img}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                                                    </div>
                                                `,
                                                  )
                                                  .join('')}
                                            </div>
                                        `
                                    }
                                    return `<p class="mb-8 text-gray-200 leading-relaxed font-light">${p}</p>${imgHtml}`
                                  })
                                  .join('')}
                            </div>

                            <!-- Remaining Images -->
                            ${
                              images.length > 3
                                ? `
                                <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    ${images
                                      .slice(3)
                                      .map(
                                        (img) => `
                                        <div class="group overflow-hidden rounded-xl aspect-square border border-white/10">
                                            <img src="${img}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                                        </div>
                                    `,
                                      )
                                      .join('')}
                                </div>
                            `
                                : ''
                            }

                            <div class="mt-16 pt-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
                                <div>
                                    <h3 class="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">${lang === 'si' ? 'ටැග්' : 'TAGS'}</h3>
                                    <div class="flex flex-wrap gap-2">
                                        ${post.tags.map((tag) => `<span class="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs hover:bg-primary/20 hover:text-white transition-colors cursor-default">#${tag}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <button class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10"><i data-lucide="share-2" class="w-4 h-4"></i></button>
                                    <button class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10"><i data-lucide="heart" class="w-4 h-4"></i></button>
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside class="space-y-8">
                        <div class="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[2.5rem]">
                            <h3 class="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <i data-lucide="compass" class="text-secondary w-6 h-6"></i>
                                ${lang === 'si' ? 'ආසන්න ස්ථාන' : 'Explore Nearby'}
                            </h3>
                            <div id="nearby-suggestions" class="space-y-6">
                                <p class="text-gray-500 text-sm animate-pulse">${lang === 'si' ? 'සොයමින් පවතී...' : 'Finding hidden gems nearby...'}</p>
                            </div>
                        </div>

                        <div class="bg-primary/20 border border-primary/30 p-10 rounded-[2.5rem] relative overflow-hidden group">
                           <div class="relative z-10">
                                <h3 class="text-2xl font-black text-white mb-4 uppercase tracking-tighter">${lang === 'si' ? 'චාරිකාව සැලසුම් කරන්න' : 'Plan Your Journey'}</h3>
                                <p class="text-gray-300 text-sm mb-8 leading-relaxed">${lang === 'si' ? 'සැබෑ ලංකාව අත්විඳින්න අප උදව් කරන්නම්. අදම අප හා එක්වන්න.' : `Want to visit ${data.location}? Let us help you plan an authentic adventure that goes beyond the guidebook.`}</p>
                                <button class="w-full py-4 px-8 bg-secondary hover:bg-secondary/90 text-primary-dark font-black rounded-2xl transition-all shadow-xl shadow-secondary/10 uppercase tracking-tighter">
                                    ${lang === 'si' ? 'සැලසුම් කරන්න' : 'Get Custom Itinerary'}
                                </button>
                           </div>
                           <div class="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                               <i data-lucide="map" class="w-64 h-64"></i>
                           </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    `
}
