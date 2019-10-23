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
  root: template(`export default history => combineReducers(OBJ)`)
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
	        const { input, output, router } = state.opts

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

          let  props = files
                .map(f => trimDotSlash(getImportPath(output, f)))
                .map(x => t.identifier(x))
                .map(name => t.objectProperty(name, name, false, true))

          let importReduxRouter
          if (router) {
            importReduxRouter = createImportDeclaration('connectRouter', 'connected-react-router')
            props.push(
              t.objectProperty(
                t.Identifier('router'),
                t.Identifier('connectRouter(history)')
              )
            )
          }
          path.node.body = [
            createImportDeclaration('combineReducers', "redux"),
            importReduxRouter,
            ...imports,
            builders.root({ OBJ: t.objectExpression(props) }),
          ]
        }
      }
    }
  }
}
