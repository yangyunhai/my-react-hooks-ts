module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'react-hooks',
  ],
  extends: [
    'react-app',
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    "no-anonymous-default-export":"off",
    "react/jsx-uses-react": 2,
    "no-unused-vars":"off",
    "no-unused-vars": 'off',
    'prettier/prettier': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    // 其余配置项自行添加
  }
};
