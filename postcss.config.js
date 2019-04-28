module.exports = {
  plugins: [
    require('postcss-easy-import')({}),
    require('postcss-normalize')({}),
    require('postcss-preset-env')({
      stage: 0,
    }),
    require('postcss-extend')({}),
    require('postcss-custom-media')({
      importFrom: [
        './tailwind.js',
      ]
    }),
    require('tailwindcss')('./tailwind.js'),
    require('cssnano')({
      preset: [
        'default',
        { "discardComments": { "removeAll": false } }
      ],
    }),

  ],
}
