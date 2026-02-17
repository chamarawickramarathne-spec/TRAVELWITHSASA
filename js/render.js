/**
 * Rendering Logic for TravelBlog MVP
 */

const getLang = () => localStorage.getItem('appLang') || 'en'

export const renderPostCard = (post) => {
  const lang = getLang()
  const data = post[lang] || post['en']

  return `
        <div class="heritage-card group cursor-pointer" onclick="window.location.href='blog-detail.html?id=${post.id}'">
            <div class="relative h-72 overflow-hidden">
                <img src="${post.image}" alt="${data.title}" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute top-4 left-4">
                    <span class="px-4 py-1.5 rounded-full text-[10px] font-bold bg-white/95 text-primary shadow-sm uppercase tracking-[0.2em] border border-primary/5">${data.category}</span>
                </div>
            </div>
            <div class="p-8">
                <div class="flex items-center gap-2 mb-4 text-[10px] font-black text-secondary uppercase tracking-[0.15em]">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
                    ${data.location}
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">${data.title}</h3>
                <p class="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed font-light">${data.excerpt}</p>
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${post.tags
                      .slice(0, 3)
                      .map(
                        (tag) =>
                          `<span class="text-[9px] px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 font-bold uppercase tracking-tighter">#${tag}</span>`,
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
        <div class="flex items-center gap-4 p-3 rounded-2xl hover:bg-primary/5 transition-all cursor-pointer group border border-transparent hover:border-primary/10" onclick="window.location.href='blog-detail.html?id=${post.id}'">
            <div class="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <img src="${post.image}" alt="${data.title}" class="h-full w-full object-cover transition-transform group-hover:scale-110">
            </div>
            <div>
                <h4 class="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">${data.title}</h4>
                <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black">${data.location}</p>
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
            <header class="relative h-[80vh] min-h-[600px] w-full">
                <img src="${post.image}" alt="${data.title}" class="absolute inset-0 h-full w-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg-light"></div>
                <div class="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <div class="max-w-4xl">
                        <span class="inline-block px-5 py-2 rounded-full bg-white/95 text-primary text-xs font-black uppercase tracking-[.25em] mb-8 shadow-xl border border-primary/5">${data.category}</span>
                        <h1 class="text-5xl md:text-8xl font-black text-white leading-tight mb-8 drop-shadow-2xl tracking-tighter">${data.title}</h1>
                        <div class="flex items-center justify-center gap-8 text-white text-sm md:text-lg font-bold uppercase tracking-widest">
                            <span class="flex items-center gap-3"><i data-lucide="map-pin" class="w-6 h-6 text-secondary"></i> ${data.location}</span>
                            <span class="w-2 h-2 rounded-full bg-secondary"></span>
                            <span class="flex items-center gap-3"><i data-lucide="calendar" class="w-6 h-6 text-secondary"></i> ${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main class="container mx-auto px-6 -mt-32 relative z-10 pb-32">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <article class="lg:col-span-2 space-y-16">
                        <div class="bg-white border border-black/5 p-10 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <!-- Content -->
                            <div class="prose prose-lg max-w-none relative z-10">
                                ${data.content
                                  .split('\n\n')
                                  .map((p, i) => {
                                    // Inject a gallery image after the second paragraph
                                    let imgHtml = ''
                                    if (i === 1 && images.length > 1) {
                                      imgHtml = `
                                            <div class="my-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                ${images
                                                  .slice(1, 4)
                                                  .map(
                                                    (img, idx) => `
                                                    <div class="group overflow-hidden rounded-[2rem] border border-black/5 shadow-lg ${idx === 2 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}">
                                                        <img src="${img}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                                                    </div>
                                                `,
                                                  )
                                                  .join('')}
                                            </div>
                                        `
                                    }
                                    return `<p class="mb-10 text-gray-700 leading-relaxed font-light text-xl italic-p">${p}</p>${imgHtml}`
                                  })
                                  .join('')}
                            </div>

                            <!-- Detailed Gallery Mosaic -->
                            ${
                              images.length > 4
                                ? `
                                <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    ${images
                                      .slice(4)
                                      .map(
                                        (img, idx) => `
                                        <div class="group overflow-hidden rounded-2xl aspect-square border border-black/5 shadow-md ${idx % 3 === 0 ? 'col-span-2 row-span-2' : ''}">
                                            <img src="${img}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                                        </div>
                                    `,
                                      )
                                      .join('')}
                                </div>
                            `
                                : ''
                            }

                            <div class="mt-20 pt-16 border-t border-black/5 flex flex-wrap items-center justify-between gap-8">
                                <div>
                                    <h3 class="text-xs font-black text-secondary uppercase tracking-[.3em] mb-6">${lang === 'si' ? 'ටැග්' : 'EXPLORE BY TAGS'}</h3>
                                    <div class="flex flex-wrap gap-3">
                                        ${post.tags.map((tag) => `<span class="px-5 py-2 rounded-xl bg-gray-50 border border-black/5 text-gray-600 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all cursor-default">#${tag}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <button class="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-black/5 text-gray-400 group"><i data-lucide="share-2" class="w-6 h-6 transition-transform group-hover:rotate-12"></i></button>
                                    <button class="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all border border-black/5 text-gray-400 group"><i data-lucide="heart" class="w-6 h-6 transition-transform group-hover:scale-125"></i></button>
                                </div>
                            </div>
                        </div>

                        <!-- Map Integration Placeholder -->
                        <div class="bg-white border border-black/5 p-10 md:p-16 rounded-[3rem] shadow-xl">
                            <h3 class="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">${lang === 'si' ? 'ස්ථානය' : 'LOCATION & ROUTES'}</h3>
                            <div class="aspect-video w-full bg-gray-100 rounded-[2rem] overflow-hidden relative border border-black/5">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074" class="w-full h-full object-cover opacity-50 grayscale">
                                <div class="absolute inset-0 flex items-center justify-center flex-col text-center p-6">
                                    <i data-lucide="map" class="w-16 h-16 text-primary mb-4"></i>
                                    <p class="text-gray-900 font-bold mb-4 uppercase tracking-widest">${lang === 'si' ? 'ගූගල් සිතියම මෙතැනින්' : 'Explore on Google Maps'}</p>
                                    <button class="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-transform uppercase text-xs tracking-widest">${lang === 'si' ? 'සිතියම විවෘත කරන්න' : 'View Full Itinerary'}</button>
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside class="space-y-12">
                        <div class="bg-white border border-black/5 p-12 rounded-[3rem] shadow-xl sticky top-28">
                            <h3 class="text-xl font-black text-gray-900 mb-10 flex items-center gap-4 uppercase tracking-tighter">
                                <i data-lucide="compass" class="text-secondary w-7 h-7"></i>
                                ${lang === 'si' ? 'තවත් විස්මිත තැන්' : 'NEARBY GEMS'}
                            </h3>
                            <div id="nearby-suggestions" class="space-y-8">
                                <p class="text-gray-400 text-sm animate-pulse">${lang === 'si' ? 'සොයමින් පවතී...' : 'Discovering more magic...'}</p>
                            </div>

                            <div class="mt-16 pt-12 border-t border-black/5">
                                <div class="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 group cursor-pointer hover:bg-primary transition-all duration-500">
                                    <h4 class="font-black text-primary group-hover:text-white transition-colors mb-2 uppercase tracking-tighter">${lang === 'si' ? 'සැලසුම් කරන්න' : 'PLAN YOUR TRIP'}</h4>
                                    <p class="text-xs text-gray-500 group-hover:text-white/80 transition-colors leading-relaxed">${lang === 'si' ? 'සැබෑ ලංකාව අත්විඳින්න අප උදව් කරන්නම්.' : 'Let our locals design your perfect adventure.'}</p>
                                    <i data-lucide="arrow-right" class="mt-6 text-secondary group-hover:translate-x-4 transition-transform"></i>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    `
}
