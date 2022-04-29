const postController = require('../controller/postController');

// router不做任何拋錯或成功的，而是交由 controller 做
const postRouter = async (req, res, methodType) => {
    const method = req.method;
    const urlLen = req.url.split('/').length;
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    // DP 為 DELETE、PATCH，這兩種若是針對單筆，則URL會有帶id，則URL長度需做判斷避免中間或最後隨便參雜路徑
    if(methodType === 'DP') {
        if(req.url.split('/').length !== 3)  return postController.requestError(res, '無此網站路由');
    }

    switch(method) {
        case 'GET':
            postController.getPosts(req, res);
            break;
        case 'POST':
            req.on('end', ()=>{
                postController.addPost(res, body);
            })
            break;
        case 'DELETE':
            postController.deletePost(req, res);
            break;
        case 'PATCH':
            req.on('end', ()=>{
                postController.patchPost(req, res, body);
            })
            break;
        case 'OPTIONS':
            postController.optionsPost(res);
            break;
        default:
            postController.requestError(res, '無此網站路由');
            break;
    }
}

module.exports = postRouter;
