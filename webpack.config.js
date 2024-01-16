module.exports = {
    // ... other webpack or SVGR configurations
    module: {
      rules: [
        // ... other rules
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                throwIfNamespace: false,
              },
            },
          ],
        },
      ],
    },
  };
  