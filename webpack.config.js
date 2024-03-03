const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './src/server.ts',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  devtool: 'inline-source-map',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
};
