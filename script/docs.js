const fs = require('fs')
const path = require('path')
const marked = require('marked')

class Docs {
  constructor(config) {
    this.config = Object.assign({
      md: '',
      tmpl: '',
      output: '',
      marked: null,
      replace: []
    }, config || {})
  }

  generate() {
    const tmpl = fs.readFileSync(this.config.tmpl).toString()
    let md = fs.readFileSync(this.config.md).toString()

    this.config.replace.forEach((rule) => {
      md = md.replace(rule.reg, rule.template)
    })

    const source = tmpl.replace(
      '<!-- {{ CONTENT }} -->',
      marked(md)
    )

    return fs.writeFileSync(this.config.output, source)
  }
}

const doc = new Docs({
  md: path.join(process.cwd(), 'README.md'),
  tmpl: path.join(process.cwd(), 'src/html/index.html'),
  output: path.join(process.cwd(), 'docs/index.html'),
  replace: [
    {
      reg: /\[Document\]\(https:\/\/kimulaco\.github\.io\/vanilla\-smoothie\/\)/g,
      template: ''
    },
    {
      reg: /<!-- \[GH_PAGES\]([\s\S]*?)\[GH_PAGES\] -->/gm,
      template: '$1'
    }
  ]
})

doc.generate()
