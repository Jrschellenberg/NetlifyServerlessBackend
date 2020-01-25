const  presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        chrome: '69',
      },
    },
  ],
];


module.exports = {
  presets: presets,
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-proposal-class-properties'],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
  ],
};
