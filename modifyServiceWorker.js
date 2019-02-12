/* eslint-disable consistent-return, @typescript-eslint/no-var-requires, no-console */

const fs = require('fs')

fs.readFile('build/service-worker.js', 'utf8', (err, data) => {
  if (err) {
    return console.error(err)
  }

  const result = data.replace(
    'workbox.clientsClaim();',
    'workbox.skipWaiting();\nworkbox.clientsClaim();',
  )

  fs.writeFile('build/service-worker.js', result, 'utf8', readError => {
    if (readError) return console.log(readError)
  })
})
