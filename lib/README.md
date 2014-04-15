## API Document

### /api/signup (post)
* input
 * email
 * password
* output: {newId: number}

### /api/signin (post)
* input
 * email
 * password
* output
 * {uid: number}

### /api/signout (post)
* input
* output
 * http header: code 200

### /api/expense/:yearMonth (get)
* input
 * yearmonth {string}
* output
 * {data: array, total: number, monthList: array, curMonth: string, uid: number}

### /api/expense (post)
* input
 * {date: string, text: string, amount: number}
* output
 * http header: code 200

### /api/expnese/:id (delete)
* input
 * {id: number} 삭제할 expense id
* output
 * http header: code 200