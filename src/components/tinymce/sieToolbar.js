import tinymce from 'tinymce/tinymce'

tinymce.PluginManager.add('sieToolbar', function (editor) {
        // fontType(editor);
  var inputFile = '<input type="file" id="sieImageInput" name="single-image" style="font-size:14px;" accept="image/png, image/gif, image/jpeg, image/jpg"/>'
        // document.body.appendChild(angular.element(inputFile)[0]);
  editor.addCommand('sieImage', function () {
            // document.getElementById('sieImageInput').click();
    const sieImage = `<div class="layout-row layout-wrap p-20">${inputFile}</div>
                    <div class="layout-row layout-wrap p-20">
                    <input type="checkbox" id="sieImageCheckbox"><label for="sieImageUrl">O url: </label>
                    <input class="md-input flex b-b-grey-light m-l-5" id="sieImageUrl" disabled>
                    </div>`
    editor.windowManager.open({
      title: 'Insertar imagen',
      width: 450,
      height: 200,
      html: sieImage,
      buttons: [{
        text: 'Ok',
        subtype: 'primary',
        onclick: function () {
          var checkbox = document.getElementById('sieImageCheckbox')
          var input = document.getElementById('sieImageInput')
          var url = document.getElementById('sieImageUrl')
          if (checkbox.checked) { // es url
            editor.execCommand('mceInsertContent', false, "<img src='" + url.value + "' />")
            editor.windowManager.close()
            return false
          }

          if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('This feature needs a modern browser.')
            editor.windowManager.close()
            return
          }

          var imagefile = input.files
          if (imagefile.length <= 0) {
                                // do nothing
            editor.windowManager.close()
            return
          }

          if (imagefile[0].size > 512 * 1024) {
            alert('The image cannot be larger than 500KB.')
            return
          }

          var classFilereader = new FileReader()
          classFilereader.onload = function (base64) {
            var imgData = base64.target.result
            var strImg = '<img src="' + imgData + '" '
            if (editor.settings['image_width']) {
              strImg += 'width="' + editor.settings['image_width'] + '" '
            }
            if (editor.settings['image_height']) {
              strImg += 'height="' + editor.settings['image_height'] + '"'
            }
            strImg += ' />'
            editor.execCommand('mceInsertContent', false, strImg)
            editor.windowManager.close()
          }
          classFilereader.onerror = function (err) {
            alert('Error reading file - ' + err.getMessage())
          }
          classFilereader.readAsDataURL(imagefile[0])
        }
      }, {
        text: 'Cancel',
        onclick: function () {
          (this).parent().parent().close()
        }
      }]
    })
    setTimeout(function () {
      var checkbox = document.getElementById('sieImageCheckbox')
      var input = document.getElementById('sieImageInput')
      var url = document.getElementById('sieImageUrl')
      checkbox.onchange = function () {
        if (checkbox.checked) {
          url.removeAttribute('disabled')
          url.className = url.className.replace('grey-light', 'blue')
          input.setAttribute('disabled', 'disabled')
        } else {
          input.removeAttribute('disabled')
          url.setAttribute('disabled', 'disabled')
          url.className = url.className.replace('blue', 'grey-light')
        }
      }
    }, 500)
  })
  editor.addButton('sieImage', {
    icon: 'image',
    context: 'insert',
    title: 'Insertar imagen',
    cmd: 'sieImage'
  })
  editor.addMenuItem('sieImage', {
    cmd: 'sieImage',
    context: 'insert',
    text: 'Insertar imagen',
    icon: 'image',
    prependToContext: true
  })
})