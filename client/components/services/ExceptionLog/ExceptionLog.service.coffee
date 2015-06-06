'use strict'

angular.module 'moneyApp'
.factory 'ExceptionLog', ($log, $window) ->

  # Service logic
  # ...
  tag = 'ExceptionLog.service'

  error = (exception, cause) ->
    $log.error.apply $log, arguments
    try
      $.ajax
        type: 'POST'
        url: '/api/logs'
        data:
          log: angular.toJson
            url: $window.location.href
            message: exception.toString
            type: 'EXCEPTION'
            stackTrace: printStackTrace {e: exception}
            cause: cause || ''
      $log.info tag, 'Logged exception to server-side'
    catch
      $log.warn tag, 'Error server-side logging failed'
      $log.warn tag, _error

  # Public API here
  (->
    error)()


# Override Angular's built in exception handler, and tell it to use our new exceptionLog which is defined below
angular.module 'moneyApp'
.provider '$exceptionHandler', $get: (ExceptionLog) -> ExceptionLog
