module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: false,
      },
    ],
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    'react/no-array-index-key': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/dot-notation': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
};
