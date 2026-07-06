import path from 'node:path'
import { defineConfig } from 'cypress'
import webpackPreprocessor from '@cypress/webpack-preprocessor'
import webpack from 'webpack'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, _config) {
      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: {
            mode: 'development',
            resolve: {
              extensions: ['.ts', '.js'],
              alias: {
                // better-sse is server-only; use the existing stub so webpack
                // doesn't try to bundle its Node.js dependencies
                'better-sse': path.resolve(
                  __dirname,
                  'utils/better-sse-stub.ts'
                )
              },
              fallback: {
                // fsxa-api and its deps reference Node.js built-ins that have
                // no browser equivalent. The test code only uses the package's
                // constants (enums/strings), never the runtime APIs, so
                // returning empty modules is safe here.
                util: false,
                http: false,
                http2: false,
                timers: false,
                stream: false,
                crypto: false,
                events: false,
                buffer: false,
                net: false,
                tls: false,
                zlib: false,
                fs: false,
                path: false,
                os: false,
                url: false
              }
            },
            module: {
              rules: [
                {
                  test: /\.tsx?$/,
                  loader: 'esbuild-loader',
                  options: { target: 'es2019' }
                }
              ]
            },
            plugins: [
              // fsxa-api v11 uses node: URI scheme (e.g. node:events); strip
              // the prefix so the fallback entries above take effect.
              new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
                resource.request = resource.request.replace(/^node:/, '')
              })
            ]
          }
        })
      )
    }
  },
  screenshotOnRunFailure: false,
  video: false
})
