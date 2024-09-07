const ReactDOM = require('react-dom')
const { ipcRenderer } = require('electron')
const { Suspense } = React = require('react')
const i18n = require('../../services/i18next.config')
const AppWrapper = require('../../conception').default

ipcRenderer.on("languageChanged", (event, lng) => {
  i18n.changeLanguage(lng)
})

ReactDOM.render(
    <Suspense fallback="loading">
      <AppWrapper />
    </Suspense>
  , document.getElementById("conception"),
  )
