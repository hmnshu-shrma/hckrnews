const nodeExternals = require('webpack-node-externals')
const path = require('path')

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }
  }
}
const images = {
  test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }
}

const serverConfig = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    'index.js': path.resolve(__dirname, 'src/server/index.js')
  },
  module: {
    rules: [js, { test: /\.(scss|css)$/, loader: 'ignore-loader' }, images]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]'
  }
}

const clientConfig = {
  mode: 'development',
  target: 'web',
  entry: {
    'home.js': path.resolve(__dirname, 'src/public/home.js')
  },
  module: {
    rules: [
      js,
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/
      },
      images
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name]'
  }
}

module.exports = [serverConfig, clientConfig]
