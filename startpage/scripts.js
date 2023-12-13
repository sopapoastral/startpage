/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"GQmJRO6AFM0vhjBS","label":"Fing","bookmarks":[{"id":"TJEY63J1khsQlm5w","label":"EVA","url":"https://eva.fing.edu.uy/"},{"id":"jqNM8IuWXd69xISM","label":"SGAE","url":"https://bedelias.udelar.edu.uy/"},{"id":"f2lGkSm2nXPLdq1h","label":"Parciales","url":"https://www.fing.edu.uy/es/bedelia/parciales"},{"id":"9GEf2A8S9QgGXZO5","label":"Examenes","url":"https://www.fing.edu.uy/es/bedelia/examenes"}]},{"id":"PIlcHYGfcYRFpltP","label":"Libros","bookmarks":[{"id":"JBN9dHVoGmudNawP","label":"LibGen","url":"https://www.libgen.is/"},{"id":"qJmscAfMFcroLLMg","label":"SciHub","url":"https://sci-hub.se/"},{"id":"wDBSa9JBxwxZy0Ag","label":"Timbó","url":"https://foco.timbo.org.uy/home"}]},{"id":"idKDrrvL0SOLFYAc","label":"Random","bookmarks":[{"id":"7Ay98ET1YQ7N29OI","label":"Twitter","url":"https://twitter.com/"},{"id":"yR7K96mvGZX6pTgD","label":"Twitch","url":"https://www.twitch.tv/"},{"id":"KzetHvJtspMLG4iq","label":"Youtube","url":"https://www.youtube.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
