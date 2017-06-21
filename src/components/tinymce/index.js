import './sieToolbar'
import 'tinymce/themes/modern/theme'// Tema

/** ***** PLUGINS *************************/
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'

var requireTest = require.context(
  'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
  true,
  /.*/
)
requireTest.keys().forEach(requireTest)

const config = {
  skin_url: window.location.origin + '/skins/lightgray',
  plugins: ['paste', 'link'],
  branding: false
}
export default config