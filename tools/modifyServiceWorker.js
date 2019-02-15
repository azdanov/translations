/* eslint-disable consistent-return, @typescript-eslint/no-var-requires, no-console */

const fs = require('fs')

fs.readFile('build/service-worker.js', 'utf8', (err, data) => {
  if (err) {
    return console.error(err)
  }

  const snippet = `
addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});
  `

  const result = data.replace(
    'workbox.clientsClaim();',
    `workbox.clientsClaim();\n${snippet}`,
  )

  fs.writeFile('build/service-worker.js', result, 'utf8', readError => {
    if (readError) return console.log(readError)
  })
})
