import globby from 'globby'
import {
  getImportPath,
  defaultImport,
  typeImport,
  getParentDirName,
  createImportDeclaration,
  template
} from 's2s-utils'

const builders = {
  root: template(`export default combineReducers(OBJ)`)
}

function trimDotSlash(path) {
  return path.replace('./', '')
}

module.exports = (babel) => {
  var t = babel.types;

  return {
    name: "s2s-redux-actions-root",
    visitor: {
      Program: {
        exit(path, state) {
	        const { input, output } = state.opts

          if (!input) {
            throw new Error('require input option')
          }

          if (!output) {
            throw new Error('require output option')
          }

          const files = globby.sync(input)
          const index = files.indexOf(output)

          if (index > -1) {
            files.splice(index, 1);
          }

          const imports = files
                .map(f => defaultImport(trimDotSlash(getImportPath(output, f)), getImportPath(output, f)))

          const props = files
                .map(f => trimDotSlash(getImportPath(output, f)))
                .map(x => t.identifier(x))
                .map(name => t.objectProperty(name, name, false, true))

          path.node.body = [
            createImportDeclaration('combineReducers', "redux"),
            ...imports,
            builders.root({ OBJ: t.objectExpression(props) }),
          ]
        }
      }
    }
  }
}
