module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 'off',
    'import/no-unresolved': 0,
    'default-param-last': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] }
    ], // 关闭airbnb对于jsx必须写在jsx文件中的设置
    'react/prop-types': 'off', // 关闭airbnb对于必须添加prop-types的校验
    'react/destructuring-assignment': [
      1,
      'always',
      {
        ignoreClassFields: false
      }
    ],
    'react/jsx-one-expression-per-line': 'off', // 关闭要求一个表达式必须换行的要求，和Prettier冲突了
    'react/jsx-wrap-multilines': 0, // 关闭要求jsx属性中写jsx必须要加括号，和Prettier冲突了
    'comma-dangle': ['error', 'never'],
    'react/jsx-first-prop-new-line': [1, 'multiline-multiprop'],
    'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
    'jsx-a11y/no-static-element-interactions': 'off', // 关闭非交互元素加事件必须加 role
    'jsx-a11y/click-events-have-key-events': 'off', // 关闭click事件要求有对应键盘事件
    'no-bitwise': 'off', // 不让用位操作符，不知道为啥，先关掉
    'react/jsx-indent': [2, 2],
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    'jsx-control-statements/jsx-use-if-tag': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    // 禁止使用 var
    'no-var': 'error',
    semi: 0,
    quotes: [2, 'single'],
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    eqeqeq: [
      'warn',
      'always',
      {
        null: 'ignore'
      }
    ],
    'no-use-before-define': 'off',
    'import/newline-after-import': 'off',
    'react/self-closing-comp': 'off'
  }
}
