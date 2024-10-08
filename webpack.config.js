const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.argv.includes('--mode=production') ? 'production' : 'development';
const libraryName = process.env.npm_package_name;

module.exports = {
  mode: mode,
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/scripts/components'),
      '@context': path.resolve(__dirname, 'src/scripts/context'),
      '@h5phelpers': path.resolve(__dirname, 'src/scripts/h5phelpers'),
      '@scripts': path.resolve(__dirname, 'src/scripts'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@types': path.resolve(__dirname, 'src/scripts/types'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${libraryName}.css`,
    }),
  ],
  entry: {
    dist: './src/scripts/app.js',
  },
  output: {
    filename: `${libraryName}.js`,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: ['browserslist'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.svg|\.jpg|\.png$/,
        include: path.join(__dirname, 'src/images'),
        type: 'asset/resource',
      },
      {
        test: /\.woff$/,
        include: path.join(__dirname, 'src/fonts'),
        type: 'asset/resource',
      },
    ],
  },
  stats: {
    colors: true,
  },
  ...(mode !== 'production' && { devtool: 'eval-cheap-module-source-map' }),
};
