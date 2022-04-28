const postController = require('../controller/postController');

// router不做任何拋錯或成功的，而是交由 controller 做
const postRouter = async (req, res) => {
    const method = req.method;
    const url = req.url;
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    switch(method) {
        case 'GET':
            postController.getPosts(req, res);
            break;
        case 'POST':
            req.on('end', ()=>{
                postController.addPost(req, res, body);
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
