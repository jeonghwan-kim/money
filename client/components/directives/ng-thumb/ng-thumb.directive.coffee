'use strict'

angular.module 'moneyApp'
.directive 'ngThumb', ($window) ->
  helper =
    support: !!($window.FileReader && $window.CanvasRenderingContext2D)
    isFile: (item) ->
      angular.isObject(item) && item instanceof $window.File
    isImage: (file) ->
      type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
      '|jpg|png|jpeg|bmp|gif|'.indexOf(type) != -1

  restrict: 'A'
  template: '<canvas/>',
  link: (scope, element, attributes) ->
    return if !helper.support

    params = scope.$eval(attributes.ngThumb)

    return if !helper.isFile(params.file)
    return if !helper.isImage(params.file)

    canvas = element.find('canvas')
    reader = new FileReader()

    reader.onload = (event) ->
      img = new Image()
      img.onload = () ->
        width = params.width || this.width / this.height * params.height
        height = params.height || this.height / this.width * params.width
        canvas.attr({ width: width, height: height })
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height)
      img.src = event.target.result

    reader.readAsDataURL(params.file)
