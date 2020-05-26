import compression from 'compression'
import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import HackerNewsApp from '../public/components/HackerNewsApp'
import axios from 'axios'

const app = express()

app.use(compression())

app.use('/static', express.static(path.resolve(__dirname, 'public')))

app.get('/*', (req, res) => {
  let responseData = ''
  const { page: pageNumber, tags: queryTags } = req.query
  console.log(req.query, 'qurry')
  axios
    .get('http://hn.algolia.com/api/v1/search', {
      params: {
        page: pageNumber || 0,
        tags: queryTags || ''
      }
    })
    .then(response => {
      responseData = response.data
      const componentStream = ReactDOMServer.renderToNodeStream(
        <HackerNewsApp data={responseData} />
      )

      const htmlStart = `<!doctype html>
    <html>
      <head>
        <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <style>
              body { font-family: Arial, sans-serif; font-size: 15px; }
            </style>
            <script>window.__INITIAL__DATA__ = ${JSON.stringify({
              responseData
            })}</script>
            </head>
            <body>
              <div id="root">`

      res.write(htmlStart)

      componentStream.pipe(res, { end: false })

      const htmlEnd = `</div>
              <script src="/static/vendors~home.js"></script>
              <script src="/static/home.js"></script>
            </body>
          </html>`

      componentStream.on('end', () => {
        res.write(htmlEnd)

        res.end()
      })
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('*', (req, res) => {
  res.status(404).send(`
              <html>
                <head>
                  <style>
                    body { font-family: Arial, sans-serif; font-size: 15px; }
                    h1 { color: #c7c7c7; text-align: center; }
                  </style>
                </head>
                <body>
                  <h1>404 - Not Found</h1>
                </body>
              </html>`)
})

const { PORT = 3000 } = process.env

app.listen(PORT, () => console.log('######## app running ########'))
