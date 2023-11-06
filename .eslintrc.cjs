module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-essential'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    semi: [2, 'always'],
    'perfer-const': 0,
    'no-var': 'error',
    indent: ['error', 2],
    'no-mixed-spaces-and-tabs': 'error',
    quotes: [2, 'single'],
    'max-depth': ['warn', 4], // 要求可嵌套的块的最大深度4
    'max-statements': ['warn', 100], // 要求函数块最多允许的的语句数量20
    'max-nested-callbacks': ['warn', 3], // 要求回调函数最大嵌套深度3
    'max-statements-per-line': ['warn', { max: 1 }], // 要求每一行中所允许的最大语句数量
    'vue/require-default-prop': 0, // 关闭属性参数必须默认值
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 5 },
      multiline: { max: 5 }
    }],
    'vue/html-indent': [2, 4],
    // 取消关闭标签不能自闭合的限制设置
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }]
  }
};
