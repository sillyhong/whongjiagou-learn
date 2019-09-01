let babel = require('babel-core');
let types = require('babel-types');
//只会处理ImportDeclaration
let visitor = {
    ImportDeclaration(path,ref={options:{}}){
        let node = path.node;
        let specifiers = node.specifiers;
        if(options.library == node.local.name && !types.isImportDefaultSpecifier(specifiers[0])){
            let newImports = specifiers.map(specifier=>(
                types.importDeclaration([types.ImportDefaultSpecifier(specifier.local)], 
                types.stringLiteral(`${node.source.value}/${specifier.local.name}`))
            )); 
            path.replaceWithMultiple(newImports);
        }
    }
}
let code = "import {flatten,join} from 'lodash';";
let r = babel.transform(code,{
    plugins:[
        {visitor}
    ]
});
console.log(r.code);