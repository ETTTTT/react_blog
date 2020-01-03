
let ipUrl = 'http://127.0.0.1:7001/admin/';

let servicePath = {
    checkLogin: ipUrl + 'checkLogin', // 检测用户名密码
    getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章类别信息
    addArticle: ipUrl + 'addArticle', // 增加文章内容
    updateArticle: ipUrl + 'updateArticle' ,  // 修改文章第api地址
    getArticleList: ipUrl + 'getArticleList' ,  // 获取文章列表数据delArticle
    delArticle: ipUrl + 'delArticle/' ,  // 删除文章
    getArticleById: ipUrl + 'getArticleById/' ,  // 更加id获取文章详情
};

export default servicePath;