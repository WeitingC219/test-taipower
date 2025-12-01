module.exports = {
  // 用官方的 conventional 規則
  extends: ['@commitlint/config-conventional'],

  // 想要更嚴可以在 rules 自訂
  rules: {
    // 限制 type 一定要用這幾種（可自行調整）
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // summary 不可為空
    'subject-empty': [2, 'never'],
    // 不讓 subject 結尾有句點
    'subject-full-stop': [2, 'never', '.'],
    // 強制小寫 type
    'type-case': [2, 'always', 'lower-case'],
    // scope 可以選填，但如果寫要是小寫
    'scope-case': [2, 'always', 'lower-case'],
  },
};
