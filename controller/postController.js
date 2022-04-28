const Post = require('../model/post');
const {successHandleSuccess, errorHandler} = require('../handler');

const postController = {
     async getPosts(req, res) {
        try{
            const posts = await Post.find();
            successHandleSuccess(res, posts, 200);
        } catch(err) {
            errorHandler(res,'取得post失敗',400);
        }
    },
     async addPost(req, res, body) {
         try{
             const post = JSON.parse(body);
             const {userName, content} = post;
             if(!userName || !content ){
                errorHandler(res, '名稱與內容須填寫!', 400);
             }
             const newPost = await Post.create(post);
            successHandleSuccess(res, '貼文新增成功', 200);
         } catch(err) {
            errorHandler(res,'新增post失敗',400);
         }
    },
     async deletePost(req, res) {
         try{
            //須考慮到傳入不存在的 uuid EX: 125drg
            const requestUrl = req.url;
            if(requestUrl === '/posts') {
                //刪除全部
                await Post.deleteMany({});
                const posts = await Post.find();
                successHandleSuccess(res, posts, 200);
            } else if(requestUrl.startsWith('/posts/') && requestUrl.split('/').length === 3) {
                //刪除單筆
                const id = requestUrl.split('/').pop();
                const posts = Post.findByIdAndDelete(id, async(error, doc) => 
                {
                    if(error || doc === null) { ////情境1:符合16進制格式但不存在的id，err和docs都是null ，情境2: 不符合16進制的id會有err，但 docs 為 undefined
                        errorHandler(res, `刪除失敗...`);
                    } else {
                        const posts = await Post.find();
                        successHandleSuccess(res, posts, 200);
                    }
                })

            } else {
                errorHandler(res, '無此網站路由',400);
            }
         } catch(err) {
            errorHandler(res, '刪除 post 失敗',400);
         }      
    },
     async patchPost(req, res, body) {
        try{
            const updatePost = JSON.parse(body);
            if( !updatePost.content) errorHandler(res, '內容須填寫',400);
            const id = req.url.split('/posts/').pop();
            const result =  Post.findByIdAndUpdate(id,
                {
                    "content": updatePost.content
                }, async (err, docs) => {
                    if(err || docs === null){ //情境1:符合16進制格式但不存在的id，err和docs都是null ，情境2: 不符合16進制的id會有err，但 docs 為 undefined
                        errorHandler(res, '修改失敗',400);
                    } else {
                        const posts = await Post.find();
                        successHandleSuccess(res, posts, 200);
                    }

            });
        } catch(err) {
            errorHandler(res, '修改 post 失敗',400);
        }
        
    },
     optionsPost(res) {
        successHandleSuccess(res, null, 200);
    },
     requestError(res, message) {
        errorHandler(res, message);
    }
}

module.exports = postController;